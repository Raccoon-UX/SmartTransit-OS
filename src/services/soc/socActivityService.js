import { apiClient } from '../api/apiClient.js';
import { socketClient } from '../realtime/socketClient.js';
import { INITIAL_SOC_ACTIVITY } from '../../data/soc/socActivity.js';

let activityState = [...INITIAL_SOC_ACTIVITY];
let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb([...activityState]));
}

function normalizeAuditLog(log) {
  return {
    id: log._id || log.targetResourceId || `act-${Date.now()}`,
    timestamp: log.timestamp ? new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
    actor: log.actorId?.name ? `${log.actorId.name} (${log.role || 'SOC'})` : log.role || 'System Watchdog',
    action: log.action || 'SOC_EVENT',
    details: `${log.targetResource || 'Resource'}: ${log.targetResourceId || ''}`,
    status: log.action === 'TRIGGER_SOS' ? 'CRITICAL' : 'INFO',
  };
}

// Setup Socket.IO realtime listener for incident lifecycle events
socketClient.subscribe('incident:created', (inc) => {
  if (!inc) return;
  const newAct = {
    id: inc.incidentCode || `soc-act-${Date.now()}`,
    timestamp: 'Just now (Live)',
    actor: 'SOC Operational Watchdog',
    action: `INCIDENT_REPORTED (${inc.severity || 'CRITICAL'})`,
    details: `${inc.title} at ${inc.location || 'Municipal Route'}`,
    status: inc.severity === 'CRITICAL' ? 'CRITICAL' : 'WARNING',
  };
  activityState = [newAct, ...activityState];
  notify();
});

export const socActivityService = {
  async getActivity() {
    try {
      const data = await apiClient.get('/soc/audit-logs');
      if (Array.isArray(data) && data.length > 0) {
        activityState = data.map(normalizeAuditLog);
        return [...activityState];
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        // If 403 Forbidden, throw so unauthorized access is strictly prevented
        if (error.status === 403) throw error;
        console.warn('[SocActivityService] Fetch warning:', error);
      }
    }
    return [...activityState];
  },

  subscribe(callback) {
    subscribers.push(callback);
    callback([...activityState]);
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  logActivity({ actor = 'System Watchdog', action = 'SOC_EVENT', details = '', status = 'INFO' }) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAct = {
      id: `soc-act-${Math.floor(100 + Math.random() * 900)}`,
      timestamp,
      actor,
      action,
      details,
      status,
    };
    activityState = [newAct, ...activityState];
    notify();
    return newAct;
  },
};

export default socActivityService;
