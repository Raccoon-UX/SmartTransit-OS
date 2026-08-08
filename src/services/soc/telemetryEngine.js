/**
 * SmartTransit OS — Centralized Telemetry Simulation Engine
 * Manages unified real-time metric updates, simulation states (NORMAL, WARNING, DEGRADED, CRITICAL),
 * Traffic Surge simulation, and Scale-Out capacity recovery.
 */

import { MOCK_SOC_OVERVIEW } from '../../data/soc/socOverview.js';
import { MOCK_SERVER_NODES } from '../../data/soc/servers.js';
import { MOCK_SCALABILITY_DATA } from '../../data/soc/scalability.js';

let telemetryState = {
  overview: { ...MOCK_SOC_OVERVIEW },
  servers: [...MOCK_SERVER_NODES],
  scalability: { ...MOCK_SCALABILITY_DATA },
  isSurgeActive: false,
  isScaledOut: false,
};

let subscribers = [];
let timer = null;

function notify() {
  subscribers.forEach((cb) => cb({ ...telemetryState }));
}

function startEngine() {
  if (timer) return;
  timer = setInterval(() => {
    // Subtle controlled jitter for real-time telemetry animation
    const jitterCpu = (Math.random() * 4 - 2);
    const jitterLatency = Math.floor(Math.random() * 3 - 1);

    if (telemetryState.isSurgeActive && !telemetryState.isScaledOut) {
      telemetryState.overview.globalStatus = 'WARNING';
      telemetryState.overview.apiLatencyMs = Math.min(240, telemetryState.overview.apiLatencyMs + 5);
      telemetryState.scalability.cpuUtilizationPercent = Math.min(94, telemetryState.scalability.cpuUtilizationPercent + 2);
      telemetryState.scalability.backpressureState = 'WARNING';
    } else if (telemetryState.isSurgeActive && telemetryState.isScaledOut) {
      telemetryState.overview.globalStatus = 'OPERATIONAL';
      telemetryState.overview.apiLatencyMs = Math.max(18, telemetryState.overview.apiLatencyMs - 10);
      telemetryState.scalability.cpuUtilizationPercent = Math.max(68, telemetryState.scalability.cpuUtilizationPercent - 4);
      telemetryState.scalability.backpressureState = 'NORMAL';
    } else {
      telemetryState.overview.globalStatus = 'OPERATIONAL';
      telemetryState.overview.apiLatencyMs = Math.max(10, Math.min(25, telemetryState.overview.apiLatencyMs + jitterLatency));
      telemetryState.scalability.cpuUtilizationPercent = Math.max(50, Math.min(75, Math.round(telemetryState.scalability.cpuUtilizationPercent + jitterCpu)));
      telemetryState.scalability.backpressureState = 'NORMAL';
    }

    notify();
  }, 2500);
}

export const telemetryEngine = {
  getSnapshot() {
    return { ...telemetryState };
  },

  subscribe(callback) {
    subscribers.push(callback);
    if (!timer) startEngine();
    callback({ ...telemetryState });
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
      if (subscribers.length === 0 && timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  },

  triggerTrafficSurge() {
    telemetryState = {
      ...telemetryState,
      isSurgeActive: true,
      isScaledOut: false,
      overview: {
        ...telemetryState.overview,
        globalStatus: 'WARNING',
        apiLatencyMs: 145,
        connectedUsers: 9850,
      },
      scalability: {
        ...telemetryState.scalability,
        currentUsers: 9850,
        currentReqPerSec: 2840,
        cpuUtilizationPercent: 92,
        ramUtilizationPercent: 88,
        queueDepth: 28,
        backpressureState: 'WARNING',
      },
    };
    notify();
  },

  triggerScaleOut() {
    telemetryState = {
      ...telemetryState,
      isScaledOut: true,
      scalability: {
        ...telemetryState.scalability,
        currentNodesCount: 4,
        cpuUtilizationPercent: 68,
        backpressureState: 'NORMAL',
      },
      overview: {
        ...telemetryState.overview,
        globalStatus: 'OPERATIONAL',
        apiLatencyMs: 22,
      },
    };
    notify();
  },

  resetSimulation() {
    telemetryState = {
      overview: { ...MOCK_SOC_OVERVIEW },
      servers: [...MOCK_SERVER_NODES],
      scalability: { ...MOCK_SCALABILITY_DATA },
      isSurgeActive: false,
      isScaledOut: false,
    };
    notify();
  },
};

export default telemetryEngine;
