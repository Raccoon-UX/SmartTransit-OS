/**
 * SmartTransit OS — Transport Admin Alert Management Service
 */

import { MOCK_ADMIN_ALERTS } from '../../data/admin/adminAlerts.js';

let alertsState = [...MOCK_ADMIN_ALERTS];

export const alertService = {
  getAlerts(statusFilter = 'ALL') {
    if (statusFilter === 'ALL') return [...alertsState];
    return alertsState.filter((a) => a.status === statusFilter);
  },

  createAlert({ title, message, severity = 'warning', type = 'DISRUPTION', affectedRoute = 'RT-108', affectedStop = 'All Stops', status = 'ACTIVE' }) {
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
