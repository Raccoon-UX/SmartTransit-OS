/**
 * SmartTransit OS — Security Event Stream & Metrics Service
 */

import { MOCK_SECURITY_EVENTS, MOCK_SECURITY_METRICS } from '../../data/soc/securityEvents.js';

let securityEventsState = [...MOCK_SECURITY_EVENTS];

export const securityService = {
  getSecurityEvents() {
    return [...securityEventsState];
  },

  getSecurityMetrics() {
    return { ...MOCK_SECURITY_METRICS };
  },
};

export default securityService;
