/**
 * SmartTransit OS — Alert Intelligence Service
 */
import { aiEngine } from './aiEngine.js';

export const alertIntelligenceService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        alerts: snapshot.alertPredictions,
      });
    });
  },

  updateAlertStatus(id, status) {
    aiEngine.updateAlertStatus(id, status);
  },
};

export default alertIntelligenceService;
