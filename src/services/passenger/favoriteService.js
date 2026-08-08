/**
 * SmartTransit OS — Passenger Favorites Service
 */

import { INITIAL_PASSENGER_FAVORITES } from '../../data/passenger/mockFavorites.js';

const STORAGE_KEY = 'smarttransit_passenger_favorites_v1';

function getStoredFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_PASSENGER_FAVORITES;
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_PASSENGER_FAVORITES;
  }
}

function saveFavorites(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to persist favorites', e);
  }
}

export const favoriteService = {
  getFavorites() {
    return getStoredFavorites();
  },

  addFavoriteRoute(route) {
    const current = getStoredFavorites();
    if (current.routes.some((r) => r.id === route.id || r.routeCode === route.routeCode)) return current;

    const updated = {
      ...current,
      routes: [
        {
          id: route.id || route.routeCode,
          name: `${route.origin} → ${route.destination}`,
          routeCode: route.routeCode || route.id,
          busNumber: route.busNumber || 'Bus 245',
          origin: route.origin,
          destination: route.destination,
          eta: route.eta || '5 min',
          frequency: route.frequency || 'Every 8 mins',
          occupancy: route.occupancy || 65,
          status: 'ON TIME',
        },
        ...current.routes,
      ],
    };
    saveFavorites(updated);
    return updated;
  },

  removeFavoriteRoute(routeId) {
    const current = getStoredFavorites();
    const updated = {
      ...current,
      routes: current.routes.filter((r) => r.id !== routeId && r.routeCode !== routeId),
    };
    saveFavorites(updated);
    return updated;
  },

  isRouteSaved(routeId) {
    const current = getStoredFavorites();
    return current.routes.some((r) => r.id === routeId || r.routeCode === routeId);
  },
};

export default favoriteService;
