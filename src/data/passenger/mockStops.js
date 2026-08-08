/**
 * SmartTransit OS — Isolated Passenger Mock Stops Data
 */

export const MOCK_PASSENGER_STOPS = [
  {
    id: 'BST-001',
    name: 'Borivali Central Hub',
    code: 'BST-001',
    zone: 'Zone North-1',
    hasKiosk: true,
    shelterType: 'Smart Solar LED Kiosk',
    incomingBuses: [
      { busNumber: 'Bus 245', route: 'RT-108', destination: 'Andheri West', eta: '3 min', occupancy: 78 },
      { busNumber: 'Bus 204', route: 'RT-108', destination: 'Andheri West', eta: '11 min', occupancy: 35 },
    ],
    coordinates: { x: 20, y: 35 },
  },
  {
    id: 'BST-104',
    name: 'Western Highway Exchange',
    code: 'BST-104',
    zone: 'Zone Central-4',
    hasKiosk: true,
    shelterType: 'Electronic Display Station',
    incomingBuses: [
      { busNumber: 'Bus 245', route: 'RT-108', destination: 'Andheri West', eta: '6 min', occupancy: 78 },
      { busNumber: 'Bus 312', route: 'RT-204', destination: 'Airport T2', eta: '14 min', occupancy: 42 },
    ],
    coordinates: { x: 45, y: 48 },
  },
  {
    id: 'BST-208',
    name: 'Aviation Gate South',
    code: 'BST-208',
    zone: 'Zone Airport East',
    hasKiosk: true,
    shelterType: 'Aviation Feeder Kiosk',
    incomingBuses: [
      { busNumber: 'Bus 312', route: 'RT-204', destination: 'Terminal 2 Airport', eta: '8 min', occupancy: 42 },
    ],
    coordinates: { x: 75, y: 30 },
  },
  {
    id: 'BST-042',
    name: 'Silicon Boulevard',
    code: 'BST-042',
    zone: 'Zone Tech Sector',
    hasKiosk: false,
    shelterType: 'Standard Transit Shelter',
    incomingBuses: [
      { busNumber: 'Bus 118', route: 'RT-302', destination: 'Tech Park Station', eta: '12 min', occupancy: 58 },
    ],
    coordinates: { x: 58, y: 80 },
  },
  {
    id: 'BST-510',
    name: 'Vashi Sector 17',
    code: 'BST-510',
    zone: 'Zone Navi Mumbai',
    hasKiosk: true,
    shelterType: 'Inter-City Terminal Board',
    incomingBuses: [
      { busNumber: 'Bus 504', route: 'RT-415', destination: 'Navi Mumbai Gateway', eta: '16 min', occupancy: 92 },
    ],
    coordinates: { x: 80, y: 55 },
  },
];
