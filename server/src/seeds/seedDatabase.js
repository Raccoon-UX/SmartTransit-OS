/**
 * SmartTransit OS — Idempotent Database Seeding Engine
 * 
 * Safely populates MongoDB from official frontend source-of-truth datasets.
 * Guaranteed idempotent: repeated executions produce 0 duplicate records.
 */

import bcrypt from 'bcryptjs';
import { connectDatabase, closeDatabase } from '../config/db.js';
import {
  User,
  Bus,
  Route,
  Stop,
  Trip,
  Incident,
  Alert,
  SocMetric,
  AiInsight,
  AuditLog,
} from '../models/index.js';

// Pre-hashed default demonstration password ('DemoPass@2026')
const DEFAULT_PASSWORD_HASH = bcrypt.hashSync('DemoPass@2026', 10);

async function seedDatabase() {
  console.log('========================================');
  console.log('SMARTTRANSIT OS DATABASE SEED INITIATED');
  console.log('========================================');

  const stats = {
    users: 0,
    routes: 0,
    stops: 0,
    buses: 0,
    trips: 0,
    incidents: 0,
    alerts: 0,
    socMetrics: 0,
    aiInsights: 0,
    auditLogs: 0,
    inserted: 0,
    updated: 0,
    errors: 0,
  };

  try {
    const dbConn = await connectDatabase();
    if (!dbConn) {
      throw new Error('Failed to establish MongoDB connection.');
    }

    // ==========================================
    // 1. SEED USERS
    // ==========================================
    console.log('[Seed] 1/10 Seeding Users...');
    const userSeeds = [
      {
        email: 'passenger@smarttransit.city',
        name: 'Aarav Sharma',
        role: 'PASSENGER',
        commuterProfile: {
          favorites: ['RT-108', 'BST-001', 'BST-104'],
          passId: 'PASS-MUM-8842',
          preferences: { transitMode: 'ELECTRIC_AC', notifyBeforeMins: 5 },
        },
      },
      {
        email: 'driver@smarttransit.city',
        name: 'Vikram Jadhav',
        role: 'DRIVER',
        driverProfile: {
          licenseNumber: 'HMV-2026-TR-9042',
          badgeId: 'PLT-042',
        },
      },
      {
        email: 'ramesh.k@smarttransit.city',
        name: 'Ramesh K.',
        role: 'DRIVER',
        driverProfile: {
          licenseNumber: 'HMV-2025-TR-1108',
          badgeId: 'PLT-108',
        },
      },
      {
        email: 'sanjay.m@smarttransit.city',
        name: 'Sanjay M.',
        role: 'DRIVER',
        driverProfile: {
          licenseNumber: 'HMV-2024-TR-2212',
          badgeId: 'PLT-212',
        },
      },
      {
        email: 'anil.p@smarttransit.city',
        name: 'Anil P.',
        role: 'DRIVER',
        driverProfile: {
          licenseNumber: 'HMV-2023-TR-3315',
          badgeId: 'PLT-315',
        },
      },
      {
        email: 'admin@smarttransit.city',
        name: 'Priya Nambiar',
        role: 'ADMIN',
      },
      {
        email: 'soc.admin@smarttransit.city',
        name: 'Devraj Sen',
        role: 'SOC',
      },
    ];

    const userMap = new Map();

    for (const u of userSeeds) {
      const existing = await User.findOne({ email: u.email });
      const doc = await User.findOneAndUpdate(
        { email: u.email },
        {
          $set: {
            name: u.name,
            role: u.role,
            driverProfile: u.driverProfile || {},
            commuterProfile: u.commuterProfile || {},
            isActive: true,
          },
          $setOnInsert: {
            passwordHash: DEFAULT_PASSWORD_HASH,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (!existing) stats.inserted++;
      else stats.updated++;
      stats.users++;
      userMap.set(u.email, doc);
      if (u.driverProfile?.badgeId) {
        userMap.set(u.driverProfile.badgeId, doc);
      }
    }

    // ==========================================
    // 2. SEED ROUTES
    // ==========================================
    console.log('[Seed] 2/10 Seeding Routes...');
    const routeSeeds = [
      {
        routeCode: 'RT-108',
        routeName: 'Metro Coastal Express Line',
        origin: 'Borivali Central Hub',
        destination: 'Andheri West Exchange',
        color: '#0c87eb',
        stopsCount: 6,
        fareRange: '₹15 – ₹45',
        frequency: 'Every 8 mins',
        operatingHours: '05:30 AM – 11:45 PM',
        stops: [
          { stopCode: 'BST-001', stopName: 'Borivali Central Hub', sequence: 1, estimatedOffsetMinutes: 0 },
          { stopCode: 'BST-012', stopName: 'Kandivali Flyover Express', sequence: 2, estimatedOffsetMinutes: 6 },
          { stopCode: 'BST-024', stopName: 'Dahisar Check Naka', sequence: 3, estimatedOffsetMinutes: 12 },
          { stopCode: 'BST-104', stopName: 'Western Highway Exchange', sequence: 4, estimatedOffsetMinutes: 18 },
          { stopCode: 'BST-180', stopName: 'Goregaon IT Park Hub', sequence: 5, estimatedOffsetMinutes: 24 },
          { stopCode: 'BST-208', stopName: 'Andheri West Exchange', sequence: 6, estimatedOffsetMinutes: 32 },
        ],
      },
      {
        routeCode: 'RT-204',
        routeName: 'Airport Superfast Highway Link',
        origin: 'Metro Interchange',
        destination: 'Terminal 2 International Airport',
        color: '#06b6d4',
        stopsCount: 5,
        fareRange: '₹30 – ₹80',
        frequency: 'Every 12 mins',
        operatingHours: '24 Hours (Round-the-clock)',
        stops: [
          { stopCode: 'BST-090', stopName: 'Metro Interchange', sequence: 1, estimatedOffsetMinutes: 0 },
          { stopCode: 'BST-112', stopName: 'Santacruz Junction', sequence: 2, estimatedOffsetMinutes: 8 },
          { stopCode: 'BST-208', stopName: 'Aviation Gate South', sequence: 3, estimatedOffsetMinutes: 16 },
          { stopCode: 'BST-220', stopName: 'Airport Cargo Zone', sequence: 4, estimatedOffsetMinutes: 22 },
          { stopCode: 'BST-250', stopName: 'Terminal 2 Arrivals', sequence: 5, estimatedOffsetMinutes: 30 },
        ],
      },
      {
        routeCode: 'RT-302',
        routeName: 'Central Business District Feeder',
        origin: 'City Center Hub',
        destination: 'Tech Park Station',
        color: '#10b981',
        stopsCount: 5,
        fareRange: '₹10 – ₹25',
        frequency: 'Every 6 mins',
        operatingHours: '06:00 AM – 10:30 PM',
        stops: [
          { stopCode: 'BST-001', stopName: 'City Center Hub', sequence: 1, estimatedOffsetMinutes: 0 },
          { stopCode: 'BST-042', stopName: 'Silicon Boulevard', sequence: 2, estimatedOffsetMinutes: 7 },
          { stopCode: 'BST-104', stopName: 'Financial Gateway', sequence: 3, estimatedOffsetMinutes: 14 },
          { stopCode: 'BST-180', stopName: 'Tech Zone 4', sequence: 4, estimatedOffsetMinutes: 21 },
          { stopCode: 'BST-208', stopName: 'Tech Park Station', sequence: 5, estimatedOffsetMinutes: 28 },
        ],
      },
      {
        routeCode: 'RT-415',
        routeName: 'Suburban Ring Expressway',
        origin: 'Thane Central Station',
        destination: 'Navi Mumbai Gateway',
        color: '#f59e0b',
        stopsCount: 5,
        fareRange: '₹20 – ₹55',
        frequency: 'Every 15 mins',
        operatingHours: '05:00 AM – 11:00 PM',
        stops: [
          { stopCode: 'BST-001', stopName: 'Thane Central Station', sequence: 1, estimatedOffsetMinutes: 0 },
          { stopCode: 'BST-024', stopName: 'Mulund Check Naka', sequence: 2, estimatedOffsetMinutes: 10 },
          { stopCode: 'BST-104', stopName: 'Airoli Toll Plaza', sequence: 3, estimatedOffsetMinutes: 22 },
          { stopCode: 'BST-510', stopName: 'Vashi Sector 17', sequence: 4, estimatedOffsetMinutes: 36 },
          { stopCode: 'BST-250', stopName: 'Navi Mumbai Gateway', sequence: 5, estimatedOffsetMinutes: 50 },
        ],
      },
    ];

    const routeMap = new Map();

    for (const r of routeSeeds) {
      const existing = await Route.findOne({ routeCode: r.routeCode });
      const doc = await Route.findOneAndUpdate(
        { routeCode: r.routeCode },
        { $set: r },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (!existing) stats.inserted++;
      else stats.updated++;
      stats.routes++;
      routeMap.set(r.routeCode, doc);
    }

    // ==========================================
    // 3. SEED STOPS
    // ==========================================
    console.log('[Seed] 3/10 Seeding Stops...');
    const stopSeeds = [
      { code: 'BST-001', name: 'Borivali Central Hub', zone: 'Zone North-1', coordinates: { x: 20, y: 35, latitude: 19.2307, longitude: 72.8567 }, routes: ['RT-108', 'RT-302', 'RT-415'] },
      { code: 'BST-012', name: 'Kandivali Flyover Express', zone: 'Zone North-2', coordinates: { x: 28, y: 40, latitude: 19.2045, longitude: 72.8522 }, routes: ['RT-108'] },
      { code: 'BST-024', name: 'Dahisar Check Naka', zone: 'Zone North-Border', coordinates: { x: 38, y: 44, latitude: 19.2574, longitude: 72.8654 }, routes: ['RT-108', 'RT-415'] },
      { code: 'BST-042', name: 'Silicon Boulevard', zone: 'Zone Tech Sector', coordinates: { x: 58, y: 80, latitude: 19.0760, longitude: 72.8777 }, routes: ['RT-302'] },
      { code: 'BST-090', name: 'Metro Interchange', zone: 'Zone Central Metro', coordinates: { x: 42, y: 50, latitude: 19.1136, longitude: 72.8697 }, routes: ['RT-204'] },
      { code: 'BST-104', name: 'Western Highway Exchange', zone: 'Zone Central-4', coordinates: { x: 45, y: 48, latitude: 19.1663, longitude: 72.8526 }, routes: ['RT-108', 'RT-204', 'RT-302', 'RT-415'] },
      { code: 'BST-112', name: 'Santacruz Junction', zone: 'Zone Central-5', coordinates: { x: 52, y: 42, latitude: 19.0843, longitude: 72.8360 }, routes: ['RT-204'] },
      { code: 'BST-180', name: 'Goregaon IT Park Hub', zone: 'Zone West-IT', coordinates: { x: 50, y: 55, latitude: 19.1646, longitude: 72.8493 }, routes: ['RT-108', 'RT-302'] },
      { code: 'BST-208', name: 'Aviation Gate South / Andheri Exchange', zone: 'Zone Airport East', coordinates: { x: 75, y: 30, latitude: 19.0990, longitude: 72.8745 }, routes: ['RT-108', 'RT-204', 'RT-302'] },
      { code: 'BST-220', name: 'Airport Cargo Zone', zone: 'Zone Airport Cargo', coordinates: { x: 80, y: 25, latitude: 19.0968, longitude: 72.8682 }, routes: ['RT-204'] },
      { code: 'BST-250', name: 'Terminal 2 Arrivals', zone: 'Zone Airport Terminals', coordinates: { x: 88, y: 20, latitude: 19.0886, longitude: 72.8679 }, routes: ['RT-204', 'RT-415'] },
      { code: 'BST-510', name: 'Vashi Sector 17', zone: 'Zone Navi Mumbai', coordinates: { x: 85, y: 65, latitude: 19.0771, longitude: 72.9986 }, routes: ['RT-415'] },
    ];

    const stopMap = new Map();

    for (const s of stopSeeds) {
      const connectedRouteIds = (s.routes || [])
        .map((code) => routeMap.get(code)?._id)
        .filter(Boolean);

      const existing = await Stop.findOne({ code: s.code });
      const doc = await Stop.findOneAndUpdate(
        { code: s.code },
        {
          $set: {
            name: s.name,
            coordinates: s.coordinates,
            zone: s.zone,
            amenities: ['Shelter', 'CCTV Surveillance', 'Digital ETA Display', 'Wheelchair Ramp'],
            connectedRoutes: connectedRouteIds,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (!existing) stats.inserted++;
      else stats.updated++;
      stats.stops++;
      stopMap.set(s.code, doc);
    }

    // ==========================================
    // 4. SEED BUSES (Resolving Routes & Drivers)
    // ==========================================
    console.log('[Seed] 4/10 Seeding Buses...');
    const busSeeds = [
      {
        busNumber: 'Bus 245',
        serial: 'NY-TR-8042',
        routeCode: 'RT-108',
        driverBadge: 'PLT-042',
        status: 'ON_TIME',
        occupancyPercent: 78,
        occupancyStatus: 'HIGH',
        speed: '38 km/h',
        heading: 'South-West',
        coordinates: { x: 38, y: 44, latitude: 19.2574, longitude: 72.8654 },
      },
      {
        busNumber: 'Bus 312',
        serial: 'NY-TR-9914',
        routeCode: 'RT-204',
        driverBadge: 'PLT-108',
        status: 'ACTIVE',
        occupancyPercent: 42,
        occupancyStatus: 'LOW',
        speed: '52 km/h',
        heading: 'East-South',
        coordinates: { x: 65, y: 28, latitude: 19.0990, longitude: 72.8745 },
      },
      {
        busNumber: 'Bus 118',
        serial: 'NY-TR-4402',
        routeCode: 'RT-302',
        driverBadge: 'PLT-212',
        status: 'ON_TIME',
        occupancyPercent: 58,
        occupancyStatus: 'MEDIUM',
        speed: '31 km/h',
        heading: 'North-East',
        coordinates: { x: 52, y: 72, latitude: 19.0760, longitude: 72.8777 },
      },
      {
        busNumber: 'Bus 504',
        serial: 'NY-TR-3381',
        routeCode: 'RT-415',
        driverBadge: 'PLT-315',
        status: 'DELAYED',
        occupancyPercent: 92,
        occupancyStatus: 'FULL',
        speed: '24 km/h',
        heading: 'South',
        coordinates: { x: 80, y: 55, latitude: 19.1663, longitude: 72.9986 },
      },
    ];

    const busMap = new Map();

    for (const b of busSeeds) {
      const routeDoc = routeMap.get(b.routeCode);
      const driverDoc = userMap.get(b.driverBadge);

      const existing = await Bus.findOne({ busNumber: b.busNumber });
      const doc = await Bus.findOneAndUpdate(
        { busNumber: b.busNumber },
        {
          $set: {
            serial: b.serial,
            routeId: routeDoc?._id || null,
            driverId: driverDoc?._id || null,
            status: b.status,
            occupancyPercent: b.occupancyPercent,
            occupancyStatus: b.occupancyStatus,
            speed: b.speed,
            heading: b.heading,
            coordinates: b.coordinates,
            lastPing: new Date(),
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (!existing) stats.inserted++;
      else stats.updated++;
      stats.buses++;
      busMap.set(b.busNumber, doc);
    }

    // ==========================================
    // 5. SEED TRIPS
    // ==========================================
    console.log('[Seed] 5/10 Seeding Trips...');
    const bus245 = busMap.get('Bus 245');
    const route108 = routeMap.get('RT-108');
    const driver042 = userMap.get('PLT-042');

    const tripSeeds = [
      {
        tripId: 'TRP-2026-0810-042-1',
        busId: bus245?._id,
        routeId: route108?._id,
        driverId: driver042?._id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 1000 * 60 * 180),
        completedAt: new Date(Date.now() - 1000 * 60 * 105),
        progressPercent: 100,
        summaryReport: {
          duration: '1h 14m',
          distance: '18.4 km',
          completedStops: '6 / 6',
          finalOccupancy: '62%',
          onTime: 'YES (+1 min)',
        },
      },
      {
        tripId: 'TRP-2026-0810-042-2',
        busId: bus245?._id,
        routeId: route108?._id,
        driverId: driver042?._id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 1000 * 60 * 90),
        completedAt: new Date(Date.now() - 1000 * 60 * 15),
        progressPercent: 100,
        summaryReport: {
          duration: '1h 15m',
          distance: '18.4 km',
          completedStops: '6 / 6',
          finalOccupancy: '78%',
          onTime: 'YES (Exact)',
        },
      },
      {
        tripId: 'TRP-2026-0810-042-3',
        busId: bus245?._id,
        routeId: route108?._id,
        driverId: driver042?._id,
        status: 'ACTIVE',
        startedAt: new Date(Date.now() - 1000 * 60 * 10),
        completedAt: null,
        progressPercent: 42,
        summaryReport: null,
      },
    ];

    for (const t of tripSeeds) {
      if (!t.busId || !t.routeId || !t.driverId) continue;
      const existing = await Trip.findOne({ tripId: t.tripId });
      await Trip.findOneAndUpdate(
        { tripId: t.tripId },
        { $set: t },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (!existing) stats.inserted++;
      else stats.updated++;
      stats.trips++;
    }

    // ==========================================
    // 6. SEED INCIDENTS
    // ==========================================
    console.log('[Seed] 6/10 Seeding Incidents...');
    const incidentSeeds = [
      {
        incidentCode: 'INC-2026-0089',
        title: 'Goregaon Flyover Traffic Slowdown',
        severity: 'MEDIUM',
        type: 'TRAFFIC_GRIDLOCK',
        location: 'Goregaon IT Park Hub (BST-180)',
        busNumber: 'Bus 245',
        reportedBy: driver042?._id,
        status: 'RESOLVED',
        timeline: [
          { timestamp: new Date(Date.now() - 3600000), status: 'OPEN', message: 'Driver reported heavy congestion on flyover.' },
          { timestamp: new Date(Date.now() - 1800000), status: 'RESOLVED', message: 'Transit controller adjusted headway by +3 mins.' },
        ],
      },
      {
        incidentCode: 'INC-2026-0084',
        title: 'API Gateway Latency Spike on Route Search',
        severity: 'HIGH',
        type: 'INFRASTRUCTURE',
        location: 'Core API Gateway Cluster',
        busNumber: null,
        reportedBy: userMap.get('soc.admin@smarttransit.city')?._id,
        status: 'INVESTIGATING',
        timeline: [
          { timestamp: new Date(Date.now() - 1800000), status: 'OPEN', message: 'Latency exceeded 150ms threshold.' },
          { timestamp: new Date(Date.now() - 900000), status: 'INVESTIGATING', message: 'SRE Lead investigating read replica query queues.' },
        ],
      },
    ];

    for (const inc of incidentSeeds) {
      const existing = await Incident.findOne({ incidentCode: inc.incidentCode });
      await Incident.findOneAndUpdate(
        { incidentCode: inc.incidentCode },
        { $set: inc },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (!existing) stats.inserted++;
      else stats.updated++;
      stats.incidents++;
    }

    // ==========================================
    // 7. SEED ALERTS
    // ==========================================
    console.log('[Seed] 7/10 Seeding Alerts...');
    const alertSeeds = [
      {
        alertId: 'ALT-2026-001',
        title: 'Highway Lane Closure on Western Expressway',
        message: 'Road maintenance near Goregaon Flyover causing 8–12 min delays on RT-108 services.',
        severity: 'WARNING',
        category: 'DISRUPTION',
        affectedRouteCode: 'RT-108',
        isActive: true,
      },
      {
        alertId: 'ALT-2026-002',
        title: 'Monsoon High Tide Advisory',
        message: 'Coastal arterial services operating on standard wet-weather schedule. AC Double-decker deployed.',
        severity: 'INFO',
        category: 'WEATHER',
        affectedRouteCode: 'RT-108',
        isActive: true,
      },
      {
        alertId: 'ALT-2026-003',
        title: 'Extra Fleet Deployed on RT-302 Tech Corridor',
        message: '4 additional electric buses injected during evening peak hours (05:00 PM – 08:30 PM).',
        severity: 'INFO',
        category: 'FREQUENCY',
        affectedRouteCode: 'RT-302',
        isActive: true,
      },
    ];

    for (const a of alertSeeds) {
      const existing = await Alert.findOne({ alertId: a.alertId });
      await Alert.findOneAndUpdate(
        { alertId: a.alertId },
        { $set: a },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      if (!existing) stats.inserted++;
      else stats.updated++;
      stats.alerts++;
    }

    // ==========================================
    // 8. SEED SOC METRICS (Time-series / Operational)
    // ==========================================
    console.log('[Seed] 8/10 Seeding SOC Metrics...');
    const nowRounded = new Date();
    nowRounded.setSeconds(0, 0); // Deterministic minute slot

    const socSnapshot = {
      timestamp: nowRounded,
      globalStatus: 'OPERATIONAL',
      apiLatencyMs: 14,
      activeBusesCount: 4,
      cpuUtilizationPercent: 45,
      backpressureState: 'NORMAL',
      serverNodes: [
        { nodeId: 'node-01', name: 'APP-NODE-01', status: 'HEALTHY', cpuPercent: 42, memoryPercent: 61 },
        { nodeId: 'node-02', name: 'APP-NODE-02', status: 'HEALTHY', cpuPercent: 67, memoryPercent: 73 },
        { nodeId: 'node-03', name: 'APP-NODE-03', status: 'WARNING', cpuPercent: 82, memoryPercent: 78 },
      ],
    };

    const existingSoc = await SocMetric.findOne({ timestamp: socSnapshot.timestamp });
    await SocMetric.findOneAndUpdate(
      { timestamp: socSnapshot.timestamp },
      { $set: socSnapshot },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    if (!existingSoc) stats.inserted++;
    else stats.updated++;
    stats.socMetrics = 1;

    // ==========================================
    // 9. SEED AI INSIGHTS
    // ==========================================
    console.log('[Seed] 9/10 Seeding AI Insights...');
    if (bus245 && route108) {
      const aiSeeds = [
        {
          modelType: 'ETA',
          entityType: 'BUS',
          entityId: bus245._id,
          predictionScore: 3,
          confidencePercent: 96,
          recommendationText: 'Bus 245 ETA 3 mins to Western Highway Exchange (Historical variance: ±30s)',
          factors: ['Low signal delay at Dahisar Check Naka', 'Flow velocity 38 km/h on dedicated lane'],
        },
        {
          modelType: 'DEMAND',
          entityType: 'ROUTE',
          entityId: route108._id,
          predictionScore: 84,
          confidencePercent: 92,
          recommendationText: 'High passenger surge expected at Western Highway Exchange between 06:00 PM and 07:30 PM.',
          factors: ['Metro line connecting transfer volumes', 'Evening office shift completion'],
        },
        {
          modelType: 'OCCUPANCY',
          entityType: 'BUS',
          entityId: bus245._id,
          predictionScore: 78,
          confidencePercent: 94,
          recommendationText: 'Seating capacity at 78%. Recommend next arriving passenger board trailing Bus 312 for comfortable seating.',
          factors: ['Door sensor ticketing counts', 'Weight telemetry calibration'],
        },
      ];

      for (const ai of aiSeeds) {
        const existingAi = await AiInsight.findOne({
          modelType: ai.modelType,
          entityType: ai.entityType,
          entityId: ai.entityId,
        });

        await AiInsight.findOneAndUpdate(
          { modelType: ai.modelType, entityType: ai.entityType, entityId: ai.entityId },
          { $set: ai },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        if (!existingAi) stats.inserted++;
        else stats.updated++;
        stats.aiInsights++;
      }
    }

    // ==========================================
    // 10. SEED AUDIT LOGS
    // ==========================================
    console.log('[Seed] 10/10 Seeding Audit Logs...');
    const adminUser = userMap.get('admin@smarttransit.city');
    if (adminUser) {
      const auditSeeds = [
        {
          actorId: adminUser._id,
          role: 'ADMIN',
          action: 'DISPATCH_FLEET',
          targetResource: 'Bus',
          targetResourceId: 'Bus 245',
          ipAddress: '127.0.0.1',
          metadata: { routeCode: 'RT-108', driverBadge: 'PLT-042' },
          timestamp: new Date(Date.now() - 3600000 * 2),
        },
        {
          actorId: adminUser._id,
          role: 'ADMIN',
          action: 'CREATE_ALERT',
          targetResource: 'Alert',
          targetResourceId: 'ALT-2026-001',
          ipAddress: '127.0.0.1',
          metadata: { affectedRoute: 'RT-108' },
          timestamp: new Date(Date.now() - 3600000),
        },
      ];

      for (const log of auditSeeds) {
        const existingLog = await AuditLog.findOne({
          actorId: log.actorId,
          action: log.action,
          targetResourceId: log.targetResourceId,
        });

        await AuditLog.findOneAndUpdate(
          { actorId: log.actorId, action: log.action, targetResourceId: log.targetResourceId },
          { $set: log },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        if (!existingLog) stats.inserted++;
        else stats.updated++;
        stats.auditLogs++;
      }
    }

    console.log('\n========================================');
    console.log('SMARTTRANSIT OS DATABASE SEED SUMMARY');
    console.log('========================================');
    console.log(`Users:       ${stats.users}`);
    console.log(`Routes:      ${stats.routes}`);
    console.log(`Stops:       ${stats.stops}`);
    console.log(`Buses:       ${stats.buses}`);
    console.log(`Trips:       ${stats.trips}`);
    console.log(`Incidents:   ${stats.incidents}`);
    console.log(`Alerts:      ${stats.alerts}`);
    console.log(`SOC Metrics: ${stats.socMetrics}`);
    console.log(`AI Insights: ${stats.aiInsights}`);
    console.log(`Audit Logs:  ${stats.auditLogs}`);
    console.log('----------------------------------------');
    console.log(`Inserted:    ${stats.inserted}`);
    console.log(`Updated:     ${stats.updated}`);
    console.log(`Unchanged:   0`);
    console.log(`Errors:      ${stats.errors}`);
    console.log('----------------------------------------');
    console.log('MongoDB:     CONNECTED');
    console.log('Status:      SUCCESS');
    console.log('========================================\n');

    await closeDatabase();
    process.exit(0);
  } catch (error) {
    console.error('\n[Seed Error] ❌ Database seeding failed:', error.message);
    await closeDatabase();
    process.exit(1);
  }
}

seedDatabase();
