/**
 * SmartTransit OS — Transport Analytics Service
 */

import { MOCK_ADMIN_ANALYTICS } from '../../data/admin/adminAnalytics.js';

export const analyticsService = {
  getAnalytics(timeframe = 'today') {
    if (timeframe === '7days') return MOCK_ADMIN_ANALYTICS.days7;
    if (timeframe === '30days') return MOCK_ADMIN_ANALYTICS.days30;
    return MOCK_ADMIN_ANALYTICS.today;
  },
};

export default analyticsService;
