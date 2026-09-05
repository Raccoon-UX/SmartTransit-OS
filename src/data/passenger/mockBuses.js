/**
 * SmartTransit OS — Passenger Regional Buses Data
 * Derived directly from the canonical regional transit dataset.
 */

import { CANONICAL_REGIONAL_BUSES } from '../regionalTransitData.js';

export const MOCK_PASSENGER_BUSES = CANONICAL_REGIONAL_BUSES.map((bus) => ({
  id: bus.id,
  busNumber: `${bus.busType} ${bus.busNumber}`,
  rawBusNumber: bus.busNumber,
  serial: `REG-${bus.busType}-${bus.busNumber.replace(/\s+/g, '')}`,
  routeId: bus.routeCode,
  routeName: bus.routeName,
  origin: bus.origin,
  destination: bus.destination,
  area: bus.area,
  region: bus.region,
  busType: bus.busType,
  operator: bus.busType,
  operatorName: bus.operatorName,
  operatorColor: bus.operatorColor,
  operatorBadgeBg: bus.operatorBadgeBg,
  eta: 'Scheduled',
  etaMinutes: 0,
  occupancyPercent: 50,
  occupancyStatus: 'SCHEDULED',
  operationalStatus: 'STATIC SCHEDULED',
  speed: 'Standard Pace',
  heading: 'In Service',
  currentLocation: bus.origin,
  nextStop: bus.destination,
  upcomingStops: [bus.destination],
  passedStops: [bus.origin],
  coordinates: { x: 50, y: 50 },
  driverName: 'Regional Duty Pilot',
  vehicleType: `${bus.busType} Regional Transit`,
  acAvailable: bus.busNumber.includes('AC') || bus.busNumber.includes('Shivneri') || bus.busNumber.includes('Shivshahi'),
  wheelchairAccessible: true,
  lastPing: 'Regional Transit Dataset',
  dataSource: bus.dataSource,
  isStaticRegional: true,
}));

export default MOCK_PASSENGER_BUSES;
