import { apiClient } from '../api/apiClient.js';
import { MOCK_PASSENGER_BUSES } from '../../data/passenger/mockBuses.js';
import { MOCK_PASSENGER_STOPS } from '../../data/passenger/mockStops.js';

let liveBusesState = [...MOCK_PASSENGER_BUSES];
let subscribers = [];

function notifySubscribers() {
  subscribers.forEach((callback) => callback(liveBusesState));
}

function normalizeBus(b) {
  return {
    id: b.id || b._id,
    busNumber: b.busNumber,
    routeId: b.routeId?._id || b.routeId?.routeCode || b.routeId || 'RT-108',
    routeName: b.routeId?.routeName || b.routeName || 'Metro Coastal Express Line',
    routeCode: b.routeId?.routeCode || b.routeCode || 'RT-108',
    status: b.status || 'ON_TIME',
    operationalStatus: b.status === 'ACTIVE' ? 'ON TIME' : b.status || 'ON TIME',
    occupancyPercent: b.occupancyPercent !== undefined ? b.occupancyPercent : 65,
    occupancyStatus: b.occupancyStatus || 'MEDIUM',
    coordinates: b.coordinates || { x: 50, y: 50 },
    speed: b.speed || 38,
    heading: b.heading || 'NORTH',
    lastPing: b.lastPing || 'Just now',
    driverName: b.driverId?.name || b.driverName || 'Vikram J. (Pilot 042)',
    eta: b.eta || '4 min',
  };
}

import { socketClient } from '../realtime/socketClient.js';

// Setup Socket.IO realtime listener for bus telemetry
socketClient.subscribe('bus:position', (pos) => {
  if (!pos?.busNumber) return;
  liveBusesState = liveBusesState.map((bus) => {
    if (bus.busNumber === pos.busNumber) {
      return {
        ...bus,
        coordinates: pos.coordinates || bus.coordinates,
        speed: pos.speed ? parseInt(pos.speed, 10) || bus.speed : bus.speed,
        heading: pos.heading || bus.heading,
        status: pos.status || bus.status,
        lastPing: 'Live (Socket.IO)',
      };
    }
    return bus;
  });
  notifySubscribers();
});

socketClient.subscribe('bus:occupancy', (occ) => {
  if (!occ?.busNumber) return;
  liveBusesState = liveBusesState.map((bus) => {
    if (bus.busNumber === occ.busNumber) {
      return {
        ...bus,
        occupancyPercent: occ.occupancyPercent !== undefined ? occ.occupancyPercent : bus.occupancyPercent,
        occupancyStatus: occ.occupancyStatus || bus.occupancyStatus,
        lastPing: 'Live (Socket.IO)',
      };
    }
    return bus;
  });
  notifySubscribers();
});

export const transitService = {
  /**
   * Fetches all live buses
   */
  async getLiveBuses() {
    try {
      const data = await apiClient.get('/fleet');
      if (Array.isArray(data) && data.length > 0) {
        liveBusesState = data.map(normalizeBus);
        return [...liveBusesState];
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[TransitService] Access error:', error);
      }
    }
    return [...liveBusesState];
  },

  /**
   * Fetches a single bus by ID or bus number
   */
  async getBusById(busId) {
    try {
      const data = await apiClient.get(`/fleet/${encodeURIComponent(busId)}`);
      if (data) {
        return normalizeBus(data);
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[TransitService] Bus fetch error:', error);
      }
    }
    return (
      liveBusesState.find(
        (b) => b.id === busId || b.busNumber?.toLowerCase() === busId?.toLowerCase()
      ) || liveBusesState[0]
    );
  },

  /**
   * Fetches nearby bus stops
   */
  async getNearbyStops() {
    try {
      const data = await apiClient.get('/stops');
      if (Array.isArray(data) && data.length > 0) {
        return data.map((s) => {
          const mockMatch = MOCK_PASSENGER_STOPS.find(
            (m) => m.code === s.code || m.id === s.code || m.name === s.name
          );
          return {
            id: s.code || s._id,
            code: s.code,
            name: s.name,
            coordinates: s.coordinates || mockMatch?.coordinates || { x: 50, y: 50 },
            zone: s.zone || mockMatch?.zone || 'Zone 1 - Central',
            shelterType: s.shelterType || mockMatch?.shelterType || 'Smart Digital Shelter',
            amenities: s.amenities || mockMatch?.amenities || ['CCTV Surveillance', 'LED Timetable'],
            connectedRoutes: s.connectedRoutes || mockMatch?.connectedRoutes || ['RT-108', 'RT-415'],
            incomingBuses: s.incomingBuses || mockMatch?.incomingBuses || [
              {
                busNumber: 'Bus 245',
                route: 'RT-108',
                destination: 'Vashi Sector 17',
                eta: '4 min',
                occupancy: 65,
              },
              {
                busNumber: 'Bus 504',
                route: 'RT-415',
                destination: 'Thane Station East',
                eta: '11 min',
                occupancy: 42,
              },
            ],
          };
        });
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[TransitService] Stops fetch error:', error);
      }
    }
    return [...MOCK_PASSENGER_STOPS];
  },

  /**
   * Fetches stop by ID
   */
  async getStopById(stopId) {
    try {
      const data = await apiClient.get(`/stops/${encodeURIComponent(stopId)}`);
      if (data) {
        return {
          id: data.code || data._id,
          code: data.code,
          name: data.name,
          coordinates: data.coordinates || { x: 50, y: 50 },
          zone: data.zone,
          amenities: data.amenities || [],
          connectedRoutes: data.connectedRoutes || [],
        };
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[TransitService] Stop fetch error:', error);
      }
    }
    return (
      MOCK_PASSENGER_STOPS.find((s) => s.id === stopId || s.code === stopId) ||
      MOCK_PASSENGER_STOPS[0]
    );
  },

  /**
   * Subscribes to simulated or live real-time GPS coordinate stream
   */
  subscribeToLiveBuses(callback) {
    subscribers.push(callback);
    callback(liveBusesState);

    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  /**
   * Simulates a single tick of vehicle movement (offline simulation fallback)
   */
  simulateTick() {
    // If Socket.IO is actively receiving real-time stream, do not overwrite with simulated jitter
    if (socketClient.isRealtimeActive()) {
      return;
    }

    liveBusesState = liveBusesState.map((bus, idx) => {
      const deltaX = (Math.sin(Date.now() / 4000 + idx) * 1.5);
      const deltaY = (Math.cos(Date.now() / 4000 + idx) * 1.5);
      return {
        ...bus,
        coordinates: {
          x: Math.max(10, Math.min(90, bus.coordinates.x + deltaX)),
          y: Math.max(15, Math.min(85, bus.coordinates.y + deltaY)),
        },
        lastPing: 'Just now (Simulated)',
      };
    });
    notifySubscribers();
  },
};

export default transitService;
