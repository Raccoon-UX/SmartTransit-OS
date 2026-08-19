import React from 'react';
import { User, Bus, Shield, Terminal, ArrowRight } from 'lucide-react';
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
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
      iconContainer: 'bg-sky-50 text-sky-600 border-sky-200',
    },
    [USER_ROLES.DRIVER]: {
      icon: Bus,
      badgeText: 'DRIVER',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconContainer: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    [USER_ROLES.ADMIN]: {
      icon: Shield,
      badgeText: 'ADMIN',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      iconContainer: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    [USER_ROLES.SYSTEM_ADMIN]: {
      icon: Terminal,
      badgeText: 'SOC',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconContainer: 'bg-indigo-50 text-indigo-600 border-indigo-200',
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
    <div className={cn('space-y-4 text-left', className)}>
      {/* 2 x 2 Large, Tall Role Cards Grid (180-220px) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {DEMO_USERS.map((demo) => {
          const config = roleMetaConfig[demo.role] || roleMetaConfig[USER_ROLES.PASSENGER];
          const Icon = config.icon;

          return (
            <div
              key={demo.id}
              className={cn(
                'group relative rounded-2xl border border-[#DCE4EE]',
                'bg-white p-5 flex flex-col justify-between min-h-[190px]',
                'shadow-xs hover:shadow-md hover:border-[#0B4AA2]/40 hover:-translate-y-1',
                'transition-all duration-200 ease-out text-left'
              )}
            >
              {/* Top: Icon + Role Badge */}
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105',
                    config.iconContainer
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border',
                    config.badgeClass
                  )}
                >
                  {config.badgeText}
                </span>
              </div>

              {/* Middle: Title & Official ID */}
              <div className="my-2 space-y-1">
                <h4 className="text-base font-bold text-[#152238] font-sans tracking-tight leading-snug group-hover:text-[#0B4AA2] transition-colors">
                  {getRoleTitle(demo.role, demo.roleTitle)}
                </h4>
                <p className="text-xs font-mono text-[#5B6B82] truncate">
                  {demo.email}
                </p>
              </div>

              {/* Bottom: Authenticate Action Button */}
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleSelect(demo.role)}
                className={cn(
                  'w-full inline-flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl text-xs font-mono font-bold transition-all duration-200 cursor-pointer',
                  'bg-[#F1F5F9] hover:bg-[#0B4AA2] text-[#152238] hover:text-white border border-[#DCE4EE] hover:border-[#0B4AA2]',
                  'shadow-2xs hover:shadow-sm active:translate-y-0',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                <span>Authenticate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DemoLoginPills;



