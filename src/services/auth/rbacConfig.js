/**
 * SmartTransit OS — Centralized Role-Based Access Control (RBAC) Matrix
 * 
 * NOTE: Client-side RBAC in this prototype demonstrates UI and access-flow behavior.
 * Production authorization must also be enforced server-side.
 */

export const ROLE_PERMISSIONS = {
  passenger: [
    'passenger.dashboard',
    'passenger.live_map',
    'passenger.search_bus',
    'passenger.routes',
    'passenger.journey_planner',
    'passenger.notifications',
    'passenger.favorites',
    'passenger.profile',
  ],
  driver: [
    'driver.dashboard',
    'driver.current_trip',
    'driver.navigation',
    'driver.occupancy',
    'driver.emergency_sos',
    'driver.reports',
    'driver.profile',
  ],
  admin: [
    'admin.dashboard',
    'admin.fleet',
    'admin.drivers',
    'admin.routes',
    'admin.bus_stops',
    'admin.schedules',
    'admin.alerts',
    'admin.analytics',
    'admin.reports',
    'admin.soc_link',
    'admin.settings',
    'admin.ai_overview',
    'admin.ai_eta',
    'admin.ai_occupancy',
    'admin.ai_demand',
    'admin.ai_routes',
    'admin.ai_anomalies',
    'admin.ai_drivers',
    'admin.ai_alerts',
    'admin.ai_recommendations',
    'admin.ai_activity',
  ],
  systemAdmin: [
    'system.soc_overview',
    'system.infrastructure',
    'system.server_health',
    'system.api_monitoring',
    'system.active_users',
    'system.gps_stream',
    'system.database',
    'system.backups',
    'system.security',
    'system.incidents',
    'system.ai_alerts',
    'system.ai_overview',
    'system.ai_eta',
    'system.ai_occupancy',
    'system.ai_demand',
    'system.ai_routes',
    'system.ai_anomalies',
    'system.ai_drivers',
    'system.ai_alerts',
    'system.ai_incidents',
    'system.ai_system',
    'system.ai_recommendations',
    'system.ai_activity',
    'system.ai_models',
    'system.ai_settings',
  ],
};

/**
 * Checks if a given role has the required permission
 */
export function hasPermission(role, permission) {
  if (!role || !permission) return false;
  const permissions = ROLE_PERMISSIONS[role] || [];
  return permissions.includes(permission);
}

/**
 * Checks if a given role can access a target route path
 */
export function canAccessPath(role, pathname) {
  if (!role || !pathname) return false;

  if (pathname.startsWith('/passenger') && role === 'passenger') return true;
  if (pathname.startsWith('/driver') && role === 'driver') return true;
  if (pathname.startsWith('/admin') && role === 'admin') return true;
  if (pathname.startsWith('/system') && role === 'systemAdmin') return true;
  if (pathname.startsWith('/soc') && (role === 'systemAdmin' || role === 'admin')) return true;

  // Centralized AI RBAC Rules
  if (pathname.startsWith('/ai')) {
    if (role === 'systemAdmin') return true;
    if (role === 'admin') {
      // Transport Admin is restricted from system/infrastructure AI pages
      const restrictedAiPages = ['/ai/models', '/ai/settings', '/ai/system', '/ai/incidents'];
      return !restrictedAiPages.some((restricted) => pathname.startsWith(restricted));
    }
    return false;
  }

  // System Admin can audit all platforms
  if (role === 'systemAdmin' && (pathname.startsWith('/admin') || pathname.startsWith('/passenger') || pathname.startsWith('/driver'))) {
    return true;
  }

  return false;
}

