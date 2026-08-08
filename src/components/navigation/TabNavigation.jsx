import React from 'react';
import { cn } from '../../utils/index.js';

export function TabNavigation({
  tabs = [], // [{ id, label, icon: Icon, badge }]
  activeTab,
  onChange,
  className = '',
}) {
  return (
    <div className={cn('flex items-center space-x-1 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center space-x-2 px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all border-b-2 -mb-px whitespace-nowrap',
              isActive
                ? 'border-transit-500 text-transit-600 dark:text-transit-400 bg-transit-500/5 dark:bg-transit-500/10'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700'
            )}
          >
            {Icon && <Icon className="w-4 h-4" />}
            <span>{tab.label}</span>
            {tab.badge && (
              <span
                className={cn(
                  'text-[10px] font-mono px-1.5 py-0.2 rounded-full',
                  isActive
                    ? 'bg-transit-500 text-white'
                    : 'bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default TabNavigation;
