/**
 * SmartTransit OS — Isolated Driver Operational Alerts
 */

export const MOCK_DRIVER_ALERTS = [
  {
    id: 'drv-alt-001',
    type: 'DISRUPTION',
    severity: 'warning',
    title: 'Highway Lane Closure near Goregaon',
    message: 'Road maintenance on Western Expressway right lane. Maintain 30 km/h speed limit. Follow bus-lane detour signs.',
    affectedStop: 'Goregaon IT Park Hub',
    timestamp: '5 mins ago',
    isRead: false,
  },
  {
    id: 'drv-alt-002',
    type: 'DISPATCH',
    severity: 'info',
    title: 'Fleet Controller Instruction (Shift Supervisor)',
    message: 'Hold 90 seconds extra at Dahisar interchange to facilitate incoming suburban rail transfer connections.',
    affectedStop: 'Dahisar Check Naka',
    timestamp: '20 mins ago',
    isRead: false,
  },
  {
    id: 'drv-alt-003',
    type: 'WEATHER',
    severity: 'info',
    title: 'High Tide & Wet Surface Advisory',
    message: 'Wet asphalt advisory active across coastal sectors. Maintain 50m safe trailing distance.',
    affectedStop: 'All Coastal Stops',
    timestamp: '45 mins ago',
    isRead: true,
  },
];
