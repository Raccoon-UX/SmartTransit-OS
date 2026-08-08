import React, { useEffect } from 'react';
import { X, Activity } from 'lucide-react';
import { NAVIGATION_CONFIG } from '../navigation/navigationConfig.js';
import { Badge } from '../components/ui/Badge.jsx';
import { RoleSwitcher } from '../components/navigation/RoleSwitcher.jsx';
import { cn } from '../utils/index.js';

export function MobileNavigation({
  isOpen = false,
  onClose,
  currentRole = 'admin',
  onRoleChange,
  activeItemId = 'dashboard',
  onSelectItem,
}) {
  const roleConfig = NAVIGATION_CONFIG[currentRole] || NAVIGATION_CONFIG.admin;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full flex">
        <div
          className={cn(
            'w-full h-full flex flex-col justify-between p-4 text-left shadow-2xl',
            'bg-white dark:bg-navy-900 border-r border-slate-200 dark:border-slate-800'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-transit-500 text-white flex items-center justify-center font-bold text-xs">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm font-sans text-slate-900 dark:text-white">
                SmartTransit <span className="text-transit-500 font-semibold">OS</span>
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Indicator & Mobile Switcher */}
          <div className="py-3 border-b border-slate-100 dark:border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Role Workspace</span>
              <Badge variant={roleConfig.badgeVariant} size="sm">
                {roleConfig.roleCode.split('_')[0]}
              </Badge>
            </div>
            <RoleSwitcher currentRole={currentRole} onRoleChange={onRoleChange} />
          </div>

          {/* Navigation Item Stream */}
          <div className="flex-1 overflow-y-auto py-3 space-y-4">
            {roleConfig.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="px-2 text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                  {section.title}
                </div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItemId === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        onSelectItem(item);
                        onClose();
                      }}
                      className={cn(
                        'w-full flex items-center justify-between rounded-xl p-2.5 text-xs font-semibold transition-all',
                        isActive
                          ? 'bg-transit-500 text-white shadow-sm font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-850'
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            'text-[10px] font-mono px-1.5 py-0.2 rounded-full uppercase',
                            isActive ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400'
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

          {/* Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Mobile Transit Mesh</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileNavigation;
