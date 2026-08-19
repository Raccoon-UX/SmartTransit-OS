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
      badgeColor: 'bg-sky-500/10 text-sky-700 border-sky-500/20',
      iconBg: 'bg-sky-50 text-sky-600 border-sky-200',
      tag: 'PASSENGER ACCESS',
    },
    [USER_ROLES.DRIVER]: {
      icon: Bus,
      badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      tag: 'PILOT TELEMETRY',
    },
    [USER_ROLES.ADMIN]: {
      icon: Shield,
      badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      tag: 'DISPATCH COMMAND',
    },
    [USER_ROLES.SYSTEM_ADMIN]: {
      icon: Terminal,
      badgeColor: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
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
      <p className="text-xs text-slate-600 font-sans leading-relaxed">
        {t('selectDemoSubtitle') || 'Select a pre-configured role to authenticate with full RBAC permissions:'}
      </p>

      {/* Enterprise Four Horizontal Role Rows */}
      <div className="space-y-2.5">
        {DEMO_USERS.map((demo) => {
          const config = roleMetaConfig[demo.role] || roleMetaConfig[USER_ROLES.PASSENGER];
          const Icon = config.icon;

          return (
            <div
              key={demo.id}
              className={cn(
                'group relative rounded-xl border border-slate-200/90',
                'bg-white p-3.5 sm:p-4',
                'transition-all duration-200 ease-out shadow-2xs',
                'hover:border-[#0B3D91]/40 hover:shadow-md hover:shadow-[#0B3D91]/5 hover:-translate-y-0.5',
                'flex flex-col sm:flex-row sm:items-center justify-between gap-3'
              )}
            >
              {/* Left & Center Info */}
              <div className="flex items-center space-x-3.5 min-w-0">
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
                    <span className="text-sm sm:text-[15px] font-bold text-slate-900 font-sans truncate">
                      {getRoleTitle(demo.role, demo.roleTitle)}
                    </span>
                    <span
                      className={cn(
                        'text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border',
                        config.badgeColor
                      )}
                    >
                      {config.tag}
                    </span>
                  </div>

                  {/* Official ID in monospace */}
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-500">
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
                    'w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all duration-200 cursor-pointer',
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
      <div className="pt-3 border-t border-slate-200/80 flex items-center space-x-2 text-xs font-mono text-slate-500">
        <ShieldCheck className="w-4 h-4 text-[#0B3D91] shrink-0" />
        <span className="leading-snug">
          {t('demoSandboxFooter') || 'All demo accounts are pre-authorized for evaluation in the sandbox environment.'}
        </span>
      </div>
    </div>
  );
}

export default DemoLoginPills;




