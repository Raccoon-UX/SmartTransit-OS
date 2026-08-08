/**
 * SmartTransit OS — Transport Admin Route Service
 */

import { MOCK_ADMIN_ROUTES } from '../../data/admin/adminRoutes.js';

export const adminRouteService = {
  getRoutes() {
    return [...MOCK_ADMIN_ROUTES];
  },

  getRouteById(routeId) {
    return (
      MOCK_ADMIN_ROUTES.find(
        (r) => r.id === routeId || r.routeCode.toLowerCase() === routeId.toLowerCase()
      ) || MOCK_ADMIN_ROUTES[0]
    );
  },
};

export default adminRouteService;
