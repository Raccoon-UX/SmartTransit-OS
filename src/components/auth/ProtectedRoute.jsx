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
  const { isAuthenticated, isLoading, role } = useAuth();

  React.useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      if (onNavigateToLogin) onNavigateToLogin();
      return;
    }

    if (requiredRole && role !== requiredRole && role !== 'systemAdmin') {
      if (onNavigateToUnauthorized) onNavigateToUnauthorized();
      return;
    }

    if (requiredPermission && !hasPermission(role, requiredPermission)) {
      if (onNavigateToUnauthorized) onNavigateToUnauthorized();
    }
  }, [isLoading, isAuthenticated, role, requiredRole, requiredPermission, onNavigateToLogin, onNavigateToUnauthorized]);

  if (isLoading) {
    return <PageLoading message="Verifying transit authorization..." />;
  }

  if (!isAuthenticated) {
    return <PageLoading message="Redirecting to login..." />;
  }

  if (requiredRole && role !== requiredRole && role !== 'systemAdmin') {
    return <PageLoading message="Verifying access permissions..." />;
  }

  if (requiredPermission && !hasPermission(role, requiredPermission)) {
    return <PageLoading message="Verifying security clearances..." />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
