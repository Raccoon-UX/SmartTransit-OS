/**
 * SmartTransit OS — API Endpoints Performance Monitoring Service
 */

import { MOCK_API_ENDPOINTS } from '../../data/soc/apiMetrics.js';

export const apiMonitoringService = {
  getApiEndpoints() {
    return [...MOCK_API_ENDPOINTS];
  },
};

export default apiMonitoringService;
