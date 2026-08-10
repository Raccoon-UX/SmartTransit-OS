/**
 * SmartTransit OS — Multimodal Transit Graph & Landmark Directory
 * Provides source-of-truth coordinates, stop connectivity, and landmark mappings.
 */

export const TRANSIT_LANDMARKS = [
  {
    id: 'lm-borivali-stn',
    name: 'Borivali Railway Station',
    category: 'RAIL_TERMINAL',
    coordinates: { x: 22, y: 28 },
    nearestStops: [
      { stopId: 'BST-001', stopName: 'Borivali Central Hub', walkMeters: 650, walkMinutes: 8 },
      { stopId: 'BST-012', stopName: 'Kandivali Flyover Express', walkMeters: 1400, walkMinutes: 17 },
    ],
  },
  {
    id: 'lm-vashi-sec17',
    name: 'Vashi Sector 17',
    category: 'COMMERCIAL_DISTRICT',
    coordinates: { x: 82, y: 74 },
    nearestStops: [
      { stopId: 'BST-510', stopName: 'Vashi Sector 17', walkMeters: 300, walkMinutes: 4 },
      { stopId: 'BST-550', stopName: 'Navi Mumbai Gateway', walkMeters: 1100, walkMinutes: 14 },
    ],
  },
  {
    id: 'lm-borivali-hub',
    name: 'Borivali Central Hub',
    category: 'BUS_TERMINAL',
    coordinates: { x: 26, y: 32 },
    nearestStops: [
      { stopId: 'BST-001', stopName: 'Borivali Central Hub', walkMeters: 50, walkMinutes: 1 },
    ],
  },
  {
    id: 'lm-andheri-west',
    name: 'Andheri West Exchange',
    category: 'METRO_INTERCHANGE',
    coordinates: { x: 42, y: 56 },
    nearestStops: [
      { stopId: 'BST-208', stopName: 'Andheri West Exchange', walkMeters: 120, walkMinutes: 2 },
    ],
  },
  {
    id: 'lm-metro-interchange',
    name: 'Metro Interchange Terminal',
    category: 'METRO_INTERCHANGE',
    coordinates: { x: 50, y: 44 },
    nearestStops: [
      { stopId: 'BST-090', stopName: 'Metro Interchange', walkMeters: 80, walkMinutes: 1 },
      { stopId: 'BST-104', stopName: 'Western Highway Exchange', walkMeters: 450, walkMinutes: 6 },
    ],
  },
  {
    id: 'lm-airport-t2',
    name: 'Terminal 2 International Airport',
    category: 'AIRPORT',
    coordinates: { x: 58, y: 62 },
    nearestStops: [
      { stopId: 'BST-250', stopName: 'Terminal 2 Arrivals', walkMeters: 150, walkMinutes: 2 },
    ],
  },
  {
    id: 'lm-city-center',
    name: 'City Center Hub',
    category: 'COMMERCIAL_HUB',
    coordinates: { x: 46, y: 48 },
    nearestStops: [
      { stopId: 'BST-030', stopName: 'City Center Hub', walkMeters: 60, walkMinutes: 1 },
    ],
  },
  {
    id: 'lm-tech-park',
    name: 'Tech Park Station',
    category: 'IT_PARK',
    coordinates: { x: 68, y: 78 },
    nearestStops: [
      { stopId: 'BST-110', stopName: 'Tech Park Station', walkMeters: 100, walkMinutes: 1 },
      { stopId: 'BST-075', stopName: 'Silicon Boulevard', walkMeters: 550, walkMinutes: 7 },
    ],
  },
  {
    id: 'lm-thane-stn',
    name: 'Thane Central Station',
    category: 'RAIL_TERMINAL',
    coordinates: { x: 74, y: 36 },
    nearestStops: [
      { stopId: 'BST-400', stopName: 'Thane Central Station', walkMeters: 100, walkMinutes: 1 },
    ],
  },
  {
    id: 'lm-navi-gateway',
    name: 'Navi Mumbai Gateway',
    category: 'MUNICIPAL_BOUNDARY',
    coordinates: { x: 88, y: 84 },
    nearestStops: [
      { stopId: 'BST-550', stopName: 'Navi Mumbai Gateway', walkMeters: 80, walkMinutes: 1 },
    ],
  },
];

/**
 * Transfer Interchanges in the municipal network
 */
export const TRANSFER_HUBS = [
  {
    id: 'hub-magathane',
    name: 'Magathane Junction / Western Highway Exchange',
    coordinates: { x: 38, y: 44 },
    connectingRoutes: ['RT-108', 'RT-415'],
    connectingStops: ['BST-104', 'BST-420'],
    averageTransferMinutes: 5,
    walkingDistanceMeters: 120,
    guidance: 'Alight at Western Highway Exchange. Walk 120m via the skywalk to Platform B.',
  },
  {
    id: 'hub-metro-interchange',
    name: 'Metro Interchange Central Terminal',
    coordinates: { x: 50, y: 44 },
    connectingRoutes: ['RT-108', 'RT-204', 'RT-302'],
    connectingStops: ['BST-090', 'BST-104', 'BST-030'],
    averageTransferMinutes: 6,
    walkingDistanceMeters: 180,
    guidance: 'Transfer at Central Concourse. Follow signs for Route RT-204 / RT-302 feeder bay.',
  },
  {
    id: 'hub-airoli',
    name: 'Airoli Toll Plaza Interchange',
    coordinates: { x: 78, y: 52 },
    connectingRoutes: ['RT-415', 'RT-302'],
    connectingStops: ['BST-480', 'BST-075'],
    averageTransferMinutes: 4,
    walkingDistanceMeters: 90,
    guidance: 'Cross over to Eastern Express transit bay.',
  },
];
