/**
 * SmartTransit OS — Canonical Regional Transit Dataset
 * 
 * Source of Truth: src/assets/maharashtra_transit_analysis.csv
 * 
 * IMPORTANT:
 * - This dataset is the single canonical source of static regional fleet data.
 * - All 29 records are faithfully sourced from the CSV without invented buses, numbers, or routes.
 * - Origins and Destinations are treated strictly as route/service endpoints (no manufactured intermediate stops).
 * - Realtime operational values (GPS, live ETA, dynamic occupancy) are not in the CSV and are marked as
 *   simulation/demo or data unavailable where required.
 */

export const DATA_SOURCE_METADATA = {
  sourceName: 'Regional Transit Dataset',
  filename: 'maharashtra_transit_analysis.csv',
  totalRecords: 29,
  coverage: 'Maharashtra Metropolitan & Intercity Transit',
  operators: ['BEST', 'MBMT', 'TMT', 'NMMT', 'VVMT', 'KDMT', 'MSRTC'],
  type: 'STATIC_REGIONAL_DATASET',
  realtimeAvailable: false,
};

/**
 * Raw 29 CSV Records faithfully represented
 */
export const RAW_REGIONAL_RECORDS = [
  { area: 'Borivali (East)', busNumber: 'A-297', busType: 'BEST', origin: 'Borivali Station (E)', destination: 'Kokanipada Ext', region: 'Mumbai Suburban' },
  { area: 'Borivali (East)', busNumber: 'A-298', busType: 'BEST', origin: 'Borivali Station (E)', destination: 'Rawalpada', region: 'Mumbai Suburban' },
  { area: 'Borivali (West)', busNumber: '202', busType: 'BEST', origin: 'Borivali Station (W)', destination: 'Mahim Bus Station', region: 'Mumbai City/Suburban' },
  { area: 'Dahisar (East)', busNumber: 'A-462', busType: 'BEST', origin: 'Borivali Station (E)', destination: 'Vaishali Nagar', region: 'Mumbai Suburban' },
  { area: 'Andheri (West)', busNumber: '203', busType: 'BEST', origin: 'Andheri Station (W)', destination: 'Juhu Beach / Dahisar', region: 'Mumbai Suburban' },
  { area: 'Dadar (East)', busNumber: 'C-53', busType: 'BEST', origin: 'Dadar Station (E)', destination: 'Ghatkopar / Mulund', region: 'Mumbai City' },
  { area: 'Colaba', busNumber: '1', busType: 'BEST', origin: 'Electric House (Colaba)', destination: 'Mahim Bus Station', region: 'Mumbai City' },
  { area: 'Mira Road', busNumber: '29', busType: 'MBMT', origin: 'Mira Road Station (E)', destination: 'Thane Station (E)', region: 'Thane / MMR' },
  { area: 'Mira Road', busNumber: '26GP', busType: 'MBMT', origin: 'Mira Road Station (E)', destination: 'Andheri Station (E)', region: 'Mumbai/Thane Border' },
  { area: 'Bhayandar', busNumber: '10', busType: 'MBMT', origin: 'Bhayandar Station (W)', destination: 'Thane Station (E)', region: 'Thane / MMR' },
  { area: 'Bhayandar', busNumber: '1', busType: 'MBMT', origin: 'Bhayandar Station (W)', destination: 'Ghodbunder Road', region: 'Thane / MMR' },
  { area: 'Thane', busNumber: 'AC-65', busType: 'TMT', origin: 'Thane Station (E)', destination: 'Borivali Station (E)', region: 'Thane / Mumbai' },
  { area: 'Thane', busNumber: '55', busType: 'TMT', origin: 'Thane Station (W)', destination: 'Borivali Station (E)', region: 'Thane / Mumbai' },
  { area: 'Thane', busNumber: '2', busType: 'TMT', origin: 'Thane Station (W)', destination: 'Kalwa Naka', region: 'Thane' },
  { area: 'Ghodbunder', busNumber: '121', busType: 'TMT', origin: 'Ghodbunder Road', destination: 'Thane Station (W)', region: 'Thane' },
  { area: 'Kharghar', busNumber: '125AC', busType: 'NMMT', origin: 'Kharghar (Ove Gaon)', destination: 'Borivali Station (E)', region: 'Raigad / Mumbai' },
  { area: 'Vashi', busNumber: '131', busType: 'NMMT', origin: 'Vashi Sector 6', destination: 'Borivali Station (E)', region: 'Thane / Mumbai' },
  { area: 'Panvel', busNumber: '50', busType: 'NMMT', origin: 'Panvel Station', destination: 'Vashi Bus Station', region: 'Raigad / Thane' },
  { area: 'Belapur', busNumber: '100', busType: 'NMMT', origin: 'CBD Belapur', destination: 'Lokmanya Tilak Terminus (LTT)', region: 'Navi Mumbai / Mumbai' },
  { area: 'Vasai', busNumber: '102', busType: 'VVMT', origin: 'Vasai Station (E)', destination: 'Vasai Phata', region: 'Palghar' },
  { area: 'Virar', busNumber: '205', busType: 'VVMT', origin: 'Virar Station (E)', destination: 'Nallasopara (E)', region: 'Palghar' },
  { area: 'Nallasopara', busNumber: '301', busType: 'VVMT', origin: 'Nallasopara Station (W)', destination: 'Bhuigaon Beach', region: 'Palghar' },
  { area: 'Kalyan', busNumber: '11', busType: 'KDMT', origin: 'Kalyan Station (W)', destination: 'Dombivli Station (W)', region: 'Thane / MMR' },
  { area: 'Dombivli', busNumber: '15', busType: 'KDMT', origin: 'Dombivli Station (E)', destination: 'Vashi (Navi Mumbai)', region: 'Thane / Navi Mumbai' },
  { area: 'Mumbai/Pune', busNumber: 'Shivneri', busType: 'MSRTC', origin: 'Dadar (East) / Nancy Colony', destination: 'Pune Station / Swargate', region: 'Intercity Maharashtra' },
  { area: 'Mumbai/Nashik', busNumber: 'Shivshahi', busType: 'MSRTC', origin: 'Borivali (Nancy Colony)', destination: 'Nashik CBS', region: 'Intercity Maharashtra' },
  { area: 'Pune/Kolhapur', busNumber: 'ST Ordinary', busType: 'MSRTC', origin: 'Swargate (Pune)', destination: 'Kolhapur Central Stand', region: 'Western Maharashtra' },
  { area: 'Nagpur/Amravati', busNumber: 'MSRTC E-Bus', busType: 'MSRTC', origin: 'Nagpur Ganeshpeth', destination: 'Amravati Station', region: 'Vidarbha' },
  { area: 'Aurangabad', busNumber: 'ST Semi-Luxury', busType: 'MSRTC', origin: 'Chhatrapati Sambhajinagar', destination: 'Jalna / Nanded', region: 'Marathwada' },
];

/**
 * Normalizes an operator code to friendly display name and branding color
 */
export function getOperatorMeta(busType) {
  switch (busType) {
    case 'BEST':
      return { code: 'BEST', name: 'Brihanmumbai Electric Supply & Transport', color: '#B91C1C', badgeBg: 'bg-red-50 text-red-700 border-red-200' };
    case 'MBMT':
      return { code: 'MBMT', name: 'Mira-Bhayandar Municipal Transport', color: '#0284C7', badgeBg: 'bg-sky-50 text-sky-700 border-sky-200' };
    case 'TMT':
      return { code: 'TMT', name: 'Thane Municipal Transport', color: '#16A34A', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    case 'NMMT':
      return { code: 'NMMT', name: 'Navi Mumbai Municipal Transport', color: '#9333EA', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200' };
    case 'VVMT':
      return { code: 'VVMT', name: 'Vasai-Virar Municipal Transport', color: '#D97706', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200' };
    case 'KDMT':
      return { code: 'KDMT', name: 'Kalyan-Dombivli Municipal Transport', color: '#0D9488', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200' };
    case 'MSRTC':
      return { code: 'MSRTC', name: 'Maharashtra State Road Transport Corporation', color: '#EA580C', badgeBg: 'bg-orange-50 text-orange-700 border-orange-200' };
    default:
      return { code: busType, name: `${busType} Transit`, color: '#64748B', badgeBg: 'bg-slate-50 text-slate-700 border-slate-200' };
  }
}

/**
 * Canonical normalized bus objects with unique identifiers and endpoints
 */
export const CANONICAL_REGIONAL_BUSES = RAW_REGIONAL_RECORDS.map((rec, index) => {
  const operatorMeta = getOperatorMeta(rec.busType);
  const id = `reg-bus-${index + 1}`;
  const routeCode = `${rec.busType}-${rec.busNumber.replace(/\s+/g, '')}`;
  const serviceName = `${rec.origin} ➔ ${rec.destination}`;

  return {
    id,
    busNumber: rec.busNumber,
    busType: rec.busType,
    operator: rec.busType,
    operatorName: operatorMeta.name,
    operatorColor: operatorMeta.color,
    operatorBadgeBg: operatorMeta.badgeBg,
    area: rec.area,
    origin: rec.origin,
    destination: rec.destination,
    region: rec.region,
    routeCode,
    routeName: `${rec.busType} ${rec.busNumber} (${serviceName})`,
    serviceName,
    endpoints: [
      { name: rec.origin, type: 'ORIGIN' },
      { name: rec.destination, type: 'DESTINATION' },
    ],
    // Provenance and Data Status
    dataSource: DATA_SOURCE_METADATA.sourceName,
    isStaticRegional: true,
    isLiveFeed: false,
    dataStatus: 'Regional Transit Dataset',
    // Fallback display properties for existing UI components
    status: 'ACTIVE',
    operationalStatus: 'STATIC SCHEDULED',
    occupancyStatus: 'SCHEDULED',
    occupancyPercent: 50,
    speed: 'Schedule Pace',
    lastPing: 'Static Regional Record',
  };
});

/**
 * Derived Canonical Route Services (Endpoint pairs)
 */
export const CANONICAL_REGIONAL_ROUTES = CANONICAL_REGIONAL_BUSES.map((bus) => {
  return {
    id: bus.routeCode,
    routeCode: bus.routeCode,
    busNumber: bus.busNumber,
    operator: bus.busType,
    operatorName: bus.operatorName,
    routeName: `${bus.busType} ${bus.busNumber}: ${bus.origin} ➔ ${bus.destination}`,
    origin: bus.origin,
    destination: bus.destination,
    area: bus.area,
    region: bus.region,
    color: bus.operatorColor,
    stopsCount: 2, // Sourced strictly as origin and destination endpoints
    endpoints: bus.endpoints,
    stops: [
      { id: `stop-orig-${bus.id}`, name: bus.origin, code: 'ORIGIN', isOrigin: true },
      { id: `stop-dest-${bus.id}`, name: bus.destination, code: 'DESTINATION', isDestination: true },
    ],
    assignedBus: bus.busNumber,
    dataSource: DATA_SOURCE_METADATA.sourceName,
    intermediateStopsAvailable: false,
  };
});

/**
 * Distinct Endpoint Locations (Origins & Destinations extracted from the dataset)
 */
const endpointMap = new Map();
RAW_REGIONAL_RECORDS.forEach((rec) => {
  if (!endpointMap.has(rec.origin)) {
    endpointMap.set(rec.origin, {
      id: `pt-${endpointMap.size + 1}`,
      name: rec.origin,
      area: rec.area,
      region: rec.region,
      type: 'TERMINAL_ENDPOINT',
      servicesCount: 0,
      busesServing: [],
    });
  }
  endpointMap.get(rec.origin).servicesCount += 1;
  endpointMap.get(rec.origin).busesServing.push(`${rec.busType} ${rec.busNumber}`);

  if (!endpointMap.has(rec.destination)) {
    endpointMap.set(rec.destination, {
      id: `pt-${endpointMap.size + 1}`,
      name: rec.destination,
      area: rec.area,
      region: rec.region,
      type: 'TERMINAL_ENDPOINT',
      servicesCount: 0,
      busesServing: [],
    });
  }
  endpointMap.get(rec.destination).servicesCount += 1;
  endpointMap.get(rec.destination).busesServing.push(`${rec.busType} ${rec.busNumber}`);
});

export const CANONICAL_REGIONAL_STOPS = Array.from(endpointMap.values());

/**
 * Dynamic Fleet Statistics calculated directly from Canonical Data
 */
export function getRegionalFleetStats() {
  const totalBuses = CANONICAL_REGIONAL_BUSES.length;

  const operatorCounts = {};
  const regionCounts = {};

  CANONICAL_REGIONAL_BUSES.forEach((b) => {
    operatorCounts[b.busType] = (operatorCounts[b.busType] || 0) + 1;
    regionCounts[b.region] = (regionCounts[b.region] || 0) + 1;
  });

  return {
    totalBuses,
    totalRoutes: CANONICAL_REGIONAL_ROUTES.length,
    totalEndpoints: CANONICAL_REGIONAL_STOPS.length,
    operatorCounts,
    regionCounts,
    operatorsList: Object.keys(operatorCounts),
    regionsList: Object.keys(regionCounts),
    dataSource: DATA_SOURCE_METADATA,
  };
}

/**
 * Selector helpers
 */
export const regionalTransitData = {
  getAllBuses: () => [...CANONICAL_REGIONAL_BUSES],
  getBusById: (id) => {
    if (!id) return CANONICAL_REGIONAL_BUSES[0];
    const q = id.toLowerCase().trim();
    return (
      CANONICAL_REGIONAL_BUSES.find(
        (b) =>
          b.id.toLowerCase() === q ||
          b.busNumber.toLowerCase() === q ||
          b.routeCode.toLowerCase() === q
      ) || CANONICAL_REGIONAL_BUSES[0]
    );
  },
  getBusesByOperator: (operator) => {
    if (!operator || operator === 'ALL') return [...CANONICAL_REGIONAL_BUSES];
    return CANONICAL_REGIONAL_BUSES.filter((b) => b.busType === operator);
  },
  getBusesByRegion: (region) => {
    if (!region || region === 'ALL') return [...CANONICAL_REGIONAL_BUSES];
    return CANONICAL_REGIONAL_BUSES.filter((b) => b.region === region);
  },
  searchBuses: (query = '') => {
    const q = query.toLowerCase().trim();
    if (!q) return [...CANONICAL_REGIONAL_BUSES];
    return CANONICAL_REGIONAL_BUSES.filter(
      (b) =>
        b.busNumber.toLowerCase().includes(q) ||
        b.busType.toLowerCase().includes(q) ||
        b.origin.toLowerCase().includes(q) ||
        b.destination.toLowerCase().includes(q) ||
        b.area.toLowerCase().includes(q) ||
        b.region.toLowerCase().includes(q)
    );
  },
  getAllRoutes: () => [...CANONICAL_REGIONAL_ROUTES],
  getRouteById: (id) => {
    if (!id) return CANONICAL_REGIONAL_ROUTES[0];
    const q = id.toLowerCase().trim();
    return (
      CANONICAL_REGIONAL_ROUTES.find(
        (r) =>
          r.id.toLowerCase() === q ||
          r.routeCode.toLowerCase() === q ||
          r.busNumber.toLowerCase() === q
      ) || CANONICAL_REGIONAL_ROUTES[0]
    );
  },
  getAllStops: () => [...CANONICAL_REGIONAL_STOPS],
  getStats: getRegionalFleetStats,
  metadata: DATA_SOURCE_METADATA,
};

export default regionalTransitData;
