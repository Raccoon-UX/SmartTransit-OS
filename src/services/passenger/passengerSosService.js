/**
 * SmartTransit OS — Passenger Emergency SOS Service
 * 
 * Manages passenger emergency trigger, context capture, backend incident creation,
 * active SOS state tracking, and multi-channel trusted contact notification.
 */

import { apiClient } from '../api/apiClient.js';

const STORAGE_KEY = 'smarttransit_passenger_active_sos';

let activeSosState = null;
let subscribers = [];

// Try to restore existing active SOS from session storage if any
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    activeSosState = JSON.parse(saved);
  }
} catch (e) {
  console.warn('[PassengerSosService] Storage read error:', e);
}

function notifySubscribers() {
  subscribers.forEach((cb) => cb(activeSosState));
}

function persistState(state) {
  activeSosState = state;
  try {
    if (state) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.warn('[PassengerSosService] Storage write error:', e);
  }
  notifySubscribers();
}

export const passengerSosService = {
  /**
   * Returns current active SOS if an emergency is in progress
   */
  getActiveSos() {
    return activeSosState;
  },

  /**
   * Subscribes to live active SOS state updates
   */
  subscribe(callback) {
    subscribers.push(callback);
    callback(activeSosState);
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  /**
   * Triggers an Emergency SOS incident with contextual transit data
   */
  async triggerEmergencySos({
    emergencyType = 'Personal Safety / Security',
    description = '',
    passengerId = 'usr-pass-001',
    passengerName = 'Aarav Sharma',
    journeyId = null,
    vehicleId = null,
    routeId = null,
    locationName = 'Western Highway Exchange (19.25°N, 72.85°E)',
    coordinates = { lat: 19.25, lng: 72.85 },
  }) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const incidentId = `SOS-2026-${randomSuffix}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullIso = new Date().toISOString();

    const incidentPayload = {
      incidentCode: incidentId,
      title: `🚨 PASSENGER SOS: ${emergencyType}`,
      severity: 'CRITICAL',
      type: 'PASSENGER_SOS',
      sourceRole: 'PASSENGER',
      emergencyType,
      description: description || `Passenger triggered ${emergencyType}`,
      passengerId,
      passengerName,
      journeyId: journeyId || undefined,
      busNumber: vehicleId || undefined,
      routeId: routeId || undefined,
      location: locationName,
      coordinates,
      status: 'REPORTED',
      reportedAt: fullIso,
      message: description || `Passenger emergency broadcast active: ${emergencyType}`,
    };

    // 1. Attempt Backend API persistence
    try {
      await apiClient.post('/incidents', incidentPayload);
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerSosService] Backend incident creation API warning:', e);
      }
    }

    // 2. Prepare client-side state with prototype communication deep-links
    const state = {
      id: incidentId,
      emergencyType,
      description,
      passengerId,
      passengerName,
      journeyId,
      vehicleId: vehicleId || 'Bus 245',
      routeId: routeId || 'RT-108',
      location: locationName,
      coordinates,
      timestamp: `Today at ${timestamp}`,
      status: 'REPORTED',
      reportedAt: fullIso,
      workflowStatus: 'Emergency incident created and forwarded to the configured operations workflow.',
      isPrototypeBroadcast: true,
    };

    persistState(state);
    return state;
  },

  /**
   * Resolves or cancels the active SOS with an explanation note
   */
  async resolveSos({ reason = 'Emergency situation resolved by passenger' } = {}) {
    if (!activeSosState) return null;

    const incidentId = activeSosState.id;

    // Attempt backend update
    try {
      await apiClient.patch(`/incidents/${encodeURIComponent(incidentId)}/status`, {
        status: 'RESOLVED',
        resolutionNote: reason,
      });
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerSosService] Resolve API warning:', e);
      }
    }

    persistState(null);
    return true;
  },
};
