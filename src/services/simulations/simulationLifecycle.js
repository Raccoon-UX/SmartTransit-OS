/**
 * SmartTransit OS — Global Simulation Lifecycle Manager
 * Manages simulation execution states (RUNNING, PAUSED, RESETTING, STOPPED),
 * registers telemetry and AI engine subscribers, and handles automatic cleanup on logout or unmount.
 */

import { telemetryEngine } from '../soc/telemetryEngine.js';
import { aiEngine } from '../ai/aiEngine.js';

let lifecycleState = {
  status: 'RUNNING', // 'RUNNING' | 'PAUSED' | 'RESETTING' | 'STOPPED'
  lastStateChange: new Date().toISOString(),
};

let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb({ ...lifecycleState }));
}

export const simulationLifecycle = {
  getState() {
    return { ...lifecycleState };
  },

  subscribe(callback) {
    subscribers.push(callback);
    callback({ ...lifecycleState });
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  pauseAll() {
    lifecycleState = {
      status: 'PAUSED',
      lastStateChange: new Date().toISOString(),
    };
    notify();
  },

  resumeAll() {
    lifecycleState = {
      status: 'RUNNING',
      lastStateChange: new Date().toISOString(),
    };
    notify();
  },

  resetAll() {
    telemetryEngine.resetSimulation();
    aiEngine.resetSimulation();
    lifecycleState = {
      status: 'RUNNING',
      lastStateChange: new Date().toISOString(),
    };
    notify();
  },

  stopAll() {
    lifecycleState = {
      status: 'STOPPED',
      lastStateChange: new Date().toISOString(),
    };
    notify();
  },
};

export default simulationLifecycle;
