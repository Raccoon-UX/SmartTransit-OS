import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { PageLoading } from '../ui/LoadingStates.jsx';
import { hasPermission } from '../../services/auth/rbacConfig.js';

export function ProtectedRoute({
  children,
  requiredRole,
  requiredPermission,
  onNavigateToLogin,
  onNavigateToUnauthorized,
}) {
  const { isAuthenticated, isLoading, role, user } = useAuth();

  if (isLoading) {
    return <PageLoading message="Verifying transit authorization..." />;
  }

  if (!isAuthenticated) {
    if (onNavigateToLogin) {
      onNavigateToLogin();
      return null;
    }
    return <div className="p-8 text-center text-sm text-slate-500">Redirecting to login...</div>;
  }

  // Role check if specified
  if (requiredRole && role !== requiredRole) {
    if (role !== 'systemAdmin') {
      if (onNavigateToUnauthorized) {
        onNavigateToUnauthorized();
        return null;
      }
      return null;
    }
  }

  // Granular Permission check if specified
  if (requiredPermission && !hasPermission(role, requiredPermission)) {
    if (onNavigateToUnauthorized) {
      onNavigateToUnauthorized();
      return null;
    }
    return null;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
