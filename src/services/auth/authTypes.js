/**
 * SmartTransit OS — Authentication & RBAC Type Contracts
 */

export const USER_ROLES = {
  PASSENGER: 'passenger',
  DRIVER: 'driver',
  ADMIN: 'admin',
  SYSTEM_ADMIN: 'systemAdmin',
};

export const ROLE_METADATA = {
  passenger: {
    name: 'Passenger',
    code: 'PASSENGER',
    badgeVariant: 'primary',
    defaultRoute: '/passenger/dashboard',
    title: 'Transit Commuter',
    description: 'City public transport commuter with live tracking, ETA countdowns, and journey planner.',
  },
  driver: {
    name: 'Driver / Operator',
    code: 'DRIVER',
    badgeVariant: 'accent',
    defaultRoute: '/driver/dashboard',
    title: 'Senior Bus Pilot',
    description: 'Transit vehicle operator with route waypoints, GPS sharing, passenger counter, and emergency SOS.',
  },
  admin: {
    name: 'Transport Administrator',
    code: 'TRANSPORT_ADMIN',
    badgeVariant: 'primary',
    defaultRoute: '/admin/dashboard',
    title: 'Chief Dispatch Officer',
    description: 'Municipal authority administrator orchestrating active bus fleets, routes, schedules, and alerts.',
  },
  systemAdmin: {
    name: 'System / SOC Admin',
    code: 'SYSTEM_ADMIN',
    badgeVariant: 'warning',
    defaultRoute: '/system/overview',
    title: 'SOC Infrastructure Engineer',
    description: 'IT and infrastructure administrator managing telemetry clusters, API gateways, database health, and security.',
  },
};

export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'The email or password provided is incorrect.',
  USER_NOT_FOUND: 'No account registered with this email or phone number.',
  EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
  INVALID_OTP: 'The 6-digit verification code is invalid or has expired.',
  PASSWORD_TOO_WEAK: 'Password must be at least 8 characters and include numbers and symbols.',
  UNAUTHORIZED: 'You do not have administrative permission to access this area.',
  SESSION_EXPIRED: 'Your session has expired. Please sign in again.',
};
