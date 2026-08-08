/**
 * SmartTransit OS — Journey Planner & Active Commute Service
 */

import { MOCK_JOURNEY_PLANS } from '../../data/passenger/mockJourneys.js';
import { INITIAL_ACTIVE_TRIP } from '../../data/passenger/mockActiveTrip.js';

let activeTripState = { ...INITIAL_ACTIVE_TRIP };
let activeTripListeners = [];

function notifyActiveTrip() {
  activeTripListeners.forEach((cb) => cb(activeTripState));
}

export const journeyService = {
  /**
   * Calculates multi-option journey plans from origin to destination
   */
  async planJourney({ from, to, preference = 'fastest' }) {
    await new Promise((res) => setTimeout(res, 350)); // realistic transit calculation latency
    return [...MOCK_JOURNEY_PLANS];
  },

  /**
   * Fetches the current active trip state
   */
  getActiveTrip() {
    return activeTripState;
  },

  /**
   * Starts a new active trip
   */
  startJourney(planId = 'jp-opt-1') {
    activeTripState = {
      ...INITIAL_ACTIVE_TRIP,
      isActive: true,
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    notifyActiveTrip();
    return activeTripState;
  },

  /**
   * Cancels or completes the current journey
   */
  cancelJourney() {
    activeTripState = {
      ...activeTripState,
      isActive: false,
    };
    notifyActiveTrip();
    return activeTripState;
  },

  /**
   * Subscribes to active trip updates
   */
  subscribeActiveTrip(callback) {
    activeTripListeners.push(callback);
    callback(activeTripState);
    return () => {
      activeTripListeners = activeTripListeners.filter((cb) => cb !== callback);
    };
  },
};

export default journeyService;
