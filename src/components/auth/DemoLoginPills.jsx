import React from 'react';
import { User, Bus, Shield, Terminal, ArrowRight, Lock, ShieldCheck } from 'lucide-react';
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
      badgeColor: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
      iconBg: 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800/60',
      tag: 'PASSENGER ACCESS',
    },
    [USER_ROLES.DRIVER]: {
      icon: Bus,
      badgeColor: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20',
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
      tag: 'PILOT TELEMETRY',
    },
    [USER_ROLES.ADMIN]: {
      icon: Shield,
      badgeColor: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
      iconBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
      tag: 'DISPATCH COMMAND',
    },
    [USER_ROLES.SYSTEM_ADMIN]: {
      icon: Terminal,
      badgeColor: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/60',
      tag: 'SOC INFRASTRUCTURE',
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
      <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
        {t('selectDemoSubtitle') || 'Select a pre-configured role to authenticate with full RBAC permissions:'}
      </p>

      {/* Enterprise Role Rows List */}
      <div className="space-y-2.5">
        {DEMO_USERS.map((demo) => {
          const config = roleMetaConfig[demo.role] || roleMetaConfig[USER_ROLES.PASSENGER];
          const Icon = config.icon;

          return (
            <div
              key={demo.id}
              className={cn(
                'group relative rounded-xl border border-slate-200/90 dark:border-slate-700/80',
                'bg-white dark:bg-slate-900/90 p-3 sm:p-3.5',
                'transition-all duration-200 ease-out',
                'hover:border-[#0B3D91]/40 dark:hover:border-sky-500/40 hover:shadow-md hover:shadow-[#0B3D91]/5 hover:-translate-y-0.5',
                'flex flex-col sm:flex-row sm:items-center justify-between gap-3'
              )}
            >
              {/* Left & Center Info */}
              <div className="flex items-center space-x-3 min-w-0">
                {/* Role Icon Container */}
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105',
                    config.iconBg
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>

                {/* Role Title & Identity Details */}
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans truncate">
                      {getRoleTitle(demo.role, demo.roleTitle)}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border',
                        config.badgeColor
                      )}
                    >
                      {config.tag}
                    </span>
                  </div>

                  {/* Official ID in monospace */}
                  <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span className="truncate">{demo.email}</span>
                  </div>
                </div>
              </div>

              {/* Right Action: Authenticate Button */}
              <div className="shrink-0 flex sm:justify-end">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSelect(demo.role)}
                  className={cn(
                    'w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer',
                    'bg-[#0B3D91] hover:bg-[#082e6d] active:bg-[#06214f] text-white border border-[#07275f]',
                    'shadow-xs hover:shadow-md hover:shadow-[#0B3D91]/20 hover:-translate-y-0.5 active:translate-y-0',
                    'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0'
                  )}
                >
                  <span>{t('authenticateBtn') || 'Authenticate'} &rarr;</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Security Notice Strip inside Role Panel */}
      <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/60 flex items-center space-x-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <ShieldCheck className="w-3.5 h-3.5 text-[#0B3D91] dark:text-sky-400 shrink-0" />
        <span className="leading-snug">
          {t('demoSandboxFooter') || 'All demo accounts are pre-authorized for evaluation in the sandbox environment.'}
        </span>
      </div>
    </div>
  );
}

export default DemoLoginPills;

