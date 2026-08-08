/**
 * SmartTransit OS — SOC Incident Intelligence Service
 */
import { aiEngine } from './aiEngine.js';

export const incidentIntelligenceService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        incidents: snapshot.incidentInsights,
      });
    });
  },

  analyzeIncident(incidentId) {
    const snapshot = aiEngine.getSnapshot();
    return snapshot.incidentInsights.find((i) => i.incidentId === incidentId) || snapshot.incidentInsights[0];
  },
};

export default incidentIntelligenceService;
