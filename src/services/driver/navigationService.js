/**
 * SmartTransit OS — Driver Navigation Service
 * Stop sequence transitions, ETA countdowns, and waypoint guidance.
 */

import { MOCK_DRIVER_ROUTE_STOPS } from '../../data/driver/driverRoute.js';

export const navigationService = {
  async getRouteStops() {
    await new Promise((res) => setTimeout(res, 80));
    return [...MOCK_DRIVER_ROUTE_STOPS];
  },

  async getNextStop() {
    await new Promise((res) => setTimeout(res, 50));
    const next = MOCK_DRIVER_ROUTE_STOPS.find((s) => s.isUpcoming) || MOCK_DRIVER_ROUTE_STOPS[3];
    return { ...next };
  },
};

export default navigationService;
