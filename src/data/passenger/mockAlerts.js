/**
 * SmartTransit OS — Isolated Passenger Mock Alerts Data
 */

export const MOCK_PASSENGER_ALERTS = [
  {
    id: 'alt-001',
    type: 'DISRUPTION',
    severity: 'warning',
    title: 'Highway Lane Closure on Western Expressway',
    message: 'Road maintenance near Goregaon Flyover causing 8–12 min delays on RT-108 and RT-204 services.',
    affectedRoutes: ['RT-108', 'RT-204'],
    timestamp: '10 mins ago',
    isRead: false,
  },
  {
    id: 'alt-002',
    type: 'WEATHER',
    severity: 'info',
    title: 'Monsoon High Tide Advisory',
    message: 'Coastal arterial services operating on monsoon schedule. Double-decker buses deployed on high-capacity lines.',
    affectedRoutes: ['RT-108', 'RT-302'],
    timestamp: '45 mins ago',
    isRead: false,
  },
  {
    id: 'alt-003',
    type: 'FREQUENCY',
    severity: 'success',
    title: 'Extra Fleet Deployed on RT-302 Tech Corridor',
    message: '4 additional electric buses injected during evening peak hours (05:00 PM – 08:30 PM).',
    affectedRoutes: ['RT-302'],
    timestamp: '2 hours ago',
    isRead: true,
  },
];
