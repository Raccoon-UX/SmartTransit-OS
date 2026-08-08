/**
 * SmartTransit OS — GPS Stream Telemetry Monitoring Service
 */

import { MOCK_GPS_TELEMETRY } from '../../data/soc/gpsTelemetry.js';

export const gpsMonitoringService = {
  getGpsTelemetry() {
    return { ...MOCK_GPS_TELEMETRY };
  },
};

export default gpsMonitoringService;
