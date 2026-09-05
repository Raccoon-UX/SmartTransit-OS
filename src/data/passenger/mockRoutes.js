/**
 * SmartTransit OS — Passenger Regional Routes Data
 * Sourced canonically from the regional transit dataset.
 * 
 * NOTE: Origins and Destinations are treated strictly as route/service endpoints.
 * No intermediate stop network is inferred or manufactured.
 */

import { CANONICAL_REGIONAL_ROUTES } from '../regionalTransitData.js';

export const MOCK_PASSENGER_ROUTES = CANONICAL_REGIONAL_ROUTES.map((route) => ({
  id: route.id,
  routeCode: route.routeCode,
  routeName: route.routeName,
  origin: route.origin,
  destination: route.destination,
  operator: route.operator,
  operatorName: route.operatorName,
  area: route.area,
  region: route.region,
  color: route.color,
  stopsCount: 2,
  frequency: 'Regional Schedule',
  operatingHours: 'Operating Daily (As Per Regional Timetable)',
  fareRange: 'Standard Regional Fare',
  activeBusesCount: 1,
  operationalStatus: 'STATIC SCHEDULED',
  description: `${route.operator} regional bus service connecting ${route.origin} directly to ${route.destination} (${route.region}).`,
  endpoints: route.endpoints,
  stops: [
    { id: `orig-${route.id}`, name: route.origin, code: 'ORIGIN', sequence: 1, isOrigin: true },
    { id: `dest-${route.id}`, name: route.destination, code: 'DESTINATION', sequence: 2, isDestination: true },
  ],
  intermediateStopsAvailable: false,
  dataSource: route.dataSource,
}));

export default MOCK_PASSENGER_ROUTES;
