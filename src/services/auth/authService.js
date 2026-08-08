/**
 * SmartTransit OS — Centralized Authentication & RBAC Service Facade
 */

import { mockAuthService } from './mockAuth.js';
import { hasPermission, canAccessPath, ROLE_PERMISSIONS } from './rbacConfig.js';
import { USER_ROLES, ROLE_METADATA, AUTH_ERRORS } from './authTypes.js';

export const authService = {
  // Methods
  login: (credentials) => mockAuthService.login(credentials),
  demoLogin: (role) => mockAuthService.demoLogin(role),
  register: (userData) => mockAuthService.register(userData),
  requestOtp: (emailOrPhone) => mockAuthService.requestOtp(emailOrPhone),
  verifyOtp: (otp) => mockAuthService.verifyOtp(otp),
  resetPassword: (payload) => mockAuthService.resetPassword(payload),
  logout: () => mockAuthService.logout(),
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
