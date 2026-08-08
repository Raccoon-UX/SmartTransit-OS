/**
 * SmartTransit OS — Incident Response Lifecycle Service
 */

import { INITIAL_INCIDENTS } from '../../data/soc/incidents.js';
import { socActivityService } from './socActivityService.js';

let incidentsState = [...INITIAL_INCIDENTS];
let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb([...incidentsState]));
}

export const incidentService = {
  getIncidents() {
    return [...incidentsState];
  },

  subscribe(callback) {
    subscribers.push(callback);
    callback([...incidentsState]);
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  getIncidentById(id) {
    return incidentsState.find((inc) => inc.id === id) || incidentsState[0];
  },

  updateIncidentStatus(id, newStatus, note = '') {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    incidentsState = incidentsState.map((inc) => {
      if (inc.id === id) {
        const updatedTimeline = [
          ...inc.timeline,
          { timestamp, note: note || `Incident status updated to ${newStatus}` },
        ];
        return { ...inc, status: newStatus, timeline: updatedTimeline };
      }
      return inc;
    });

    socActivityService.logActivity({
      actor: 'SOC Responder',
      action: 'INCIDENT_STATUS_CHANGE',
      details: `${id} transitioned to ${newStatus}`,
      status: 'INFO',
    });

    notify();
    return incidentsState.find((inc) => inc.id === id);
  },
};

export default incidentService;
