/**
 * SmartTransit OS — Isolated Passenger Mock Favorites
 */

export const INITIAL_PASSENGER_FAVORITES = {
  routes: [
    {
      id: 'RT-108',
      name: 'Home → Metro Interchange',
      routeCode: 'RT-108',
      busNumber: 'Bus 245',
      origin: 'Borivali Central Hub',
      destination: 'Andheri West Exchange',
      eta: '3 min',
      frequency: 'Every 8 mins',
      occupancy: 78,
      status: 'ON TIME',
    },
    {
      id: 'RT-302',
      name: 'Workplace → Tech Park Feeder',
      routeCode: 'RT-302',
      busNumber: 'Bus 118',
      origin: 'City Center Hub',
      destination: 'Tech Park Station',
      eta: '12 min',
      frequency: 'Every 6 mins',
      occupancy: 58,
      status: 'ON TIME',
    },
  ],
  stops: [
    {
      id: 'BST-001',
      name: 'Borivali Central Hub',
      code: 'BST-001',
      zone: 'North Transit Hub',
      incomingNextEta: '3 min (Bus 245)',
    },
    {
      id: 'BST-104',
      name: 'Western Highway Exchange',
      code: 'BST-104',
      zone: 'Central Expressway',
      incomingNextEta: '6 min (Bus 245)',
    },
  ],
};
