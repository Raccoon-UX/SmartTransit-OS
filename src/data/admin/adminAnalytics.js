/**
 * SmartTransit OS — Isolated Admin Analytics Datasets
 */

export const MOCK_ADMIN_ANALYTICS = {
  today: {
    timeframe: 'Today',
    fleetUtilizationPercent: 82.0,
    avgSpeedKmh: '36.4 km/h',
    totalTripsExecuted: 1240,
    onTimeRateSeries: [
      { label: '06:00 AM', value: 98.2 },
      { label: '08:00 AM', value: 92.4 },
      { label: '10:00 AM', value: 94.7 },
      { label: '12:00 PM', value: 96.1 },
      { label: '02:00 PM', value: 95.8 },
    ],
    routeLoadSeries: [
      { route: 'RT-108', loadPercent: 78 },
      { route: 'RT-204', loadPercent: 55 },
      { route: 'RT-302', loadPercent: 82 },
      { route: 'RT-415', loadPercent: 88 },
    ],
  },
  days7: {
    timeframe: 'Past 7 Days',
    fleetUtilizationPercent: 85.4,
    avgSpeedKmh: '35.8 km/h',
    totalTripsExecuted: 8680,
    onTimeRateSeries: [
      { label: 'Mon', value: 94.1 },
      { label: 'Tue', value: 95.6 },
      { label: 'Wed', value: 96.2 },
      { label: 'Thu', value: 93.8 },
      { label: 'Fri', value: 92.5 },
      { label: 'Sat', value: 97.4 },
      { label: 'Sun', value: 98.1 },
    ],
    routeLoadSeries: [
      { route: 'RT-108', loadPercent: 81 },
      { route: 'RT-204', loadPercent: 58 },
      { route: 'RT-302', loadPercent: 85 },
      { route: 'RT-415', loadPercent: 84 },
    ],
  },
  days30: {
    timeframe: 'Past 30 Days',
    fleetUtilizationPercent: 87.1,
    avgSpeedKmh: '36.1 km/h',
    totalTripsExecuted: 36500,
    onTimeRateSeries: [
      { label: 'Week 1', value: 95.2 },
      { label: 'Week 2', value: 94.8 },
      { label: 'Week 3', value: 96.1 },
      { label: 'Week 4', value: 95.9 },
    ],
    routeLoadSeries: [
      { route: 'RT-108', loadPercent: 83 },
      { route: 'RT-204', loadPercent: 60 },
      { route: 'RT-302', loadPercent: 87 },
      { route: 'RT-415', loadPercent: 86 },
    ],
  },
};
