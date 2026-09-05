/**
 * SmartTransit OS — Admin Regional Terminals & Endpoints
 * Sourced canonically from the regional transit dataset.
 */

import { CANONICAL_REGIONAL_STOPS, CANONICAL_REGIONAL_BUSES } from '../regionalTransitData.js';

export const MOCK_ADMIN_STOPS = CANONICAL_REGIONAL_STOPS.map((endpoint, idx) => {
  const servingBuses = CANONICAL_REGIONAL_BUSES.filter(
    (b) => b.origin === endpoint.name || b.destination === endpoint.name
  );

  return {
    id: endpoint.id,
    name: endpoint.name,
    code: `END-${String(idx + 1).padStart(3, '0')}`,
    area: endpoint.area,
    zone: endpoint.region,
    routesCount: servingBuses.length,
    incomingBusesCount: servingBuses.length,
    passengerVolume: 'Regional Service Endpoint',
    kioskStatus: 'ONLINE (Terminal Active)',
    accessibility: 'Standard Platform Access',
    status: 'ACTIVE',
    dataSource: 'Regional Transit Dataset (Endpoints)',
  };
});

export default MOCK_ADMIN_STOPS;
