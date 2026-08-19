import React from 'react';
import { User, Bus, Shield, Terminal, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
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
      roleBadge: 'PASSENGER',
      badgeClass: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
      iconBox: 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border-sky-200/80 dark:border-sky-800/60',
    },
    [USER_ROLES.DRIVER]: {
      icon: Bus,
      roleBadge: 'DRIVER',
      badgeClass: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
      iconBox: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-800/60',
    },
    [USER_ROLES.ADMIN]: {
      icon: Shield,
      roleBadge: 'ADMIN',
      badgeClass: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
      iconBox: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200/80 dark:border-blue-800/60',
    },
    [USER_ROLES.SYSTEM_ADMIN]: {
      icon: Terminal,
      roleBadge: 'SOC',
      badgeClass: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
      iconBox: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200/80 dark:border-indigo-800/60',
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
    <div className={cn('space-y-3.5 text-left', className)}>
      {/* 2 × 2 Compact Role Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {DEMO_USERS.map((demo) => {
          const config = roleMetaConfig[demo.role] || roleMetaConfig[USER_ROLES.PASSENGER];
          const Icon = config.icon;

          return (
            <div
              key={demo.id}
              className={cn(
                'group relative rounded-xl border border-slate-200 dark:border-slate-800',
                'bg-white dark:bg-slate-900/90 p-3.5 flex flex-col justify-between',
                'transition-all duration-200 ease-out',
                'hover:border-[#0B3D91]/60 dark:hover:border-sky-500/60 hover:shadow-md hover:shadow-slate-900/5 hover:-translate-y-1'
              )}
            >
              {/* Card Top: Icon + Badge */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105',
                    config.iconBox
                  )}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border',
                    config.badgeClass
                  )}
                >
                  {config.roleBadge}
                </span>
              </div>

              {/* Card Center: Title & Email */}
              <div className="space-y-1 mb-3">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans truncate">
                  {getRoleTitle(demo.role, demo.roleTitle)}
                </h4>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                  {demo.email}
                </p>
              </div>

              {/* Card Action: Authenticate Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleSelect(demo.role)}
                className={cn(
                  'w-full inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer',
                  'bg-slate-100 dark:bg-slate-800 hover:bg-[#0B3D91] hover:text-white dark:hover:bg-[#0B3D91]',
                  'text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#07275f]',
                  'hover:shadow-xs group-hover:bg-[#0B3D91] group-hover:text-white group-hover:border-[#07275f]',
                  'disabled:opacity-60 disabled:cursor-not-allowed'
                )}
              >
                <span>{t('authenticateBtn') || 'Authenticate'}</span>
                <ArrowRight className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DemoLoginPills;


