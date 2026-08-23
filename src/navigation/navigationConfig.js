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
  Clock,
  Package,
} from 'lucide-react';

/**
 * SmartTransit OS — Centralized Role-Aware Navigation Registry
 * Clean, restrained enterprise navigation structure
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
          { id: 'live-map', label: 'Live Transit Map', icon: MapPin, path: '/passenger/live-map' },
          { id: 'search-bus', label: 'Search Buses', icon: Search, path: '/passenger/search' },
          { id: 'routes', label: 'Routes & Schedules', icon: Route, path: '/passenger/routes' },
          { id: 'journey-planner', label: 'Trip Planner', icon: Compass, path: '/passenger/planner' },
          { id: 'trip-history', label: 'Trip History', icon: Clock, path: '/passenger/trip-history' },
        ],
      },
      {
        title: 'Safety & Assistance',
        items: [
          { id: 'safety-center', label: 'Safety Center', icon: ShieldCheck, path: '/passenger/safety-center' },
          { id: 'notifications', label: 'Service Alerts', icon: Bell, path: '/passenger/notifications', badge: '3', badgeVariant: 'warning' },
          { id: 'complaints', label: 'My Complaints', icon: FileText, path: '/passenger/complaints' },
          { id: 'lost-and-found', label: 'Lost & Found', icon: Package, path: '/passenger/lost-and-found' },
        ],
      },
      {
        title: 'Personal Mobility',
        items: [
          { id: 'favorites', label: 'Saved Routes', icon: Star, path: '/passenger/favorites' },
          { id: 'profile', label: 'Profile Settings', icon: User, path: '/passenger/profile' },
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
        title: 'Active Shift',
        items: [
          { id: 'dashboard', label: 'Driver Cockpit', icon: LayoutDashboard, path: '/driver/dashboard' },
          { id: 'current-trip', label: 'Current Trip', icon: Navigation, path: '/driver/current-trip' },
          { id: 'waypoints', label: 'Route Stops', icon: Route, path: '/driver/waypoints' },
          { id: 'occupancy', label: 'Passenger Counter', icon: Users, path: '/driver/occupancy' },
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
          { id: 'bus-stops', label: 'Bus Terminals', icon: MapPin, path: '/admin/stops' },
          { id: 'schedules', label: 'Schedule Dispatcher', icon: Calendar, path: '/admin/schedules' },
        ],
      },
      {
        title: 'Intelligence & Command',
        items: [
          { id: 'alerts', label: 'Service Alerts', icon: Bell, path: '/admin/alerts', badge: '2', badgeVariant: 'warning' },
          { id: 'analytics', label: 'Fleet Analytics', icon: BarChart3, path: '/admin/analytics' },
          { id: 'reports', label: 'Operational Reports', icon: FileText, path: '/admin/reports' },
          { id: 'ai-overview', label: 'AI Intelligence Center', icon: Sparkles, path: '/ai/overview' },
          { id: 'soc', label: 'Operations Center (SOC)', icon: Terminal, path: '/admin/soc' },
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
          { id: 'overview', label: 'SOC Overview', icon: Activity, path: '/soc/overview' },
          { id: 'infrastructure', label: 'Cluster Infrastructure', icon: Server, path: '/soc/infrastructure' },
          { id: 'server-health', label: 'Server Health', icon: Cpu, path: '/soc/servers' },
          { id: 'api-monitoring', label: 'API Gateway & Latency', icon: Radio, path: '/soc/api-monitoring' },
          { id: 'active-users', label: 'Active Sessions & Mesh', icon: Users, path: '/soc/sessions' },
          { id: 'gps-stream', label: 'GPS Ingestion Stream', icon: Wifi, path: '/soc/gps-monitoring' },
        ],
      },
      {
        title: 'Security & Maintenance',
        items: [
          { id: 'database', label: 'Database & Cache', icon: Database, path: '/soc/database' },
          { id: 'backups', label: 'Disaster Backups', icon: HardDrive, path: '/soc/backups' },
          { id: 'security', label: 'Security & Access Audits', icon: ShieldCheck, path: '/soc/security' },
          { id: 'incidents', label: 'Incident Log', icon: AlertTriangle, path: '/soc/incidents', badge: '1', badgeVariant: 'critical' },
          { id: 'ai-overview', label: 'AI Intelligence Engine', icon: Sparkles, path: '/ai/overview' },
        ],
      },
    ],
  },
};

// Map alias 'soc' to systemAdmin
NAVIGATION_CONFIG.soc = NAVIGATION_CONFIG.systemAdmin;

export default NAVIGATION_CONFIG;
