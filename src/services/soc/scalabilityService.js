/**
 * SmartTransit OS — Scalability & Capacity Headroom Service
 * Interacts with telemetryEngine for Traffic Surge and Scale-Out simulations.
 */

import { MOCK_SCALABILITY_DATA } from '../../data/soc/scalability.js';
import { telemetryEngine } from './telemetryEngine.js';
import { socActivityService } from './socActivityService.js';

export const scalabilityService = {
  getScalabilityData() {
    return { ...MOCK_SCALABILITY_DATA };
  },

  triggerTrafficSurge() {
    telemetryEngine.triggerTrafficSurge();
    socActivityService.logActivity({
      actor: 'SOC Simulator',
      action: 'TRAFFIC_SURGE_ACTIVATED',
      details: 'Active sessions spiked to 9,850. CPU load 92%. Capacity warning triggered.',
      status: 'WARNING',
    });
  },

  triggerScaleOut() {
    telemetryEngine.triggerScaleOut();
    socActivityService.logActivity({
      actor: 'SOC AutoScaler',
      action: 'SCALE_OUT_EXECUTED',
      details: 'Node count scaled from 3 to 4 nodes (+33% capacity headroom). Load normalized.',
      status: 'SUCCESS',
    });
  },

  resetSimulation() {
    telemetryEngine.resetSimulation();
    socActivityService.logActivity({
      actor: 'SOC Simulator',
      action: 'SIMULATION_RESET',
      details: 'Telemetry simulation reset to normal baseline (8,451 users, 63% CPU).',
      status: 'INFO',
    });
  },
};

export default scalabilityService;
