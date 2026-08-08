import React from 'react';
import { Activity, Clock } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function SocActivityFeed({ activities = [], className = '' }) {
  return (
    <div className={cn('p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4 font-mono text-xs', className)}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-transit-500 animate-pulse" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">Central SOC Audit Feed</h4>
        </div>
        <span className="text-xs font-bold text-emerald-500">Live Logger Active</span>
      </div>

      <div className="space-y-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-slate-800/80 flex items-start space-x-3 text-xs"
          >
            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-bold text-[10px]">
              {act.timestamp}
            </span>
            <div className="flex-1">
              <div className="flex items-center space-x-2 font-bold text-slate-900 dark:text-white">
                <span>{act.actor}</span>
                <span className="text-transit-500">• {act.action}</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{act.details}</p>
            </div>
            <span className="text-[10px] font-bold text-emerald-500">✓ {act.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SocActivityFeed;
