import React, { useState } from 'react';
import { Users, Navigation, Bus, Terminal, ChevronDown, Check, Sparkles } from 'lucide-react';
import { cn } from '../../utils/index.js';

export const AVAILABLE_ROLES = [
  {
    id: 'passenger',
    name: 'Passenger',
    code: 'PASSENGER',
    description: 'Live bus tracking, ETA countdowns, route schedules, favorites',
    icon: Navigation,
    color: 'text-transit-500 bg-transit-500/10 border-transit-500/30',
  },
  {
    id: 'driver',
    name: 'Driver / Operator',
    code: 'DRIVER',
    description: 'Driver cockpit, route waypoints, passenger count, SOS alerts',
    icon: Bus,
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30',
  },
  {
    id: 'admin',
    name: 'Transport Admin',
    code: 'TRANSPORT_ADMIN',
    description: 'Fleet orchestration, dispatch, driver rosters, analytics',
    icon: Users,
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
  },
  {
    id: 'systemAdmin',
    name: 'System / SOC Admin',
    code: 'SYSTEM_ADMIN',
    description: 'Infrastructure health, GPS ingestion streams, WebSocket cluster',
    icon: Terminal,
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  },
];

export function RoleSwitcher({ currentRole = 'admin', onRoleChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);

  const activeRoleData = AVAILABLE_ROLES.find((r) => r.id === currentRole) || AVAILABLE_ROLES[2];
  const Icon = activeRoleData.icon;

  const handleSelect = (roleId) => {
    onRoleChange(roleId);
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-mono font-bold',
          'bg-slate-100 dark:bg-navy-850 border-slate-300 dark:border-slate-700/80',
          'hover:border-transit-500 dark:hover:border-transit-500 focus:outline-none focus:ring-2 focus:ring-transit-500'
        )}
      >
        <span className="text-slate-400 font-normal">Role:</span>
        <div className="flex items-center space-x-1.5 text-slate-900 dark:text-white">
          <Icon className="w-3.5 h-3.5 text-transit-500" />
          <span>{activeRoleData.name}</span>
        </div>
        <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 transition-transform duration-150', isOpen && 'rotate-180')} />
      </button>

      {/* Role Switcher Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-72 p-3 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-50 text-left space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800/80">
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
                      'w-full p-2.5 rounded-xl border transition-all flex items-start space-x-3 text-left',
                      isCurrent
                        ? 'bg-transit-500/10 dark:bg-transit-500/20 border-transit-500 text-slate-900 dark:text-white shadow-sm'
                        : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300'
                    )}
                  >
                    <div className={cn('p-2 rounded-lg flex-shrink-0 mt-0.5', role.color)}>
                      <RoleIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-sans">{role.name}</span>
                        {isCurrent && <Check className="w-3.5 h-3.5 text-transit-500 flex-shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
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
