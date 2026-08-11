import { Server } from 'socket.io';
import { verifyAccessToken } from '../utils/jwt.js';
import config from '../config/env.js';

let ioInstance = null;
let telemetryLoopInterval = null;

// Controlled in-memory fleet coordinates for live demo telemetry
const FLEET_TELEMETRY = [
  { busNumber: 'Bus 245', routeCode: 'RT-108', x: 26, y: 32, speed: 38, heading: 'NORTH', status: 'ON_TIME', occupancyPercent: 68 },
  { busNumber: 'Bus 504', routeCode: 'RT-415', x: 78, y: 52, speed: 44, heading: 'EAST', status: 'ON_TIME', occupancyPercent: 54 },
  { busNumber: 'Bus 312', routeCode: 'RT-204', x: 50, y: 44, speed: 52, heading: 'SOUTH', status: 'ON_TIME', occupancyPercent: 42 },
  { busNumber: 'Bus 118', routeCode: 'RT-302', x: 46, y: 48, speed: 30, heading: 'WEST', status: 'ON_TIME', occupancyPercent: 48 },
];

export function initSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: config.corsOrigin,
      credentials: true,
      methods: ['GET', 'POST'],
    },
    pingInterval: 10000,
    pingTimeout: 5000,
  });

  ioInstance = io;

  // 1. Socket Authentication Middleware
  io.use((socket, next) => {
    try {
      const authHeader = socket.handshake.headers?.authorization;
      const token =
        socket.handshake.auth?.token ||
        (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

      if (!token) {
        return next(new Error('AUTHENTICATION_REQUIRED'));
      }

      const decoded = verifyAccessToken(token);
      socket.user = decoded; // { sub, email, role, name }
      next();
    } catch (err) {
      return next(new Error('INVALID_OR_EXPIRED_TOKEN'));
    }
  });

  // 2. Connection Lifecycle & Room Assignment
  io.on('connection', (socket) => {
    const { role, sub, name } = socket.user;
    const normRole = (role || 'PASSENGER').toUpperCase();

    // Universal public room for commuter live transit streams
    socket.join('room:public');

    // Role-scoped authorization rooms
    if (normRole === 'DRIVER') {
      socket.join(`room:driver:${sub}`);
    } else if (normRole === 'ADMIN') {
      socket.join('room:admin');
    } else if (normRole === 'SOC' || normRole === 'SYSTEM_ADMIN') {
      socket.join('room:admin');
      socket.join('room:soc');
    }

    socket.on('disconnect', (reason) => {
      // Clean disconnect
    });
  });

  // 3. Centralized Server Telemetry Loop (Every 3.5s, Transient In-Memory Broadcast)
  startServerTelemetryLoop(io);

  return io;
}

function startServerTelemetryLoop(io) {
  if (telemetryLoopInterval) clearInterval(telemetryLoopInterval);

  telemetryLoopInterval = setInterval(() => {
    if (!io || io.engine.clientsCount === 0) return;

    const timestamp = new Date().toISOString();

    // 1. Broadcast Public Bus Positions & Occupancies
    FLEET_TELEMETRY.forEach((bus, idx) => {
      const deltaX = Math.sin(Date.now() / 4000 + idx) * 0.8;
      const deltaY = Math.cos(Date.now() / 4000 + idx) * 0.8;
      bus.x = Math.max(10, Math.min(90, bus.x + deltaX));
      bus.y = Math.max(15, Math.min(85, bus.y + deltaY));

      const positionPayload = {
        busNumber: bus.busNumber,
        routeCode: bus.routeCode,
        coordinates: { x: Number(bus.x.toFixed(2)), y: Number(bus.y.toFixed(2)) },
        speed: `${Math.round(bus.speed + Math.sin(Date.now() / 2000) * 4)} km/h`,
        heading: bus.heading,
        status: bus.status,
        timestamp,
      };

      io.to('room:public').emit('bus:position', positionPayload);
    });

    // 2. Broadcast SOC Metrics (Strictly to room:soc)
    const socPayload = {
      apiLatencyMs: Math.round(14 + Math.sin(Date.now() / 5000) * 3),
      activeBusesCount: 4,
      cpuUtilizationPercent: Math.round(38 + Math.cos(Date.now() / 6000) * 6),
      globalStatus: 'OPERATIONAL',
      timestamp,
    };
    io.to('room:soc').emit('soc:metrics', socPayload);

    // 3. Broadcast Operational AI Recommendations (to room:admin)
    const aiPayload = {
      type: 'OCCUPANCY',
      entityType: 'BUS',
      entityId: 'Bus 245',
      predictionScore: 0.82,
      confidencePercent: 91,
      recommendation: 'Corridor demand stable across Metro Coastal Line (RT-108).',
      _provenance: {
        source: 'HYBRID',
        mode: 'ONLINE',
        modelType: 'OCCUPANCY',
      },
      timestamp,
    };
    io.to('room:admin').emit('ai:recommendation', aiPayload);

    // 4. Broadcast SOC Anomaly Intelligence (Strictly to room:soc)
    const anomalyPayload = {
      id: 'anom-live-01',
      severity: 'INFO',
      category: 'TELEMETRY_WATCHDOG',
      title: 'Realtime Telemetry Ingestion Nominal',
      entity: 'Cluster Gateway 01',
      timestamp,
      _provenance: {
        source: 'RULE_ENGINE',
        mode: 'ONLINE',
        modelType: 'ANOMALY',
      },
    };
    io.to('room:soc').emit('ai:anomaly', anomalyPayload);

    // 5. Broadcast Public-Safe ETA Intelligence (to room:public)
    const etaPayload = {
      busNumber: 'Bus 245',
      routeCode: 'RT-108',
      predictedEtaMinutes: 12,
      confidencePercent: 91,
      timestamp,
      _provenance: {
        source: 'HYBRID',
        mode: 'ONLINE',
        modelType: 'ETA',
      },
    };
    io.to('room:public').emit('ai:eta:update', etaPayload);
  }, 3500);
}

// 4. REST Mutation Notification Dispatchers
export function broadcastAlert(alertData) {
  if (!ioInstance) return;
  ioInstance.to('room:public').emit('alert:created', {
    alertId: alertData.alertId,
    title: alertData.title,
    message: alertData.message,
    severity: alertData.severity,
    affectedRouteCode: alertData.affectedRouteCode,
    timestamp: new Date().toISOString(),
  });
}

export function broadcastIncident(incidentData, isUpdate = false) {
  if (!ioInstance) return;
  const eventName = isUpdate ? 'incident:updated' : 'incident:created';
  ioInstance.to('room:admin').emit(eventName, {
    incidentCode: incidentData.incidentCode,
    title: incidentData.title,
    severity: incidentData.severity,
    status: incidentData.status,
    location: incidentData.location,
    busNumber: incidentData.busNumber,
    timestamp: new Date().toISOString(),
  });
}

export function broadcastTripUpdate(tripData, driverId) {
  if (!ioInstance) return;
  const payload = {
    tripId: tripData.tripId,
    busNumber: tripData.busId?.busNumber || 'Bus 245',
    routeCode: tripData.routeId?.routeCode || 'RT-108',
    status: tripData.status,
    progressPercent: tripData.progressPercent,
    timestamp: new Date().toISOString(),
  };

  if (driverId) {
    ioInstance.to(`room:driver:${driverId}`).emit('trip:updated', payload);
  }
  ioInstance.to('room:admin').emit('trip:updated', payload);
}

export function getIoInstance() {
  return ioInstance;
}

export default {
  initSocketServer,
  broadcastAlert,
  broadcastIncident,
  broadcastTripUpdate,
  getIoInstance,
};
