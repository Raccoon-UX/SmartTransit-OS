/**
 * SmartTransit OS — Driver Incident & Emergency SOS Service
 * Simulated emergency dispatch & operational issue reporting.
 */

import { INITIAL_DRIVER_INCIDENTS, MOCK_INCIDENT_CATEGORIES } from '../../data/driver/driverIncidents.js';

let incidentsState = [...INITIAL_DRIVER_INCIDENTS];
let activeSosState = null;
let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb({ incidents: [...incidentsState], activeSos: activeSosState }));
}

export const incidentService = {
  getIncidents() {
    return [...incidentsState];
  },

  getActiveSos() {
    return activeSosState;
  },

  subscribe(callback) {
    subscribers.push(callback);
    callback({ incidents: [...incidentsState], activeSos: activeSosState });
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  triggerEmergencySos({ reason = 'Emergency SOS Triggered by Driver', category = 'GENERAL' }) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    activeSosState = {
      id: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      title: 'EMERGENCY SOS BROADCAST ACTIVE',
      reason,
      status: 'DISPATCH NOTIFIED',
      vehicle: 'Bus 245 (NY-TR-8042)',
      route: 'RT-108 (Metro Coastal Express)',
      location: 'Dahisar Check Naka (GPS: 19.25, 72.85)',
      timestamp: `Today at ${timestamp}`,
      isSimulated: true,
      dispatchNote: 'Demo dispatch notification simulated. Operating in prototype environment.',
    };

    incidentsState = [activeSosState, ...incidentsState];
    notify();
    return activeSosState;
  },

  cancelEmergencySos() {
    if (activeSosState) {
      incidentsState = incidentsState.map((inc) =>
        inc.id === activeSosState.id ? { ...inc, status: 'CANCELLED BY DRIVER' } : inc
      );
      activeSosState = null;
      notify();
    }
  },

  reportIncident({ category, title, description, severity = 'MEDIUM', currentStop = 'Dahisar Check Naka' }) {
    const newInc = {
      id: `INC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      title: title || 'Operational Issue Report',
      description,
      severity,
      stop: currentStop,
      status: 'SUBMITTED',
      timestamp: 'Just now',
    };

    incidentsState = [newInc, ...incidentsState];
    notify();
    return newInc;
  },
};

export default incidentService;
