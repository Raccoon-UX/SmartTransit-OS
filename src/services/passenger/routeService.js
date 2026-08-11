import { apiClient } from '../api/apiClient.js';
import { MOCK_PASSENGER_ROUTES } from '../../data/passenger/mockRoutes.js';

function normalizeRoute(r) {
  return {
    id: r.routeCode || r._id,
    routeCode: r.routeCode,
    routeName: r.routeName,
    origin: r.origin,
    destination: r.destination,
    color: r.color || '#0c87eb',
    stopsCount: r.stopsCount || r.stops?.length || 6,
    fareRange: r.fareRange || '₹15 – ₹45',
    frequency: r.frequency || 'Every 8 mins',
    operatingHours: r.operatingHours || '05:30 AM – 11:45 PM',
    stops: (r.stops || []).map((s) => ({
      id: s.stopCode || s.code || s._id,
      code: s.stopCode || s.code,
      name: s.stopName || s.name,
      offset: s.estimatedOffsetMinutes || s.offset || '0 min',
      distance: s.distanceFromOrigin || '2.4 km',
    })),
  };
}

export const routeService = {
  async getAllRoutes() {
    try {
      const data = await apiClient.get('/routes');
      if (Array.isArray(data) && data.length > 0) {
        return data.map(normalizeRoute);
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[RouteService] Access error:', error);
      }
    }
    return [...MOCK_PASSENGER_ROUTES];
  },

  async getRouteById(routeId) {
    try {
      const data = await apiClient.get(`/routes/${encodeURIComponent(routeId)}`);
      if (data) {
        return normalizeRoute(data);
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[RouteService] Route detail error:', error);
      }
    }
    return (
      MOCK_PASSENGER_ROUTES.find(
        (r) => r.id === routeId || r.routeCode?.toLowerCase() === routeId?.toLowerCase()
      ) || MOCK_PASSENGER_ROUTES[0]
    );
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
