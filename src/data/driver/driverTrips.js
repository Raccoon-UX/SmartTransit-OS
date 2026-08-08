/**
 * SmartTransit OS — Isolated Driver Completed Trips & Shift History
 */

export const MOCK_DRIVER_TRIPS = [
  {
    id: 'trp-042-1',
    busNumber: 'Bus 245',
    routeCode: 'RT-108',
    date: 'Today, Aug 08',
    startTime: '05:30 AM',
    endTime: '06:44 AM',
    duration: '1h 14m',
    distance: '18.4 km',
    completedStops: '32 / 32',
    finalOccupancy: '62%',
    onTimeStatus: 'ON TIME (+1 min)',
    status: 'COMPLETED',
  },
  {
    id: 'trp-042-2',
    busNumber: 'Bus 245',
    routeCode: 'RT-108',
    date: 'Today, Aug 08',
    startTime: '07:00 AM',
    endTime: '08:15 AM',
    duration: '1h 15m',
    distance: '18.4 km',
    completedStops: '32 / 32',
    finalOccupancy: '78%',
    onTimeStatus: 'ON TIME (Exact)',
    status: 'COMPLETED',
  },
  {
    id: 'trp-042-3',
    busNumber: 'Bus 245',
    routeCode: 'RT-108',
    date: 'Today, Aug 08',
    startTime: '08:45 AM',
    endTime: '10:02 AM',
    duration: '1h 17m',
    distance: '18.4 km',
    completedStops: '32 / 32',
    finalOccupancy: '86%',
    onTimeStatus: 'DELAYED (+4 min Traffic)',
    status: 'COMPLETED',
  },
];

export const MOCK_SHIFT_SUMMARY = {
  totalTripsCount: 3,
  totalDrivingTime: '4h 12m',
  totalDistanceDriven: '55.2 km',
  totalStopsCompleted: 96,
  onTimePerformancePercent: 96.4,
  averageOccupancyPercent: 75.3,
  fuelEfficiency: '1.2 kWh / km',
};
