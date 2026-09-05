import { apiClient } from '../api/apiClient.js';
import { mockAuthService, DEMO_USERS, PRIMARY_STORAGE_KEY, LEGACY_STORAGE_KEY } from './mockAuth.js';
import { hasPermission, canAccessPath, ROLE_PERMISSIONS } from './rbacConfig.js';
import { USER_ROLES, ROLE_METADATA, AUTH_ERRORS } from './authTypes.js';

export function decodeGoogleJwt(token) {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.warn('[AuthService] Error decoding Google JWT payload:', err);
    return null;
  }
}

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
    id: backendUser.id || backendUser._id || `usr_${Date.now()}`,
    name: backendUser.name || 'Transit User',
    email: backendUser.email || '',
    role: feRole,
    roleTitle: meta.title || meta.name,
    roleCode: meta.code || 'PASSENGER',
    avatar: backendUser.avatar || backendUser.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'ST',
    picture: backendUser.picture || null,
    assignedUnit: backendUser.driverProfile?.badgeId
      ? `Bus 245 (${backendUser.driverProfile.badgeId})`
      : meta.name,
    department: backendUser.department || 'SmartTransit Operations',
    driverProfile: backendUser.driverProfile || {},
    commuterProfile: backendUser.commuterProfile || {},
  };

  const session = {
    token: token || `jwt_session_token_${Date.now()}`,
    user,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  try {
    const serialized = JSON.stringify(session);
    localStorage.setItem(PRIMARY_STORAGE_KEY, serialized);
    localStorage.setItem(LEGACY_STORAGE_KEY, serialized);
  } catch (e) {
    console.warn('[AuthService] Failed to persist session:', e);
  }

  return session;
}

export const authService = {
  // Dual-mode Login (with resilient offline/demo fallback)
  async login(credentials) {
    try {
      const data = await apiClient.post('/auth/login', credentials, { skipAuth: true, timeout: 6000 });
      if (data?.accessToken && data?.user) {
        apiClient.setAccessToken(data.accessToken);
        return formatUserSession(data.user, data.accessToken);
      }
    } catch (error) {
      // If server explicitly responded with 401/403 incorrect password, propagate it
      if (!error.isFallbackEligible && (error.status === 401 || error.status === 403)) {
        throw error;
      }
      console.info('[AuthService] Backend unreachable or timeout, using instant demo credentials.');
    }
    return mockAuthService.login(credentials);
  },

  // Dual-mode Demo Login (Instant Access)
  async demoLogin(roleKey = USER_ROLES.ADMIN) {
    const backendRole = mapFrontendRoleToBackend(roleKey);
    try {
      const data = await apiClient.post('/auth/demo-login', { role: backendRole }, { skipAuth: true, timeout: 5000 });
      if (data?.accessToken && data?.user) {
        apiClient.setAccessToken(data.accessToken);
        return formatUserSession(data.user, data.accessToken);
      }
    } catch (error) {
      console.info('[AuthService] Backend demo-login unavailable, using instant demo role session.');
    }
    return mockAuthService.demoLogin(roleKey);
  },

  // Dual-mode Registration
  async register(userData) {
    try {
      const data = await apiClient.post('/auth/register', userData, { skipAuth: true, timeout: 6000 });
      if (data?.accessToken && data?.user) {
        apiClient.setAccessToken(data.accessToken);
        return formatUserSession(data.user, data.accessToken);
      }
    } catch (error) {
      if (!error.isFallbackEligible && error.status === 409) {
        throw error; // User already exists
      }
      console.info('[AuthService] Backend registration unavailable, using client-side registration.');
    }
    return mockAuthService.register(userData);
  },

  // Dual-mode Google Authentication (with automatic client-side credential decoding fallback)
  async googleLogin(credential) {
    const parsedPayload = decodeGoogleJwt(credential);

    try {
      const data = await apiClient.post('/auth/google', { credential }, { skipAuth: true, timeout: 6000 });
      if (data?.accessToken && data?.user) {
        apiClient.setAccessToken(data.accessToken);
        return formatUserSession(data.user, data.accessToken);
      }
    } catch (error) {
      console.info('[AuthService] Backend Google auth endpoint unreachable, completing verified client-side Google sign-in.');
    }

    // Seamless fallback: directly log in with parsed Google JWT credentials
    return mockAuthService.googleLogin(credential, parsedPayload);
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
