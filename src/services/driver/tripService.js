import { apiClient } from '../api/apiClient.js';
import { socketClient } from '../realtime/socketClient.js';
import { MOCK_DRIVER_ASSIGNMENT } from '../../data/driver/driverAssignment.js';
import { MOCK_DRIVER_TRIPS } from '../../data/driver/driverTrips.js';

let tripState = {
  status: 'READY', // IDLE | READY | ACTIVE | COMPLETED
  busNumber: MOCK_DRIVER_ASSIGNMENT.busNumber,
  routeCode: MOCK_DRIVER_ASSIGNMENT.routeCode,
  routeName: MOCK_DRIVER_ASSIGNMENT.routeName,
  origin: MOCK_DRIVER_ASSIGNMENT.origin,
  destination: MOCK_DRIVER_ASSIGNMENT.destination,
  shiftTiming: MOCK_DRIVER_ASSIGNMENT.shiftTiming,
  currentStop: MOCK_DRIVER_ASSIGNMENT.currentStopName,
  nextStop: MOCK_DRIVER_ASSIGNMENT.nextStopName,
  nextStopDistance: MOCK_DRIVER_ASSIGNMENT.nextStopDistance,
  nextStopEta: MOCK_DRIVER_ASSIGNMENT.nextStopEta,
  nextStopWaiting: MOCK_DRIVER_ASSIGNMENT.nextStopWaitingPassengers,
  completedStopsCount: 8,
  totalStopsCount: 32,
  progressPercent: 42,
  speed: '38 km/h',
  startedAt: null,
  completedAt: null,
  tripDuration: '0h 0m',
  distanceTraveled: '0.0 km',
  gpsCoordinates: { x: 38, y: 44 },
  summaryReport: null,
};

let tripSubscribers = [];
let gpsInterval = null;

function notify() {
  tripSubscribers.forEach((callback) => {
    try {
      callback({ ...tripState });
    } catch (err) {
      console.warn('[TripService] Subscriber callback error:', err);
    }
  });
}

// Setup Socket.IO realtime listener for active trip updates
socketClient.subscribe('trip:updated', (payload) => {
  if (!payload) return;
  tripState = {
    ...tripState,
    status: payload.status || tripState.status,
    progressPercent: payload.progressPercent !== undefined ? payload.progressPercent : tripState.progressPercent,
    currentStop: payload.currentStop || tripState.currentStop,
    nextStop: payload.nextStop || tripState.nextStop,
  };
  notify();
});

function startGpsSimulation() {
  if (gpsInterval) clearInterval(gpsInterval);
  gpsInterval = setInterval(() => {
    if (tripState.status === 'ACTIVE') {
      const deltaX = Math.sin(Date.now() / 3000) * 1.2;
      const deltaY = Math.cos(Date.now() / 3000) * 1.2;
      tripState = {
        ...tripState,
        gpsCoordinates: {
          x: Math.max(12, Math.min(88, tripState.gpsCoordinates.x + deltaX)),
          y: Math.max(15, Math.min(85, tripState.gpsCoordinates.y + deltaY)),
        },
      };
      notify();
    }
  }, 2000);
}

export const tripService = {
  getTripState() {
    return { ...tripState };
  },

  subscribeTrip(callback) {
    if (typeof callback === 'function') {
      tripSubscribers.push(callback);
      callback({ ...tripState });
    }
    return () => {
      tripSubscribers = tripSubscribers.filter((cb) => cb !== callback);
    };
  },

  async startTrip() {
    try {
      const data = await apiClient.post('/trips/start', { busNumber: tripState.busNumber });
      if (data) {
        console.info('[TripService] Backend trip started:', data.tripId || 'ACTIVE');
      }
    } catch (error) {
      if (!error.isFallbackEligible && error.status !== 409) {
        console.warn('[TripService] Start trip API warning:', error);
      }
    }

    const startTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    tripState = {
      ...tripState,
      status: 'ACTIVE',
      startedAt: startTimeStr,
      completedStopsCount: 8,
      progressPercent: 42,
      speed: '42 km/h',
      distanceTraveled: '5.5 km',
    };
    startGpsSimulation();
    notify();
    return { ...tripState };
  },

  async endTrip() {
    let summary = null;
    try {
      const data = await apiClient.post('/trips/end');
      if (data?.summaryReport) {
        summary = data.summaryReport;
      }
    } catch (error) {
      if (!error.isFallbackEligible && error.status !== 404) {
        console.warn('[TripService] End trip API warning:', error);
      }
    }

    if (gpsInterval) {
      clearInterval(gpsInterval);
      gpsInterval = null;
    }
    const endTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const finalSummary = summary || {
      busNumber: tripState.busNumber,
      routeCode: tripState.routeCode,
      routeName: tripState.routeName,
      startTime: tripState.startedAt || '10:15 AM',
      endTime: endTimeStr,
      duration: '1h 14m',
      distance: '18.4 km',
      stopsCompleted: '32 / 32',
      onTime: 'YES (Exact)',
      finalOccupancy: '62%',
    };

    tripState = {
      ...tripState,
      status: 'COMPLETED',
      completedAt: endTimeStr,
      speed: '0 km/h',
      progressPercent: 100,
      completedStopsCount: 32,
      summaryReport: finalSummary,
    };
    notify();
    return { ...tripState };
  },

  resetTrip() {
    if (gpsInterval) {
      clearInterval(gpsInterval);
      gpsInterval = null;
    }
    tripState = {
      ...tripState,
      status: 'READY',
      startedAt: null,
      completedAt: null,
      progressPercent: 0,
      completedStopsCount: 0,
      summaryReport: null,
    };
    notify();
    return { ...tripState };
  },

  getShiftReports() {
    return {
      trips: [...MOCK_DRIVER_TRIPS],
    };
  },
};

export default tripService;
