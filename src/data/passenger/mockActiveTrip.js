/**
 * SmartTransit OS — Simulated Active Trip Model
 */

export const INITIAL_ACTIVE_TRIP = {
  isActive: true,
  busNumber: 'Bus 245',
  routeCode: 'RT-108',
  routeName: 'Metro Coastal Express',
  origin: 'Borivali Central Hub',
  destination: 'Andheri West Exchange',
  currentStop: 'Dahisar Check Naka (BST-024)',
  nextStop: 'Western Highway Exchange (BST-104)',
  etaToNextStop: '3 min',
  etaToDestination: '18 min',
  occupancyPercent: 78,
  occupancyStatus: 'HIGH',
  progressPercent: 65,
  speed: '38 km/h',
  driverName: 'Vikram J. (Pilot 042)',
  startedAt: '10:18 AM',
  estimatedArrival: '10:48 AM',
};
