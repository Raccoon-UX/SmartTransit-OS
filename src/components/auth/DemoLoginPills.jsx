import React from 'react';
import { User, Bus, Shield, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';
import { DEMO_USERS } from '../../services/auth/mockAuth.js';
import { USER_ROLES } from '../../services/auth/authTypes.js';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { cn } from '../../utils/index.js';

export function DemoLoginPills({ onSelectRole, onSelectDemo, isLoading = false, className = '' }) {
  const { t } = usePublicAccessibility();

  const handleSelect = (roleKey) => {
    if (onSelectRole) onSelectRole(roleKey);
    else if (onSelectDemo) onSelectDemo(roleKey);
  };

  const roleMetaConfig = {
    [USER_ROLES.PASSENGER]: {
      icon: User,
      badgeText: 'PASSENGER',
      badgeClass: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
      iconContainer: 'bg-sky-500/15 text-sky-400 border-sky-500/30',
    },
    [USER_ROLES.DRIVER]: {
      icon: Bus,
      badgeText: 'DRIVER',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      iconContainer: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    [USER_ROLES.ADMIN]: {
      icon: Shield,
      badgeText: 'ADMIN',
      badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      iconContainer: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    },
    [USER_ROLES.SYSTEM_ADMIN]: {
      icon: Terminal,
      badgeText: 'SOC',
      badgeClass: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      iconContainer: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    },
  };

  const getRoleTitle = (role, defaultTitle) => {
    const roleMap = {
      [USER_ROLES.PASSENGER]: 'roleCommuter',
      [USER_ROLES.DRIVER]: 'roleDriver',
      [USER_ROLES.ADMIN]: 'roleAdmin',
      [USER_ROLES.SYSTEM_ADMIN]: 'roleSoc',
    };
    const key = roleMap[role];
    return key ? t(key) : defaultTitle;
  };

  return (
    <div className={cn('space-y-3 text-left', className)}>
      {/* 2 x 2 Compact Role Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
        {DEMO_USERS.map((demo) => {
          const config = roleMetaConfig[demo.role] || roleMetaConfig[USER_ROLES.PASSENGER];
          const Icon = config.icon;

          return (
            <div
              key={demo.id}
              className={cn(
                'group relative rounded-xl border border-slate-700/80',
                'bg-slate-900/85 hover:bg-slate-800/90',
                'p-3 sm:p-3.5 flex flex-col justify-between space-y-2.5',
                'transition-all duration-200 ease-out',
                'hover:border-sky-500/50 hover:shadow-lg hover:shadow-slate-950/50 hover:-translate-y-0.5'
              )}
            >
              {/* Top: Icon + Role Badge */}
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    'w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105',
                    config.iconContainer
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span
                  className={cn(
                    'text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border',
                    config.badgeClass
                  )}
                >
                  {config.badgeText}
                </span>
              </div>

              {/* Title & Official ID */}
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-white font-sans tracking-tight leading-snug group-hover:text-sky-300 transition-colors">
                  {getRoleTitle(demo.role, demo.roleTitle)}
                </h4>
                <p className="text-[11px] font-mono text-slate-400 truncate">
                  {demo.email}
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleSelect(demo.role)}
                className={cn(
                  'w-full inline-flex items-center justify-center space-x-1 py-1.5 px-3 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer',
                  'bg-[#0B3D91] hover:bg-[#0d47a1] active:bg-[#07275f] text-white border border-[#1e40af]/60',
                  'shadow-xs hover:shadow-md hover:shadow-sky-500/20 active:translate-y-0',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <span>Authenticate &rarr;</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DemoLoginPills;


