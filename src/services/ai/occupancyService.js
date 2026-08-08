/**
 * SmartTransit OS — Occupancy Intelligence Service
 */
import { aiEngine } from './aiEngine.js';

export const occupancyService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        forecasts: snapshot.occupancyForecasts,
      });
    });
  },

  forecastOccupancy(busId, routeId) {
    const snapshot = aiEngine.getSnapshot();
    return snapshot.occupancyForecasts.find((f) => f.busId === busId || f.routeId === routeId) || snapshot.occupancyForecasts[0];
  },
};

export default occupancyService;
