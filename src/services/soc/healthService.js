/**
 * SmartTransit OS — System Health & Service Matrix Service
 */

import { MOCK_SOC_OVERVIEW } from '../../data/soc/socOverview.js';
import { MOCK_SERVICE_HEALTH } from '../../data/soc/serviceHealth.js';

export const healthService = {
  getOverview() {
    return { ...MOCK_SOC_OVERVIEW };
  },

  getServiceMatrix() {
    return [...MOCK_SERVICE_HEALTH];
  },
};

export default healthService;
