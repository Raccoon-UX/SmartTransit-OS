/**
 * SmartTransit OS — Passenger Regional Terminals & Endpoints
 * 
 * NOTE: Origins and Destinations in the regional dataset are treated strictly
 * as terminal route endpoints. Intermediate stops are not inferred.
 */

import { CANONICAL_REGIONAL_STOPS, CANONICAL_REGIONAL_BUSES } from '../regionalTransitData.js';

export const MOCK_PASSENGER_STOPS = CANONICAL_REGIONAL_STOPS.map((endpoint, idx) => {
  const servingBuses = CANONICAL_REGIONAL_BUSES.filter(
    (b) => b.origin === endpoint.name || b.destination === endpoint.name
  );

  return {
    id: endpoint.id,
    name: endpoint.name,
    code: `END-${String(idx + 1).padStart(3, '0')}`,
    area: endpoint.area,
    zone: endpoint.region,
    hasKiosk: true,
    shelterType: 'Regional Transit Terminal / Stand',
    type: 'SERVICE_ENDPOINT',
    incomingBuses: servingBuses.map((b) => ({
      busNumber: `${b.busType} ${b.busNumber}`,
      route: b.routeCode,
      destination: b.destination === endpoint.name ? 'Terminal Arrival' : b.destination,
      eta: 'Scheduled',
      occupancy: 50,
      operator: b.busType,
    })),
    coordinates: { x: 30 + ((idx * 17) % 50), y: 25 + ((idx * 13) % 50) },
    dataSource: 'Regional Transit Dataset (Endpoints)',
  };
});

export default MOCK_PASSENGER_STOPS;
