/**
 * SmartTransit OS — Passenger Notification & Preferences Service
 */

import { MOCK_PASSENGER_ALERTS } from '../../data/passenger/mockAlerts.js';

let alertsState = [...MOCK_PASSENGER_ALERTS];
const PREFS_KEY = 'smarttransit_passenger_prefs_v1';

const DEFAULT_PREFS = {
  delayAlerts: true,
  favoriteRouteUpdates: true,
  journeyReminders: true,
  monsoonWeatherAdvisories: true,
  defaultTravelMode: 'fastest', // 'fastest' | 'fewer_transfers' | 'less_walking'
  lowOccupancyPreference: true,
};

export const passengerNotificationService = {
  getAlerts() {
    return [...alertsState];
  },

  markAsRead(alertId) {
    alertsState = alertsState.map((a) => (a.id === alertId ? { ...a, isRead: true } : a));
    return [...alertsState];
  },

  markAllAsRead() {
    alertsState = alertsState.map((a) => ({ ...a, isRead: true }));
    return [...alertsState];
  },

  getPreferences() {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (!raw) return DEFAULT_PREFS;
      return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
    } catch (e) {
      return DEFAULT_PREFS;
    }
  },

  savePreferences(newPrefs) {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(newPrefs));
    } catch (e) {
      console.warn('Failed to persist preferences', e);
    }
    return newPrefs;
  },
};

export default passengerNotificationService;
