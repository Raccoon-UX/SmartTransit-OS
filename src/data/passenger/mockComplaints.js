/**
 * SmartTransit OS — Passenger Mock Complaints & Issue Tracking Data
 */

export const INITIAL_PASSENGER_COMPLAINTS = [
  {
    id: 'ST-1024',
    category: 'Driver Behaviour',
    categoryCode: 'DRIVER_BEHAVIOUR',
    subject: 'Rash driving and skipped Western Highway bus stop',
    description: 'Bus 245 skipped the designated Dahisar Check Naka boarding stop without halting completely, and driver was speeding past congested zones.',
    vehicle: 'Bus 245',
    route: 'RT-108 (Metro Coastal Express)',
    journeyId: 'JRN-8921',
    passengerId: 'usr-pass-001',
    passengerName: 'Aarav Sharma',
    status: 'INVESTIGATING',
    severity: 'MEDIUM',
    createdAt: '2026-08-22T09:45:00.000Z',
    updatedAt: '2026-08-22T14:30:00.000Z',
    timeline: [
      {
        status: 'SUBMITTED',
        timestamp: '2026-08-22T09:45:00.000Z',
        message: 'Complaint submitted by passenger via Mobile Portal.',
      },
      {
        status: 'UNDER_REVIEW',
        timestamp: '2026-08-22T11:15:00.000Z',
        message: 'Case assigned to Depot Operations Manager (Depot 04).',
      },
      {
        status: 'INVESTIGATING',
        timestamp: '2026-08-22T14:30:00.000Z',
        message: 'Reviewing onboard telematics speed log and CCTV footage.',
      },
    ],
    resolutionNote: null,
  },
  {
    id: 'ST-1018',
    category: 'Bus Delay / Missed Service',
    categoryCode: 'DELAY_MISSED',
    subject: '25-minute unscheduled headway delay during morning peak',
    description: 'Scheduled 08:30 AM departure on RT-204 from Borivali Central was delayed by over 25 minutes without live notification on the ETA board.',
    vehicle: 'Bus 112',
    route: 'RT-204 (Suburban Orbital Line)',
    journeyId: 'JRN-8704',
    passengerId: 'usr-pass-001',
    passengerName: 'Aarav Sharma',
    status: 'RESOLVED',
    severity: 'LOW',
    createdAt: '2026-08-20T08:55:00.000Z',
    updatedAt: '2026-08-20T17:00:00.000Z',
    timeline: [
      {
        status: 'SUBMITTED',
        timestamp: '2026-08-20T08:55:00.000Z',
        message: 'Complaint logged into Transit Dispatch Desk.',
      },
      {
        status: 'UNDER_REVIEW',
        timestamp: '2026-08-20T10:00:00.000Z',
        message: 'Cross-referenced with central telemetry log.',
      },
      {
        status: 'RESOLVED',
        timestamp: '2026-08-20T17:00:00.000Z',
        message: 'Delay caused by unexpected waterlogging near Kandivali junction. Additional reserve bus injected into line headway.',
      },
    ],
    resolutionNote: 'Traffic disruption verified. Backup electric fleet deployed to normalize headway.',
  },
  {
    id: 'ST-1009',
    category: 'Cleanliness / Maintenance',
    categoryCode: 'CLEANLINESS_MAINTENANCE',
    subject: 'Air conditioning malfunction in rear passenger section',
    description: 'HVAC cooling unit in coach rear was blowing hot air during midday run on RT-302.',
    vehicle: 'Bus 308',
    route: 'RT-302 (Thane Tech Corridor)',
    journeyId: null,
    passengerId: 'usr-pass-001',
    passengerName: 'Aarav Sharma',
    status: 'RESOLVED',
    severity: 'LOW',
    createdAt: '2026-08-18T13:20:00.000Z',
    updatedAt: '2026-08-18T19:40:00.000Z',
    timeline: [
      {
        status: 'SUBMITTED',
        timestamp: '2026-08-18T13:20:00.000Z',
        message: 'Complaint registered by commuter.',
      },
      {
        status: 'UNDER_REVIEW',
        timestamp: '2026-08-18T14:10:00.000Z',
        message: 'Sent to Maintenance Workshop Depot 02.',
      },
      {
        status: 'RESOLVED',
        timestamp: '2026-08-18T19:40:00.000Z',
        message: 'Refrigerant sensor replaced during night shift overhaul.',
      },
    ],
    resolutionNote: 'Vehicle serviced at Depot 02 maintenance bay.',
  },
];

export const COMPLAINT_CATEGORIES = [
  'Bus / Vehicle Issue',
  'Driver Behaviour',
  'Fare / Payment Issue',
  'Bus Delay / Missed Service',
  'Route / Stop Issue',
  'Safety Issue',
  'Cleanliness / Maintenance',
  'App / Technical Issue',
  'Other',
];
