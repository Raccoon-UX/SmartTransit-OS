import React from 'react';
import { ChevronRight, Shield, Radio } from 'lucide-react';
import { NAVIGATION_CONFIG } from '../navigation/navigationConfig.js';
import { Badge } from '../components/ui/Badge.jsx';
import { cn } from '../utils/index.js';

export function AppSidebar({
  currentRole = 'admin',
  activeItemId = 'dashboard',
  onSelectItem,
  collapsed = false,
  className = '',
}) {
  const roleConfig = NAVIGATION_CONFIG[currentRole] || NAVIGATION_CONFIG.admin;

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 border-r transition-all duration-300 select-none text-left',
        'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      {/* Top Role Indicator Banner */}
      <div className="p-3 border-b border-slate-100 dark:border-slate-800/80">
        {!collapsed ? (
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Active Workspace
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">
                {roleConfig.roleName}
              </span>
            </div>
            <Badge variant={roleConfig.badgeVariant} size="sm">
              {roleConfig.roleCode.split('_')[0]}
            </Badge>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-transit-500/10 text-transit-500 border border-transit-500/30 flex items-center justify-center font-mono font-bold text-xs">
              {roleConfig.roleCode[0]}
            </div>
          </div>
        )}
      </div>

      {/* Main Navigation Item Stream */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {roleConfig.sections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!collapsed && (
              <div className="px-3 py-1 text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeItemId === item.id;

              return (
                <div key={item.id} className="relative group">
                  <button
                    type="button"
                    onClick={() => onSelectItem(item)}
                    className={cn(
                      'w-full flex items-center rounded-xl p-2.5 text-xs font-semibold transition-all duration-150 relative',
                      isActive
                        ? 'bg-transit-500 text-white shadow-sm shadow-transit-500/20 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-850 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    <Icon className={cn('w-4 h-4 flex-shrink-0', collapsed ? 'mx-auto' : 'mr-3')} />

                    {!collapsed && <span className="flex-1 text-left truncate">{item.label}</span>}

                    {!collapsed && item.badge && (
                      <span
                        className={cn(
                          'text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full uppercase',
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeVariant === 'success'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : item.badgeVariant === 'warning'
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            : item.badgeVariant === 'critical'
                            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                            : 'bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>

                  {/* Tooltip on collapsed state */}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs font-sans whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl border border-slate-800">
                      <div className="font-bold">{item.label}</div>
                      {item.badge && <span className="text-[10px] text-transit-300 font-mono">[{item.badge}]</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer Telemetry Status */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800/80">
        {!collapsed ? (
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
              <span className="text-slate-600 dark:text-slate-400 text-[11px]">Mesh Sync 2s</span>
            </div>
            <span className="text-slate-400 text-[10px]">v1.0.0</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 telemetry-live" />
          </div>
        )}
      </div>
    </aside>
  );
}

export default AppSidebar;
