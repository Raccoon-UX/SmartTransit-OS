/**
 * SmartTransit OS — Passenger Transit Service
 * Decoupled API layer managing live vehicles, bus stops, and simulated GPS streams.
 */

import { MOCK_PASSENGER_BUSES } from '../../data/passenger/mockBuses.js';
import { MOCK_PASSENGER_STOPS } from '../../data/passenger/mockStops.js';

let liveBusesState = [...MOCK_PASSENGER_BUSES];
let subscribers = [];

function notifySubscribers() {
  subscribers.forEach((callback) => callback(liveBusesState));
}

export const transitService = {
  /**
   * Fetches all live buses
   */
  async getLiveBuses() {
    await new Promise((res) => setTimeout(res, 150));
    return [...liveBusesState];
  },

  /**
   * Fetches a single bus by ID or bus number
   */
  async getBusById(busId) {
    await new Promise((res) => setTimeout(res, 120));
    return liveBusesState.find(
      (b) => b.id === busId || b.busNumber.toLowerCase() === busId.toLowerCase()
    ) || liveBusesState[0];
  },

  /**
   * Fetches nearby bus stops
   */
  async getNearbyStops() {
    await new Promise((res) => setTimeout(res, 150));
    return [...MOCK_PASSENGER_STOPS];
  },

  /**
   * Fetches stop by ID
   */
  async getStopById(stopId) {
    await new Promise((res) => setTimeout(res, 100));
    return MOCK_PASSENGER_STOPS.find((s) => s.id === stopId || s.code === stopId) || MOCK_PASSENGER_STOPS[0];
  },

  /**
   * Subscribes to simulated real-time GPS coordinate stream
   */
  subscribeToLiveBuses(callback) {
    subscribers.push(callback);
    callback(liveBusesState);

    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  /**
   * Simulates a single tick of vehicle movement & ETA fluctuation
   */
  simulateTick() {
    liveBusesState = liveBusesState.map((bus, idx) => {
      const deltaX = (Math.sin(Date.now() / 4000 + idx) * 1.5);
      const deltaY = (Math.cos(Date.now() / 4000 + idx) * 1.5);
      return {
        ...bus,
        coordinates: {
          x: Math.max(10, Math.min(90, bus.coordinates.x + deltaX)),
          y: Math.max(15, Math.min(85, bus.coordinates.y + deltaY)),
        },
        lastPing: 'Just now',
      };
    });
    notifySubscribers();
  },
};

export default transitService;
