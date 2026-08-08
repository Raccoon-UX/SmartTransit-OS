/**
 * SmartTransit OS — Demand Forecasting Service
 */
import { aiEngine } from './aiEngine.js';

export const demandService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        forecasts: snapshot.demandForecasts,
        heatmap: snapshot.demandHeatmap,
      });
    });
  },

  forecastDemand(routeId) {
    const snapshot = aiEngine.getSnapshot();
    return snapshot.demandForecasts.find((d) => d.routeId === routeId) || snapshot.demandForecasts[0];
  },
};

export default demandService;
