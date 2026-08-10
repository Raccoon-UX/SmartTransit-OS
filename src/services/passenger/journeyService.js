/**
 * SmartTransit OS — Journey Planner & Multimodal State Machine Service
 */

import { multimodalRouteService } from './multimodalRouteService.js';
import { INITIAL_ACTIVE_TRIP } from '../../data/passenger/mockActiveTrip.js';

let activeTripState = {
  ...INITIAL_ACTIVE_TRIP,
  currentSegmentIndex: 0,
  stepState: 'IDLE', // IDLE | WALKING_TO_STOP | WAITING_FOR_BUS | ON_BUS | TRANSFER | FINAL_WALK | ARRIVED
};

let activeTripListeners = [];

function notifyActiveTrip() {
  activeTripListeners.forEach((cb) => cb(activeTripState));
}

export const journeyService = {
  /**
   * Calculates multi-option journey plans from origin to destination using generic routing engine
   */
  async planJourney({ from, to, preference = 'best_overall' }) {
    return await multimodalRouteService.planJourney({ from, to, preference });
  },

  /**
   * Fetches the current active trip state
   */
  getActiveTrip() {
    return activeTripState;
  },

  /**
   * Starts a new active trip from a selected plan
   */
  startJourney(plan) {
    const firstSegment = plan?.segments?.[0];
    const initialStepState = firstSegment?.type === 'WALK' ? 'WALKING_TO_STOP' : 'ON_BUS';

    activeTripState = {
      ...INITIAL_ACTIVE_TRIP,
      isActive: true,
      planId: plan?.id || 'jp-opt-1',
      planTitle: plan?.title || 'Selected Multimodal Journey',
      activePlan: plan,
      currentSegmentIndex: 0,
      stepState: initialStepState,
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    notifyActiveTrip();
    return activeTripState;
  },

  /**
   * Advances the active journey to the next step
   */
  advanceStep() {
    if (!activeTripState.isActive || !activeTripState.activePlan) return activeTripState;

    const segments = activeTripState.activePlan.segments || [];
    const nextIdx = activeTripState.currentSegmentIndex + 1;

    if (nextIdx < segments.length) {
      const nextSeg = segments[nextIdx];
      let nextStepState = 'ON_BUS';

      if (nextSeg.type === 'WALK') {
        nextStepState = nextIdx === segments.length - 1 ? 'FINAL_WALK' : 'WALKING_TO_STOP';
      } else if (nextSeg.type === 'TRANSFER') {
        nextStepState = 'TRANSFER';
      } else if (nextSeg.type === 'BUS') {
        nextStepState = 'ON_BUS';
      }

      activeTripState = {
        ...activeTripState,
        currentSegmentIndex: nextIdx,
        stepState: nextStepState,
      };
    } else {
      activeTripState = {
        ...activeTripState,
        stepState: 'ARRIVED',
        isActive: false,
      };
    }

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
      stepState: 'IDLE',
      activePlan: null,
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
