import {
  LayoutDashboard,
  MapPin,
  Search,
  Route,
  Compass,
  Bell,
  Star,
  User,
  Navigation,
  Users,
  AlertOctagon,
  FileText,
  Bus,
  Calendar,
  BarChart3,
  Terminal,
  Settings,
  Activity,
  Server,
  Cpu,
  Radio,
  Wifi,
  Database,
  HardDrive,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

/**
 * SmartTransit OS — Centralized Role-Aware Navigation Registry
 */
export const NAVIGATION_CONFIG = {
  // PASSENGER ROLE NAVIGATION
  passenger: {
    roleName: 'Passenger',
    roleCode: 'PASSENGER',
    badgeVariant: 'primary',
    sections: [
      {
        title: 'Transit Explorer',
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/passenger/dashboard' },
          { id: 'live-map', label: 'Live Map', icon: MapPin, path: '/passenger/live-map', badge: 'LIVE', badgeVariant: 'success' },
          { id: 'search-bus', label: 'Search Bus', icon: Search, path: '/passenger/search' },
          { id: 'routes', label: 'Routes & Timetables', icon: Route, path: '/passenger/routes' },
          { id: 'journey-planner', label: 'Journey Planner', icon: Compass, path: '/passenger/planner' },
        ],
      },
      {
        title: 'Personal Mobility',
        items: [
          { id: 'notifications', label: 'Alerts & Notices', icon: Bell, path: '/passenger/notifications', badge: '3', badgeVariant: 'warning' },
          { id: 'favorites', label: 'Favorite Routes', icon: Star, path: '/passenger/favorites' },
          { id: 'profile', label: 'Passenger Profile', icon: User, path: '/passenger/profile' },
        ],
      },
    ],
  },

  // DRIVER ROLE NAVIGATION
  driver: {
    roleName: 'Bus Operator / Driver',
    roleCode: 'DRIVER',
    badgeVariant: 'accent',
    sections: [
      {
        title: 'Active Operations',
        items: [
          { id: 'dashboard', label: 'Driver Cockpit', icon: LayoutDashboard, path: '/driver/dashboard' },
          { id: 'current-trip', label: 'Current Trip', icon: Navigation, path: '/driver/current-trip', badge: 'ACTIVE', badgeVariant: 'success' },
          { id: 'waypoints', label: 'Route Waypoints', icon: Route, path: '/driver/waypoints' },
          { id: 'occupancy', label: 'Passenger Occupancy', icon: Users, path: '/driver/occupancy' },
        ],
      },
      {
        title: 'Safety & Logs',
        items: [
          { id: 'emergency', label: 'Emergency SOS', icon: AlertOctagon, path: '/driver/emergency', badge: 'SOS', badgeVariant: 'critical' },
          { id: 'reports', label: 'Shift Reports', icon: FileText, path: '/driver/reports' },
          { id: 'profile', label: 'Driver Profile', icon: User, path: '/driver/profile' },
        ],
      },
    ],
  },

  // TRANSPORT ADMIN ROLE NAVIGATION
  admin: {
    roleName: 'Transport Administrator',
    roleCode: 'TRANSPORT_ADMIN',
    badgeVariant: 'primary',
    sections: [
      {
        title: 'Fleet & Transit Dispatch',
        items: [
          { id: 'dashboard', label: 'Dispatch Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
          { id: 'fleet', label: 'Fleet Management', icon: Bus, path: '/admin/fleet', badge: '256', badgeVariant: 'neutral' },
          { id: 'drivers', label: 'Driver Roster', icon: Users, path: '/admin/drivers' },
          { id: 'routes', label: 'Transit Routes', icon: Route, path: '/admin/routes' },
          { id: 'bus-stops', label: 'Bus Stop Terminals', icon: MapPin, path: '/admin/stops' },
          { id: 'schedules', label: 'Schedule Dispatcher', icon: Calendar, path: '/admin/schedules' },
        ],
      },
      {
        title: 'Intelligence & Command',
        items: [
          { id: 'alerts', label: 'City Transit Alerts', icon: Bell, path: '/admin/alerts', badge: '2', badgeVariant: 'warning' },
          { id: 'analytics', label: 'Fleet Analytics', icon: BarChart3, path: '/admin/analytics' },
          { id: 'reports', label: 'Operational Reports', icon: FileText, path: '/admin/reports' },
          { id: 'ai-overview', label: 'AI Intelligence Center', icon: Sparkles, path: '/ai/overview', badge: 'AI', badgeVariant: 'accent' },
          { id: 'soc', label: 'System Operations Center', icon: Terminal, path: '/admin/soc', badge: 'LIVE', badgeVariant: 'success' },
          { id: 'settings', label: 'Platform Settings', icon: Settings, path: '/admin/settings' },
        ],
      },
    ],
  },

  // SYSTEM / IT ADMINISTRATOR ROLE NAVIGATION
  systemAdmin: {
    roleName: 'System / SOC Administrator',
    roleCode: 'SYSTEM_ADMIN',
    badgeVariant: 'warning',
    sections: [
      {
        title: 'Infrastructure & Telemetry',
        items: [
          { id: 'overview', label: 'SOC Overview', icon: Activity, path: '/system/overview' },
          { id: 'infrastructure', label: 'Cluster Infrastructure', icon: Server, path: '/system/infrastructure' },
          { id: 'server-health', label: 'Server Health', icon: Cpu, path: '/system/health', badge: '99.98%', badgeVariant: 'success' },
          { id: 'api-monitoring', label: 'API Gateway & Latency', icon: Radio, path: '/system/api' },
          { id: 'active-users', label: 'Active Sessions & Mesh', icon: Users, path: '/system/users' },
          { id: 'gps-stream', label: 'GPS Ingestion Stream', icon: Wifi, path: '/system/gps', badge: 'LIVE', badgeVariant: 'success' },
        ],
      },
      {
        title: 'Security & Maintenance',
        items: [
          { id: 'database', label: 'Database & Redis Cache', icon: Database, path: '/system/database' },
          { id: 'backups', label: 'Disaster Backups', icon: HardDrive, path: '/system/backups' },
          { id: 'security', label: 'Security & Access Audits', icon: ShieldCheck, path: '/system/security' },
          { id: 'incidents', label: 'Incident Log', icon: AlertTriangle, path: '/system/incidents', badge: '1', badgeVariant: 'critical' },
          { id: 'ai-overview', label: 'AI Intelligence Engine', icon: Sparkles, path: '/ai/overview', badge: 'AI', badgeVariant: 'accent' },
        ],
      },
    ],
  },
};


export default NAVIGATION_CONFIG;
