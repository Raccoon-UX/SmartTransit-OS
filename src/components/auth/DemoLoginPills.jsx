import React from 'react';
import { User, Bus, Shield, Terminal, ArrowRight, Sparkles } from 'lucide-react';
import { DEMO_USERS } from '../../services/auth/mockAuth.js';
import { USER_ROLES } from '../../services/auth/authTypes.js';
import { Badge } from '../ui/Badge.jsx';
import { cn } from '../../utils/index.js';

export function DemoLoginPills({ onSelectDemo, isLoading = false, className = '' }) {
  const roleIcons = {
    [USER_ROLES.PASSENGER]: User,
    [USER_ROLES.DRIVER]: Bus,
    [USER_ROLES.ADMIN]: Shield,
    [USER_ROLES.SYSTEM_ADMIN]: Terminal,
  };

  return (
    <div className={cn('space-y-3 text-left', className)}>
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-transit-500" />
          <span>One-Click Demo Personas</span>
        </div>
        <Badge variant="neutral" size="sm">
          Demo Environment
        </Badge>
      </div>

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Click any role below to instantly authenticate into an authorized profile:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {DEMO_USERS.map((demo) => {
          const Icon = roleIcons[demo.role] || User;
          return (
            <button
              key={demo.id}
              type="button"
              disabled={isLoading}
              onClick={() => onSelectDemo(demo.role)}
              className={cn(
                'p-3 rounded-xl border text-left transition-all duration-200 group relative',
                'bg-slate-50 dark:bg-navy-850 border-slate-200 dark:border-slate-800',
                'hover:border-transit-500 dark:hover:border-transit-500 hover:bg-white dark:hover:bg-navy-800',
                'focus:outline-none focus:ring-2 focus:ring-transit-500/50'
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-transit-500/10 text-transit-600 dark:text-transit-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white font-sans">{demo.roleTitle}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{demo.email}</div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-transit-500 group-hover:translate-x-0.5 transition-all mt-1" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default DemoLoginPills;
