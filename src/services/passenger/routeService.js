/**
 * SmartTransit OS — Passenger Route Service
 */

import { MOCK_PASSENGER_ROUTES } from '../../data/passenger/mockRoutes.js';

export const routeService = {
  async getAllRoutes() {
    await new Promise((res) => setTimeout(res, 150));
    return [...MOCK_PASSENGER_ROUTES];
  },

  async getRouteById(routeId) {
    await new Promise((res) => setTimeout(res, 120));
    return MOCK_PASSENGER_ROUTES.find(
      (r) => r.id === routeId || r.routeCode.toLowerCase() === routeId.toLowerCase()
    ) || MOCK_PASSENGER_ROUTES[0];
  },

  async searchRoutes(query = '') {
    await new Promise((res) => setTimeout(res, 100));
    const q = query.trim().toLowerCase();
    if (!q) return [...MOCK_PASSENGER_ROUTES];

    return MOCK_PASSENGER_ROUTES.filter(
      (r) =>
        r.routeCode.toLowerCase().includes(q) ||
        r.routeName.toLowerCase().includes(q) ||
        r.origin.toLowerCase().includes(q) ||
        r.destination.toLowerCase().includes(q)
    );
  },
};

export default routeService;
