/**
 * SmartTransit OS System Roles
 */
export const USER_ROLES = {
  PASSENGER: 'PASSENGER',
  DRIVER: 'DRIVER',
  TRANSPORT_ADMIN: 'TRANSPORT_ADMIN',
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
  BUS_STOP_DISPLAY: 'BUS_STOP_DISPLAY',
};

/**
 * Bus & Fleet Statuses
 */
export const FLEET_STATUS = {
  IN_TRANSIT: 'IN_TRANSIT',
  IDLE: 'IDLE',
  BOARDING: 'BOARDING',
  MAINTENANCE: 'MAINTENANCE',
  OUT_OF_SERVICE: 'OUT_OF_SERVICE',
  EMERGENCY_SOS: 'EMERGENCY_SOS',
};

/**
 * Bus Occupancy Levels
 */
export const OCCUPANCY_LEVELS = {
  LOW: 'LOW',         // < 40%
  MODERATE: 'MODERATE', // 40% - 75%
  HIGH: 'HIGH',       // 75% - 90%
  FULL: 'FULL',       // > 90%
};

/**
 * System Stage Milestones
 */
export const SYSTEM_STAGES = [
  { id: 'ST-00', name: 'Project Initialization', status: 'COMPLETE' },
  { id: 'ST-01', name: 'Design System & Component Library', status: 'PENDING' },
  { id: 'ST-02', name: 'Application Shell & Navigation Framework', status: 'PENDING' },
  { id: 'ST-10', name: 'Public Landing Website', status: 'PENDING' },
  { id: 'ST-20', name: 'Authentication & Role-Based Access Control', status: 'PENDING' },
  { id: 'ST-30', name: 'Passenger Portal & Live Tracking', status: 'PENDING' },
  { id: 'ST-40', name: 'Driver Cockpit & Telemetry Stream', status: 'PENDING' },
  { id: 'ST-50', name: 'Transport Admin Dispatch & Fleet Manager', status: 'PENDING' },
  { id: 'ST-60', name: 'Digital Bus Stop Indicator Displays', status: 'PENDING' },
  { id: 'ST-70', name: 'System Operations Center (SOC) & Health', status: 'PENDING' },
  { id: 'ST-80', name: 'AI Intelligence & Dispatch Optimization', status: 'PENDING' },
  { id: 'ST-90', name: 'Real-Time Telemetry Simulation Engine', status: 'PENDING' },
];
