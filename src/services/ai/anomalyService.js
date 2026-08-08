/**
 * SmartTransit OS — Anomaly Detection Service
 */
import { aiEngine } from './aiEngine.js';

export const anomalyService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        anomalies: snapshot.anomalyEvents,
      });
    });
  },

  detectAnomalies(entityId) {
    const snapshot = aiEngine.getSnapshot();
    if (!entityId) return snapshot.anomalyEvents;
    return snapshot.anomalyEvents.filter((a) => a.entityId === entityId || a.entity === entityId);
  },
};

export default anomalyService;
