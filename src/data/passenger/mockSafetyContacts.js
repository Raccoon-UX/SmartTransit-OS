/**
 * SmartTransit OS — Passenger Safety & Trusted Contacts Mock Data
 */

export const INITIAL_TRUSTED_CONTACTS = [
  {
    id: 'tc-01',
    passengerId: 'usr-pass-001',
    name: 'Priya Sharma',
    relationship: 'Family / Spouse',
    phone: '+91 98201 12345',
    email: 'priya.sharma@example.com',
    notifyOnSos: true,
  },
  {
    id: 'tc-02',
    passengerId: 'usr-pass-001',
    name: 'Rohan Verma',
    relationship: 'Emergency Contact',
    phone: '+91 98210 67890',
    email: 'rohan.v@example.com',
    notifyOnSos: true,
  },
];

export const MUNICIPAL_SAFETY_HELPLINES = [
  {
    name: 'State Transport Operations Command (24/7)',
    number: '1800-22-1250',
    description: 'Central transit command desk for fleet emergencies, breakdown alerts & incident reporting.',
    category: 'Operations',
  },
  {
    name: 'Women Passenger Safety Helpline',
    number: '1091',
    description: 'Dedicated toll-free helpline for women commuters in transit distress.',
    category: 'Safety',
  },
  {
    name: 'National Emergency Service (Police / Medical)',
    number: '112',
    description: 'Unified national emergency helpline number across India.',
    category: 'Emergency',
  },
  {
    name: 'Depot 04 — Andheri Control Desk',
    number: '022-2683-4901',
    description: 'Local divisional control room for Western Coastal & Express routes.',
    category: 'Local Depot',
  },
];

export const PASSENGER_SAFETY_GUIDELINES = [
  {
    title: 'Onboard CCTV & Surveillance',
    description: 'All municipal buses and depot boarding bays are equipped with high-definition CCTV security cameras with real-time video streaming to the central SOC command.',
  },
  {
    title: 'Live Journey Sharing with Trusted Contacts',
    description: 'Use the "Share Journey" button in your active commute card to broadcast your real-time vehicle ID, route, and stop progression to family or trusted contacts.',
  },
  {
    title: 'Emergency SOS Protocol',
    description: 'If you feel unsafe or witness a critical incident, trigger Emergency SOS from the dashboard. Your location, vehicle, and route are immediately logged to the transit operations workflow.',
  },
  {
    title: 'Conductor & Driver Assistance',
    description: 'Every municipal vehicle has a trained Driver and Bus Conductor equipped with an emergency panic button connected to the vehicle telematics unit.',
  },
];
