/**
 * SmartTransit OS — Route Intelligence Service
 */
import { aiEngine } from './aiEngine.js';

export const routeIntelligenceService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        insights: snapshot.routeInsights,
      });
    });
  },

  analyzeRoute(routeId) {
    const snapshot = aiEngine.getSnapshot();
    return snapshot.routeInsights.find((r) => r.routeId === routeId) || snapshot.routeInsights[0];
  },
};

export default routeIntelligenceService;
