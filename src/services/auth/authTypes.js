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
    title: 'Passenger',
    subtitle: 'Passenger Portal',
    description: 'Passenger Portal',
  },
  driver: {
    name: 'Driver',
    code: 'DRIVER',
    badgeVariant: 'accent',
    defaultRoute: '/driver/dashboard',
    title: 'Driver',
    subtitle: 'Driver Operations',
    description: 'Driver Operations',
  },
  admin: {
    name: 'Transport Admin',
    code: 'TRANSPORT_ADMIN',
    badgeVariant: 'primary',
    defaultRoute: '/admin/dashboard',
    title: 'Chief Dispatch Officer',
    subtitle: 'Fleet & Transit Operations',
    description: 'Fleet & Transit Operations',
  },
  systemAdmin: {
    name: 'System Operations',
    code: 'SYSTEM_ADMIN',
    badgeVariant: 'warning',
    defaultRoute: '/soc',
    title: 'System Operations',
    subtitle: 'SOC & Infrastructure',
    description: 'SOC & Infrastructure',
  },
  // Alias mapping for 'soc' -> systemAdmin
  soc: {
    name: 'System Operations',
    code: 'SYSTEM_ADMIN',
    badgeVariant: 'warning',
    defaultRoute: '/soc',
    title: 'System Operations',
    subtitle: 'SOC & Infrastructure',
    description: 'SOC & Infrastructure',
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
