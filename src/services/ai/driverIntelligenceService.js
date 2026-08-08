/**
 * SmartTransit OS — Driver Intelligence Service
 */
import { aiEngine } from './aiEngine.js';

export const driverIntelligenceService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        insights: snapshot.driverInsights,
      });
    });
  },

  analyzeDriver(driverId) {
    const snapshot = aiEngine.getSnapshot();
    return snapshot.driverInsights.find((d) => d.driverId === driverId) || snapshot.driverInsights[0];
  },
};

export default driverIntelligenceService;
