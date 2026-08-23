/**
 * SmartTransit OS — Passenger Trip History Service
 */

import { apiClient } from '../api/apiClient.js';
import { INITIAL_TRIP_HISTORY } from '../../data/passenger/mockTripHistory.js';

const STORAGE_KEY = 'smarttransit_passenger_trips';

let tripHistoryState = [...INITIAL_TRIP_HISTORY];

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      tripHistoryState = parsed;
    }
  }
} catch (e) {
  console.warn('[PassengerTripHistoryService] Storage read error:', e);
}

function persistState(state) {
  tripHistoryState = state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[PassengerTripHistoryService] Storage write error:', e);
  }
}

export const passengerTripHistoryService = {
  async getTripHistory() {
    try {
      const data = await apiClient.get('/trips/history');
      if (Array.isArray(data) && data.length > 0) {
        tripHistoryState = data;
        persistState(data);
        return [...tripHistoryState];
      }
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerTripHistoryService] Fetch API warning:', e);
      }
    }
    return [...tripHistoryState];
  },

  async getTripById(tripId) {
    return tripHistoryState.find((t) => t.id === tripId) || null;
  },

  markTripRated(tripId, ratingData) {
    const updated = tripHistoryState.map((trip) => {
      if (trip.id === tripId) {
        return {
          ...trip,
          rated: true,
          rating: ratingData,
        };
      }
      return trip;
    });
    persistState(updated);
    return updated;
  },
};
