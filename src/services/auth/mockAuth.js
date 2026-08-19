/**
 * SmartTransit OS — Isolated Mock Authentication Service
 * 
 * IMPORTANT: This is an isolated demo authentication provider for prototype testing.
 * Passwords and tokens are mock structures that can be swapped for production OAuth/JWT APIs.
 */

import { USER_ROLES, ROLE_METADATA } from './authTypes.js';

export const DEMO_USERS = [
  {
    id: 'usr_pass_001',
    name: 'Aarav Sharma',
    email: 'passenger@smarttransit.city',
    phone: '+91 98201 44820',
    role: USER_ROLES.PASSENGER,
    roleTitle: 'Daily Metro Commuter',
    roleCode: 'PASSENGER',
    avatar: 'AS',
    assignedUnit: null,
    department: 'Urban Transit Citizens',
  },
  {
    id: 'usr_drv_042',
    name: 'Vikram Jadhav',
    email: 'driver@smarttransit.city',
    phone: '+91 97654 32100',
    role: USER_ROLES.DRIVER,
    roleTitle: 'Senior Transit Pilot',
    roleCode: 'DRIVER',
    avatar: 'VJ',
    assignedUnit: 'Bus 245 (NY-TR-8042)',
    department: 'Western Express Fleet Depot',
  },
  {
    id: 'usr_adm_108',
    name: 'Priya Nambiar',
    email: 'admin@smarttransit.city',
    phone: '+91 98888 12345',
    role: USER_ROLES.ADMIN,
    roleTitle: 'Chief Dispatch Officer',
    roleCode: 'TRANSPORT_ADMIN',
    avatar: 'PN',
    assignedUnit: 'Metropolitan Fleet Command',
    department: 'Municipal Transport Authority',
  },
  {
    id: 'usr_soc_999',
    name: 'Devraj Sen',
    email: 'soc.admin@smarttransit.city',
    phone: '+91 99999 88888',
    role: USER_ROLES.SYSTEM_ADMIN,
    roleTitle: 'SOC Infrastructure Architect',
    roleCode: 'SYSTEM_ADMIN',
    avatar: 'DS',
    assignedUnit: 'Core Telemetry Cluster',
    department: 'System Operations Center (SOC)',
  },
];

const STORAGE_KEY = 'smarttransit_os_session_v1';
const OTP_STORAGE_KEY = 'smarttransit_pending_otp';

export const mockAuthService = {
  /**
   * Restores session from localStorage if present
   */
  getSession() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      // Validate session structure
      if (parsed && parsed.user && parsed.token) {
        return parsed;
      }
      return null;
    } catch (e) {
      console.warn('Failed to parse session from storage', e);
      return null;
    }
  },

  /**
   * Authenticates with email/phone and password
   */
  async login({ emailOrPhone, password }) {
    await new Promise((res) => setTimeout(res, 600)); // Realistic network latency simulation

    const identifier = (emailOrPhone || '').trim().toLowerCase();
    
    // Check demo accounts first
    const foundUser = DEMO_USERS.find(
      (u) => u.email.toLowerCase() === identifier || u.phone.replace(/\s+/g, '') === identifier.replace(/\s+/g, '')
    );

    if (!foundUser) {
      // Allow fallback login with password if email contains keyword
      let assignedRole = USER_ROLES.PASSENGER;
      if (identifier.includes('admin')) assignedRole = USER_ROLES.ADMIN;
      if (identifier.includes('driver')) assignedRole = USER_ROLES.DRIVER;
      if (identifier.includes('soc') || identifier.includes('system')) assignedRole = USER_ROLES.SYSTEM_ADMIN;

      const genericUser = {
        id: `usr_${Date.now()}`,
        name: identifier.split('@')[0].toUpperCase() || 'SmartTransit User',
        email: identifier.includes('@') ? identifier : `${identifier}@smarttransit.city`,
        phone: identifier.includes('@') ? '+91 98000 00000' : identifier,
        role: assignedRole,
        roleTitle: ROLE_METADATA[assignedRole].title,
        roleCode: ROLE_METADATA[assignedRole].code,
        avatar: 'ST',
        department: 'SmartTransit Network',
      };

      const session = {
        user: genericUser,
        token: `demo_jwt_token_${Date.now()}`,
        expiresAt: Date.now() + 86400 * 1000,
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      return session;
    }

    const session = {
      user: foundUser,
      token: `demo_jwt_token_${foundUser.id}_${Date.now()}`,
      expiresAt: Date.now() + 86400 * 1000,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * One-click demo login for development & evaluation
   */
  async demoLogin(roleKey) {
    await new Promise((res) => setTimeout(res, 300));
    const user = DEMO_USERS.find((u) => u.role === roleKey) || DEMO_USERS[0];
    
    const session = {
      user,
      token: `demo_jwt_${user.role}_${Date.now()}`,
      expiresAt: Date.now() + 86400 * 1000,
      isDemo: true,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Google authentication simulation for offline development mode
   */
  async googleLogin(credential) {
    await new Promise((res) => setTimeout(res, 500));

    const googleUser = {
      id: `usr_google_${Date.now()}`,
      name: 'Google Commuter',
      email: 'commuter.google@smarttransit.city',
      role: USER_ROLES.PASSENGER,
      roleTitle: 'Google Verified Commuter',
      roleCode: 'PASSENGER',
      avatar: 'GC',
      department: 'Urban Transit Citizens',
      authProvider: 'GOOGLE',
      emailVerified: true,
    };

    const session = {
      user: googleUser,
      token: `demo_jwt_google_${Date.now()}`,
      expiresAt: Date.now() + 86400 * 1000,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Passenger registration flow
   */
  async register({ name, fullName, email, phone, phoneNumber, password }) {
    await new Promise((res) => setTimeout(res, 700));

    const finalName = (name || fullName || '').trim();
    const finalEmail = (email || '').trim().toLowerCase();
    const finalPhone = (phone || phoneNumber || '').trim();

    const newUser = {
      id: `usr_reg_${Date.now()}`,
      name: finalName,
      email: finalEmail,
      phone: finalPhone,
      role: USER_ROLES.PASSENGER,
      roleTitle: 'Registered Commuter',
      roleCode: 'PASSENGER',
      avatar: finalName.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || 'RG',
      department: 'Urban Transit Citizens',
    };

    const session = {
      user: newUser,
      token: `demo_jwt_reg_${Date.now()}`,
      expiresAt: Date.now() + 86400 * 1000,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  },

  /**
   * Request mock OTP for verification / password recovery
   */
  async requestOtp(emailOrPhone) {
    await new Promise((res) => setTimeout(res, 500));
    const demoOtp = '123456';
    const payload = {
      target: emailOrPhone,
      otp: demoOtp,
      expiresAt: Date.now() + 60000, // 60s
    };
    sessionStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(payload));
    return { success: true, message: 'OTP sent successfully (Demo Code: 123456)', demoOtp };
  },

  /**
   * Verify mock OTP PIN
   */
  async verifyOtp(enteredOtp) {
    await new Promise((res) => setTimeout(res, 400));
    // Accepts '123456' or any 6-digit pin in demo environment
    if (enteredOtp === '123456' || enteredOtp === '999999' || enteredOtp.length === 6) {
      sessionStorage.removeItem(OTP_STORAGE_KEY);
      return { success: true, message: 'Verification successful.' };
    }
    throw new Error('Invalid verification code. Please enter 123456 in demo mode.');
  },

  /**
   * Reset Password
   */
  async resetPassword({ newPassword }) {
    await new Promise((res) => setTimeout(res, 600));
    return { success: true, message: 'Password reset successfully. Please sign in with your new credentials.' };
  },

  /**
   * Logout and clear session
   */
  logout() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(OTP_STORAGE_KEY);
    } catch (e) {
      console.warn('Error clearing storage on logout', e);
    }
  },
};
