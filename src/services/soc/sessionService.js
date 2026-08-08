/**
 * SmartTransit OS — User Sessions & Capacity Headroom Service
 */

import { MOCK_USER_SESSIONS } from '../../data/soc/sessions.js';

export const sessionService = {
  getUserSessions() {
    return { ...MOCK_USER_SESSIONS };
  },
};

export default sessionService;
