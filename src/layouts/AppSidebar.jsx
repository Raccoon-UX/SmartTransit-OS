import React from 'react';
import { ChevronRight, Shield } from 'lucide-react';
import { NAVIGATION_CONFIG } from '../navigation/navigationConfig.js';
import { usePublicAccessibility } from '../context/PublicAccessibilityContext.jsx';
import { cn } from '../utils/index.js';

export function AppSidebar({
  currentRole = 'admin',
  activeItemId = 'dashboard',
  onSelectItem,
  collapsed = false,
  className = '',
}) {
  const { t } = usePublicAccessibility();
  const roleConfig = NAVIGATION_CONFIG[currentRole] || NAVIGATION_CONFIG.admin;

  const getItemLabel = (item) => {
    if (item.translationKey) return t(item.translationKey);
    const keyMap = {
      'Dashboard': 'menuDashboard',
      'Fleet Management': 'menuFleet',
      'Drivers & Staff': 'menuDrivers',
      'Routes & Schedules': 'menuRoutes',
      'Bus Stops & Terminals': 'menuStops',
      'Dispatch Schedule': 'menuSchedules',
      'Live Control': 'menuDispatch',
      'Alerts & Warnings': 'menuAlerts',
      'Analytics': 'menuAnalytics',
      'Reports': 'menuReports',
      'Settings': 'menuSettings',
      'SOC Overview': 'menuSocOverview',
      'Infrastructure': 'menuInfrastructure',
      'Server Clusters': 'menuServers',
      'API Gateways': 'menuApiMonitoring',
      'User Sessions': 'menuSessions',
      'GPS Ingestion': 'menuGpsMonitoring',
      'Databases': 'menuDatabase',
      'Backups': 'menuBackups',
      'Security Audit': 'menuSecurity',
      'Incidents': 'menuIncidents',
      'Telemetry Logs': 'menuTelemetry',
      'Scalability': 'menuScalability',
      'SOC Settings': 'menuSocSettings',
      'AI Hub Overview': 'menuAiOverview',
      'ETA Predictor': 'menuEtaIntelligence',
      'Occupancy AI': 'menuOccupancyForecast',
      'Demand AI': 'menuDemandForecast',
      'Route Optimizer': 'menuRouteIntelligence',
      'Anomaly Detection': 'menuAnomalyDetection',
      'Driver Intelligence': 'menuDriverIntelligence',
      'Intelligent Alerts': 'menuIntelligentAlerts',
      'Incident Intelligence': 'menuIncidentIntelligence',
      'System Health AI': 'menuSystemIntelligence',
      'Recommendations': 'menuRecommendations',
      'AI Activity': 'menuAiActivity',
      'Model Health': 'menuModelHealth',
      'AI Settings': 'menuAiSettings',
      'Trip Cockpit': 'menuActiveTrip',
      'Turn Navigation': 'menuDriverNavigation',
      'Passenger Counter': 'menuOccupancyInput',
      'Emergency SOS': 'menuDriverEmergency',
      'Shift Reports': 'menuDriverReports',
      'Live Transit Map': 'menuLiveMap',
      'Search Buses': 'menuBusSearch',
      'Trip Planner': 'menuJourneyPlanner',
      'Alerts & Notices': 'menuNotifications',
      'Saved Routes': 'menuFavorites',
      'Profile Settings': 'menuPassengerProfile',
    };
    const key = keyMap[item.label];
    return key ? t(key) : item.label;
  };

  const getSectionTitle = (title) => {
    const sectionMap = {
      'Transit Explorer': 'menuPassengerSection',
      'Personal Mobility': 'menuPassengerSection',
      'Cockpit Controls': 'menuDriverSection',
      'Shift Management': 'menuDriverSection',
      'Core Operations': 'menuAdminSection',
      'Operations Oversight': 'menuAdminSection',
      'Infrastructure': 'menuSocSection',
      'Reliability': 'menuSocSection',
      'Security & Audit': 'menuSocSection',
      'Predictive Intelligence': 'menuAiSection',
      'Optimization': 'menuAiSection',
      'Model Performance': 'menuAiSection',
    };
    const key = sectionMap[title];
    return key ? t(key) : title;
  };

  const getRoleName = (role) => {
    const roleMap = {
      passenger: 'roleCommuter',
      driver: 'roleDriver',
      admin: 'roleAdmin',
      soc: 'roleSoc',
      ai: 'roleAi',
    };
    const key = roleMap[role];
    return key ? t(key) : roleConfig.roleName;
  };

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col justify-between h-[calc(100vh-5rem)] border-r transition-all duration-200 select-none text-left shrink-0',
        'bg-[#F7F5F0] dark:bg-navy-900 border-[#E5E0D8] dark:border-slate-800',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Top Active Workspace Indicator */}
      <div className="p-3 border-b border-[#E5E0D8] dark:border-slate-800">
        {!collapsed ? (
          <div className="px-3 py-2 rounded-lg bg-white dark:bg-navy-850 border border-[#E5E0D8] dark:border-slate-800 flex items-center justify-between shadow-subtle">
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#596273] dark:text-slate-400 block font-bold">
                Workspace
              </span>
              <span className="text-xs font-bold text-[#172033] dark:text-white truncate block">
                {getRoleName(currentRole)}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-7 h-7 rounded bg-[#1769D1]/10 text-[#1769D1] border border-[#1769D1]/30 flex items-center justify-center font-mono font-bold text-xs">
              {roleConfig.roleCode[0]}
            </div>
          </div>
        )}
      </div>

      {/* Clean Vertical Navigation List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {roleConfig.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-0.5">
            {!collapsed && (
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase font-bold tracking-wider text-[#596273] dark:text-slate-500">
                {getSectionTitle(section.title)}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeItemId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectItem(item)}
                  className={cn(
                    'w-full flex items-center px-3 py-2 text-xs font-medium transition-all relative border-l-2',
                    isActive
                      ? 'bg-white dark:bg-navy-800 text-[#1769D1] dark:text-sky-400 border-[#1769D1] dark:border-sky-400 font-bold shadow-subtle rounded-r-lg'
                      : 'text-[#596273] dark:text-slate-400 hover:bg-white/60 dark:hover:bg-navy-850 hover:text-[#172033] dark:hover:text-white border-transparent'
                  )}
                >
                  <Icon className={cn('w-4 h-4 flex-shrink-0', collapsed ? 'mx-auto' : 'mr-2.5')} />

                  {!collapsed && <span className="flex-1 text-left truncate">{getItemLabel(item)}</span>}

                  {!collapsed && item.badge && (
                    <span
                      className={cn(
                        'text-[10px] font-mono font-bold px-1.5 py-0.2 rounded text-[#596273] dark:text-slate-400 bg-[#ECE8DF] dark:bg-slate-800'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default AppSidebar;
