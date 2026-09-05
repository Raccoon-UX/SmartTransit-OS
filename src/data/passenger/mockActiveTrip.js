/**
 * SmartTransit OS — Simulated Active Trip Model (Regional Context)
 */

export const INITIAL_ACTIVE_TRIP = {
  isActive: true,
  busNumber: 'BEST A-297',
  routeCode: 'BEST-A297',
  routeName: 'BEST A-297 (Borivali Station (E) ➔ Kokanipada Ext)',
  origin: 'Borivali Station (E)',
  destination: 'Kokanipada Ext',
  currentStop: 'Borivali Station (E)',
  nextStop: 'Kokanipada Ext',
  etaToNextStop: 'Scheduled',
  etaToDestination: 'Scheduled',
  occupancyPercent: 50,
  occupancyStatus: 'SCHEDULED',
  progressPercent: 50,
  speed: 'Schedule Pace',
  driverName: 'BEST Duty Pilot',
  startedAt: '10:15 AM',
  estimatedArrival: '10:45 AM',
  dataSource: 'Regional Transit Dataset',
};
