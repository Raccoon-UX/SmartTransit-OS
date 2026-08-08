/**
 * SmartTransit OS — ETA Intelligence Service
 * Predicts arrival times, compares scheduled vs telemetry vs AI, and generates ETA factor breakdowns.
 */

import { aiEngine } from './aiEngine.js';
import { MOCK_ETA_HISTORY } from '../../data/ai/etaPredictions.js';

export const etaService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        predictions: snapshot.etaPredictions,
        history: MOCK_ETA_HISTORY,
      });
    });
  },

  predictETA(busId, routeId) {
    const snapshot = aiEngine.getSnapshot();
    const prediction = snapshot.etaPredictions.find((p) => p.busId === busId || p.routeId === routeId);
    if (prediction) return prediction;
    return {
      busId: busId || 'b-245',
      busNumber: 'Bus 245',
      routeId: routeId || 'RT-108',
      routeName: 'Metro Coastal Express',
      scheduledEta: '10:42',
      telemetryEta: '10:43',
      aiPredictedEta: '10:44',
      delayMinutes: 2,
      confidence: 91,
      confidenceLevel: 'HIGH',
      factors: [
        { label: 'Traffic slowdown', impactMin: 2.1 },
        { label: 'Vehicle speed', impactMin: 0.8 },
      ],
    };
  },
};

export default etaService;
