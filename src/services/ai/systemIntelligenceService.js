/**
 * SmartTransit OS — System Intelligence Service
 */
import { aiEngine } from './aiEngine.js';

export const systemIntelligenceService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        system: snapshot.systemInsights,
      });
    });
  },

  analyzeSystem() {
    const snapshot = aiEngine.getSnapshot();
    return snapshot.systemInsights;
  },
};

export default systemIntelligenceService;
