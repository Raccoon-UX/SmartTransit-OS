import React from 'react';
import { User, Bus, Shield, Terminal, ArrowRight } from 'lucide-react';
import { DEMO_USERS } from '../../services/auth/mockAuth.js';
import { USER_ROLES } from '../../services/auth/authTypes.js';

export function DemoLoginPills({ onSelectRole, onSelectDemo, isLoading = false, className = '' }) {
  const handleSelect = (roleKey) => {
    if (onSelectRole) onSelectRole(roleKey);
    else if (onSelectDemo) onSelectDemo(roleKey);
  };

  const roleIcons = {
    [USER_ROLES.PASSENGER]: User,
    [USER_ROLES.DRIVER]: Bus,
    [USER_ROLES.ADMIN]: Shield,
    [USER_ROLES.SYSTEM_ADMIN]: Terminal,
  };

  return (
    <div className="space-y-3 text-left">
      <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
        Select a pre-configured role to authenticate with full RBAC permissions:
      </p>

      <div className="overflow-x-auto rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
        <table className="w-full text-left text-xs font-sans">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold uppercase text-[10px] font-mono">
              <th className="py-2.5 px-3">Role Title</th>
              <th className="py-2.5 px-3">Official ID</th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {DEMO_USERS.map((demo) => {
              const Icon = roleIcons[demo.role] || User;
              return (
                <tr key={demo.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-[#0B3D91] dark:text-sky-400 shrink-0" />
                      <span>{demo.roleTitle}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                    {demo.email}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => handleSelect(demo.role)}
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#0B3D91] hover:bg-[#093278] text-white border border-[#07275f] transition-colors"
                    >
                      <span>Authenticate</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DemoLoginPills;
