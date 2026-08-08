/**
 * SmartTransit OS — PostgreSQL & Redis Cache Monitoring Service
 */

import { MOCK_DATABASE_METRICS } from '../../data/soc/databaseMetrics.js';

export const databaseService = {
  getDatabaseMetrics() {
    return { ...MOCK_DATABASE_METRICS };
  },
};

export default databaseService;
