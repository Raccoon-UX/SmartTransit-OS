/**
 * SmartTransit OS — Deep-Dive Observability Time-Series Telemetry Dataset
 */

export const MOCK_TELEMETRY_SERIES = {
  m15: {
    timeframe: '15 Minutes',
    cpuPercentSeries: [
      { time: '10:35', value: 41 },
      { time: '10:40', value: 58 },
      { time: '10:45', value: 63 },
      { time: '10:50', value: 67 },
    ],
    apiLatencySeries: [
      { time: '10:35', value: 12 },
      { time: '10:40', value: 14 },
      { time: '10:45', value: 18 },
      { time: '10:50', value: 14 },
    ],
  },
  h1: {
    timeframe: '1 Hour',
    cpuPercentSeries: [
      { time: '10:00', value: 38 },
      { time: '10:15', value: 52 },
      { time: '10:30', value: 63 },
      { time: '10:45', value: 65 },
    ],
    apiLatencySeries: [
      { time: '10:00', value: 11 },
      { time: '10:15', value: 13 },
      { time: '10:30', value: 15 },
      { time: '10:45', value: 14 },
    ],
  },
  h6: {
    timeframe: '6 Hours',
    cpuPercentSeries: [
      { time: '05:00', value: 25 },
      { time: '07:00', value: 72 },
      { time: '09:00', value: 85 },
      { time: '11:00', value: 63 },
    ],
    apiLatencySeries: [
      { time: '05:00', value: 10 },
      { time: '07:00', value: 18 },
      { time: '09:00', value: 24 },
      { time: '11:00', value: 14 },
    ],
  },
  h24: {
    timeframe: '24 Hours',
    cpuPercentSeries: [
      { time: '12:00 PM', value: 65 },
      { time: '06:00 PM', value: 82 },
      { time: '12:00 AM', value: 20 },
      { time: '06:00 AM', value: 58 },
    ],
    apiLatencySeries: [
      { time: '12:00 PM', value: 14 },
      { time: '06:00 PM', value: 22 },
      { time: '12:00 AM', value: 9 },
      { time: '06:00 AM', value: 13 },
    ],
  },
};
