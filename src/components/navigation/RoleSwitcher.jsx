import React, { useState } from 'react';
import { Users, Navigation, Bus, Terminal, ChevronDown, Check } from 'lucide-react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { cn } from '../../utils/index.js';

export const AVAILABLE_ROLES = [
  {
    id: 'passenger',
    name: 'Passenger',
    code: 'PASSENGER',
    description: 'Live bus tracking, ETA countdowns, route schedules, favorites',
    icon: Navigation,
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/30',
  },
  {
    id: 'driver',
    name: 'Driver / Operator',
    code: 'DRIVER',
    description: 'Driver cockpit, route waypoints, passenger count, SOS alerts',
    icon: Bus,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  },
  {
    id: 'admin',
    name: 'Transport Admin',
    code: 'TRANSPORT_ADMIN',
    description: 'Fleet orchestration, dispatch, driver rosters, analytics',
    icon: Users,
    color: 'text-[#B83E12] bg-[#B83E12]/10 border-[#B83E12]/30',
  },
  {
    id: 'systemAdmin',
    name: 'System / SOC Admin',
    code: 'SYSTEM_ADMIN',
    description: 'Infrastructure health, GPS ingestion streams, WebSocket cluster',
    icon: Terminal,
    color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/30',
  },
];

export function RoleSwitcher({ currentRole = 'admin', onRoleChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = usePublicAccessibility();

  const activeRoleData = AVAILABLE_ROLES.find((r) => r.id === currentRole) || AVAILABLE_ROLES[2];
  const Icon = activeRoleData.icon;

  const handleSelect = (roleId) => {
    onRoleChange(roleId);
    setIsOpen(false);
  };

  const getRoleTitle = (roleId, defaultName) => {
    const roleMap = {
      passenger: 'roleCommuter',
      driver: 'roleDriver',
      admin: 'roleAdmin',
      systemAdmin: 'roleSoc',
    };
    const key = roleMap[roleId];
    return key ? t(key) : defaultName;
  };

  return (
    <div className={cn('relative shrink-0', className)}>
      {/* Compact Stacked Vertical Button (Role: on Top, Transport Admin on Bottom) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center space-x-1.5 px-2.5 py-1 rounded-lg border transition-all text-xs font-sans text-left leading-tight shrink-0 shadow-xs',
          'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700',
          'hover:border-[#B83E12] dark:hover:border-amber-400 focus:outline-none'
        )}
      >
        <Icon className="w-4 h-4 text-[#B83E12] dark:text-amber-400 shrink-0" />
        <div className="flex flex-col justify-center min-w-0 leading-none">
          <span className="text-[9px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 leading-none">
            Role
          </span>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate leading-none mt-0.5">
            {getRoleTitle(activeRoleData.id, activeRoleData.name)}
          </span>
        </div>
        <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-150', isOpen && 'rotate-180')} />
      </button>

      {/* Role Switcher Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 text-left space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                Development Role Simulator
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                DEV ONLY
              </span>
            </div>

            <div className="space-y-1">
              {AVAILABLE_ROLES.map((role) => {
                const RoleIcon = role.icon;
                const isCurrent = role.id === currentRole;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleSelect(role.id)}
                    className={cn(
                      'w-full flex items-start space-x-3 p-2 rounded-xl text-left transition-colors',
                      isCurrent
                        ? 'bg-slate-100 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent'
                    )}
                  >
                    <div className={cn('p-1.5 rounded-lg border shrink-0 mt-0.5', role.color)}>
                      <RoleIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {getRoleTitle(role.id, role.name)}
                        </span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400" />}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate mt-0.5 font-sans">
                        {role.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RoleSwitcher;
