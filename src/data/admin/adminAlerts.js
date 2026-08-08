/**
 * SmartTransit OS — Isolated Admin Transit Alerts Dataset
 */

export const MOCK_ADMIN_ALERTS = [
  {
    id: 'alt-adm-001',
    title: 'Highway Lane Closure on Western Expressway',
    message: 'Road maintenance near Goregaon Flyover causing 8–12 min delays on RT-108 and RT-204 services.',
    severity: 'warning',
    type: 'DISRUPTION',
    affectedRoute: 'RT-108',
    affectedStop: 'Goregaon IT Park Hub',
    status: 'ACTIVE', // DRAFT, SCHEDULED, ACTIVE, RESOLVED
    timestamp: '10 mins ago',
    publisher: 'Operations Dispatcher #02',
  },
  {
    id: 'alt-adm-002',
    title: 'Monsoon High Tide Advisory',
    message: 'Coastal arterial services operating on monsoon schedule. Double-decker buses deployed on high-capacity lines.',
    severity: 'info',
    type: 'WEATHER',
    affectedRoute: 'RT-108',
    affectedStop: 'All Coastal Stops',
    status: 'ACTIVE',
    timestamp: '45 mins ago',
    publisher: 'Chief Dispatcher',
  },
  {
    id: 'alt-adm-003',
    title: 'Extra Fleet Deployed on RT-302 Tech Corridor',
    message: '4 additional electric buses injected during evening peak hours (05:00 PM – 08:30 PM).',
    severity: 'success',
    type: 'FREQUENCY',
    affectedRoute: 'RT-302',
    affectedStop: 'Tech Park Station',
    status: 'ACTIVE',
    timestamp: '2 hours ago',
    publisher: 'Fleet Controller',
  },
  {
    id: 'alt-adm-004',
    title: 'Draft: Magathane Kiosk Maintenance Notice',
    message: 'Scheduled digital kiosk firmware update on Station BST-048.',
    severity: 'info',
    type: 'MAINTENANCE',
    affectedRoute: 'RT-108',
    affectedStop: 'Magathane Junction',
    status: 'DRAFT',
    timestamp: '1 hour ago',
    publisher: 'Maintenance Dept',
  },
];
