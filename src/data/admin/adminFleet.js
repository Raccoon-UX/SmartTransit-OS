/**
 * SmartTransit OS — Admin Fleet Inventory Dataset
 * Sourced canonically from the regional transit dataset.
 */

import { CANONICAL_REGIONAL_BUSES } from '../regionalTransitData.js';

export const MOCK_ADMIN_FLEET = CANONICAL_REGIONAL_BUSES.map((bus) => ({
  id: bus.id,
  busNumber: `${bus.busType} ${bus.busNumber}`,
  rawBusNumber: bus.busNumber,
  serial: `REG-${bus.busType}-${bus.busNumber.replace(/\s+/g, '')}`,
  routeId: bus.routeCode,
  routeName: `${bus.origin} ➔ ${bus.destination}`,
  driverId: `PILOT-${bus.busType}`,
  driverName: `${bus.busType} Division Pilot`,
  depot: `${bus.busType} Regional Depot (${bus.area})`,
  operator: bus.busType,
  operatorName: bus.operatorName,
  operatorColor: bus.operatorColor,
  operatorBadgeBg: bus.operatorBadgeBg,
  area: bus.area,
  region: bus.region,
  origin: bus.origin,
  destination: bus.destination,
  status: 'ACTIVE',
  occupancyPercent: 50,
  occupancyStatus: 'SCHEDULED',
  speed: 'Schedule Pace',
  currentLocation: bus.origin,
  nextStop: bus.destination,
  eta: 'Scheduled',
  gpsStatus: 'STATIC RECORD',
  networkStatus: 'CONNECTED',
  healthStatus: 'NORMAL',
  batteryFuel: '85%',
  lastUpdate: 'Regional Transit Dataset',
  coordinates: { x: 50, y: 50 },
  dataSource: bus.dataSource,
  isStaticRegional: true,
}));

export default MOCK_ADMIN_FLEET;
