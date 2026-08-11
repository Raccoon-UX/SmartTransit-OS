import { apiClient } from '../api/apiClient.js';
import { socketClient } from '../realtime/socketClient.js';
import { MOCK_ADMIN_ALERTS } from '../../data/admin/adminAlerts.js';

let alertsState = [...MOCK_ADMIN_ALERTS];

function normalizeAlert(a) {
  return {
    id: a.alertId || a._id,
    title: a.title,
    message: a.message,
    severity: (a.severity || 'warning').toLowerCase(),
    type: a.category || 'DISRUPTION',
    affectedRoute: a.affectedRouteCode || 'RT-108',
    affectedStop: 'All Stops',
    status: a.isActive !== false ? 'ACTIVE' : 'RESOLVED',
    timestamp: a.createdAt ? new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now',
    publisher: 'Operations Command',
  };
}

// Setup Socket.IO realtime listener for newly created alerts
socketClient.subscribe('alert:created', (alertData) => {
  if (!alertData) return;
  const newAlert = {
    id: alertData.alertId || `alt-${Date.now()}`,
    title: alertData.title,
    message: alertData.message,
    severity: (alertData.severity || 'warning').toLowerCase(),
    type: 'DISRUPTION',
    affectedRoute: alertData.affectedRouteCode || 'RT-108',
    affectedStop: 'All Stops',
    status: 'ACTIVE',
    timestamp: 'Just now (Live)',
    publisher: 'Operations Command',
  };
  alertsState = [newAlert, ...alertsState];
});

export const alertService = {
  async getAlerts(statusFilter = 'ALL') {
    try {
      const data = await apiClient.get('/alerts');
      if (Array.isArray(data) && data.length > 0) {
        alertsState = data.map(normalizeAlert);
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[AlertService] Fetch warning:', error);
      }
    }
    if (statusFilter === 'ALL') return [...alertsState];
    return alertsState.filter((a) => a.status === statusFilter);
  },

  async createAlert({ title, message, severity = 'warning', type = 'DISRUPTION', affectedRoute = 'RT-108', affectedStop = 'All Stops', status = 'ACTIVE' }) {
    try {
      await apiClient.post('/alerts', {
        title,
        message,
        severity: severity.toUpperCase(),
        category: type,
        affectedRouteCode: affectedRoute,
      });
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[AlertService] Create warning:', error);
      }
    }

    const newAlert = {
      id: `alt-adm-${Math.floor(100 + Math.random() * 900)}`,
      title,
      message,
      severity,
      type,
      affectedRoute,
      affectedStop,
      status,
      timestamp: 'Just now',
      publisher: 'Operations Dispatcher',
    };
    alertsState = [newAlert, ...alertsState];
    return newAlert;
  },

  publishAlert(alertId) {
    alertsState = alertsState.map((a) => (a.id === alertId ? { ...a, status: 'ACTIVE', timestamp: 'Just now' } : a));
    return [...alertsState];
  },

  resolveAlert(alertId) {
    alertsState = alertsState.map((a) => (a.id === alertId ? { ...a, status: 'RESOLVED' } : a));
    return [...alertsState];
  },

  deleteDraft(alertId) {
    alertsState = alertsState.filter((a) => a.id !== alertId);
    return [...alertsState];
  },
};

export default alertService;
