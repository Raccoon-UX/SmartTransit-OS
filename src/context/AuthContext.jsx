import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth/authService.js';
import { USER_ROLES } from '../services/auth/authTypes.js';
import { socketClient } from '../services/realtime/socketClient.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Restore session from localStorage on initial boot
  useEffect(() => {
    try {
      const existingSession = authService.getSession();
      if (existingSession && existingSession.user) {
        setUser(existingSession.user);
        if (existingSession.token) {
          socketClient.connect(existingSession.token);
        }
      }
    } catch (e) {
      console.warn('Failed to restore session:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Standard Login
  const login = async (credentials) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const session = await authService.login(credentials);
      setUser(session.user);
      if (session.token) {
        socketClient.connect(session.token);
      }
      return session.user;
    } catch (err) {
      setAuthError(err.message || 'Authentication failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Instant Demo Role Login
  const demoLogin = async (roleKey = USER_ROLES.ADMIN) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const session = await authService.demoLogin(roleKey);
      setUser(session.user);
      if (session.token) {
        socketClient.connect(session.token);
      }
      return session.user;
    } catch (err) {
      setAuthError(err.message || 'Demo login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Passenger Registration
  const register = async (formData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const session = await authService.register(formData);
      setUser(session.user);
      if (session.token) {
        socketClient.connect(session.token);
      }
      return session.user;
    } catch (err) {
      setAuthError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password / OTP Request
  const requestPasswordReset = async (emailOrPhone) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await authService.requestOtp(emailOrPhone);
      return response;
    } catch (err) {
      setAuthError(err.message || 'Failed to request OTP');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const verifyOtp = async (otp) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await authService.verifyOtp(otp);
      return response;
    } catch (err) {
      setAuthError(err.message || 'Invalid OTP code');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password
  const resetPassword = async (payload) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await authService.resetPassword(payload);
      return response;
    } catch (err) {
      setAuthError(err.message || 'Failed to reset password');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = () => {
    socketClient.disconnect();
    authService.logout();
    setUser(null);
    setAuthError(null);
  };

  // RBAC Helpers
  const role = user ? user.role : null;
  const isAuthenticated = Boolean(user);

  const checkPermission = (perm) => {
    if (!role) return false;
    return authService.hasPermission(role, perm);
  };

  const checkPathAccess = (pathname) => {
    if (!role) return false;
    return authService.canAccessPath(role, pathname);
  };

  const value = {
    user,
    role,
    isAuthenticated,
    isLoading,
    authError,
    login,
    demoLogin,
    register,
    requestPasswordReset,
    verifyOtp,
    resetPassword,
    logout,
    checkPermission,
    checkPathAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
