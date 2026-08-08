/**
 * SmartTransit OS — Realtime Gateway & WebSocket Pool Service
 */

import { MOCK_REALTIME_METRICS } from '../../data/soc/realtimeMetrics.js';

export const realtimeService = {
  getRealtimeMetrics() {
    return { ...MOCK_REALTIME_METRICS };
  },
};

export default realtimeService;
