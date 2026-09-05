/**
 * SmartTransit OS — Admin Regional Routes Dataset
 * Sourced canonically from the regional transit dataset.
 */

import { CANONICAL_REGIONAL_ROUTES } from '../regionalTransitData.js';

export const MOCK_ADMIN_ROUTES = CANONICAL_REGIONAL_ROUTES.map((route) => ({
  id: route.id,
  routeCode: route.routeCode,
  routeName: route.routeName,
  origin: route.origin,
  destination: route.destination,
  operator: route.operator,
  operatorName: route.operatorName,
  area: route.area,
  region: route.region,
  stopsCount: 2, // Endpoints only
  frequency: 'Regional Schedule',
  operatingHours: 'Daily Regional Service',
  activeBusesCount: 1,
  operationalStatus: 'ACTIVE',
  onTimeRate: '98.0%',
  avgDelayMinutes: '0.0 min',
  dailyPassengers: 'Regional Traffic',
  loadFactorPercent: 60,
  dataSource: route.dataSource,
}));

export default MOCK_ADMIN_ROUTES;
