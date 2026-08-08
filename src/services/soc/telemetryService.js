/**
 * SmartTransit OS — Deep Telemetry Time-Series Service
 */

import { MOCK_TELEMETRY_SERIES } from '../../data/soc/telemetry.js';

export const telemetryService = {
  getTelemetrySeries(range = 'm15') {
    return MOCK_TELEMETRY_SERIES[range] || MOCK_TELEMETRY_SERIES.m15;
  },
};

export default telemetryService;
