/**
 * SmartTransit OS — Driver Operational Alerts Service
 */

import { MOCK_DRIVER_ALERTS } from '../../data/driver/driverAlerts.js';

let alertsState = [...MOCK_DRIVER_ALERTS];

export const driverNotificationService = {
  getAlerts() {
    return [...alertsState];
  },

  markAsRead(alertId) {
    alertsState = alertsState.map((a) => (a.id === alertId ? { ...a, isRead: true } : a));
    return [...alertsState];
  },

  dismissAlert(alertId) {
    alertsState = alertsState.filter((a) => a.id !== alertId);
    return [...alertsState];
  },
};

export default driverNotificationService;
