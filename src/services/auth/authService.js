import { apiClient } from '../api/apiClient.js';
import { mockAuthService, DEMO_USERS } from './mockAuth.js';
import { hasPermission, canAccessPath, ROLE_PERMISSIONS } from './rbacConfig.js';
import { USER_ROLES, ROLE_METADATA, AUTH_ERRORS } from './authTypes.js';

function mapBackendRoleToFrontend(role) {
  if (!role) return USER_ROLES.PASSENGER;
  const upper = role.toUpperCase();
  if (upper === 'SOC' || upper === 'SYSTEM_ADMIN') return USER_ROLES.SYSTEM_ADMIN;
  if (upper === 'ADMIN' || upper === 'TRANSPORT_ADMIN') return USER_ROLES.ADMIN;
  if (upper === 'DRIVER') return USER_ROLES.DRIVER;
  return USER_ROLES.PASSENGER;
}

function mapFrontendRoleToBackend(role) {
  if (!role) return 'PASSENGER';
  const lower = role.toLowerCase();
  if (lower === 'systemadmin' || lower === 'soc') return 'SOC';
  if (lower === 'admin') return 'ADMIN';
  if (lower === 'driver') return 'DRIVER';
  return 'PASSENGER';
}

function formatUserSession(backendUser, token) {
  const feRole = mapBackendRoleToFrontend(backendUser.role);
  const meta = ROLE_METADATA[feRole] || ROLE_METADATA.passenger;

  const user = {
    id: backendUser.id || backendUser._id,
    name: backendUser.name,
    email: backendUser.email,
    role: feRole,
    roleTitle: meta.title || meta.name,
    roleCode: meta.code || 'PASSENGER',
    avatar: backendUser.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'ST',
    assignedUnit: backendUser.driverProfile?.badgeId
      ? `Bus 245 (${backendUser.driverProfile.badgeId})`
      : meta.name,
    department: 'SmartTransit Operations',
    driverProfile: backendUser.driverProfile || {},
    commuterProfile: backendUser.commuterProfile || {},
  };

  const session = {
    token: token || 'jwt_session_token',
    user,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  try {
    localStorage.setItem('smarttransit_session', JSON.stringify(session));
  } catch (e) {
    console.warn('[AuthService] Failed to persist session:', e);
  }

  return session;
}

const isProduction = import.meta.env?.PROD === true || import.meta.env?.MODE === 'production';

export const authService = {
  // Dual-mode Login (Production Enforced)
  async login(credentials) {
    try {
      const data = await apiClient.post('/auth/login', credentials, { skipAuth: true });
      if (data?.accessToken && data?.user) {
        apiClient.setAccessToken(data.accessToken);
        return formatUserSession(data.user, data.accessToken);
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        throw error; // Propagate 401, 403, 400
      }
      if (isProduction) {
        throw new Error('Authentication service is temporarily unavailable. Please verify your connection.');
      }
      console.info('[AuthService] Backend unreachable in DEV mode, using offline demo credentials.');
    }
    return mockAuthService.login(credentials);
  },

  // Dual-mode Demo Login (Production Enforced)
  async demoLogin(roleKey = USER_ROLES.ADMIN) {
    const backendRole = mapFrontendRoleToBackend(roleKey);
    try {
      const data = await apiClient.post('/auth/demo-login', { role: backendRole }, { skipAuth: true });
      if (data?.accessToken && data?.user) {
        apiClient.setAccessToken(data.accessToken);
        return formatUserSession(data.user, data.accessToken);
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        throw error;
      }
      if (isProduction) {
        throw new Error('Demo authentication gateway is currently unavailable.');
      }
      console.info('[AuthService] Backend unreachable in DEV mode, using offline demo login.');
    }
    return mockAuthService.demoLogin(roleKey);
  },

  // Dual-mode Registration (Production Enforced)
  async register(userData) {
    try {
      const data = await apiClient.post('/auth/register', userData, { skipAuth: true });
      if (data?.accessToken && data?.user) {
        apiClient.setAccessToken(data.accessToken);
        return formatUserSession(data.user, data.accessToken);
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        throw error;
      }
      if (isProduction) {
        throw new Error('Registration service is temporarily unavailable. Please try again later.');
      }
      console.info('[AuthService] Backend unreachable in DEV mode, using offline registration fallback.');
    }
    return mockAuthService.register(userData);
  },

  requestOtp: (emailOrPhone) => mockAuthService.requestOtp(emailOrPhone),
  verifyOtp: (otp) => mockAuthService.verifyOtp(otp),
  resetPassword: (payload) => mockAuthService.resetPassword(payload),

  logout() {
    apiClient.clearAccessToken();
    return mockAuthService.logout();
  },

  getSession: () => mockAuthService.getSession(),

  // RBAC checks
  hasPermission,
  canAccessPath,
  getRolePermissions: (role) => ROLE_PERMISSIONS[role] || [],
  getRoleMetadata: (role) => ROLE_METADATA[role] || ROLE_METADATA.passenger,

  // Constants
  ROLES: USER_ROLES,
  ROLE_METADATA,
  AUTH_ERRORS,
};

export default authService;
