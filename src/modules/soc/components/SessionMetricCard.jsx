import React from 'react';
import { Users, ShieldCheck } from 'lucide-react';
import { ProgressBar } from '../../../components/dataviz/ProgressBar.jsx';
import { cn } from '../../../utils/index.js';

export function SessionMetricCard({ sessionData, className = '' }) {
  if (!sessionData) return null;

  return (
    <div className={cn('p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-5 font-mono text-xs', className)}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-transit-500" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">Active User Session Capacity</h4>
        </div>
        <span className="text-xs font-bold text-emerald-500">● {sessionData.capacityStatus}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-bold">Total Active Connections</span>
          <span className="font-extrabold text-slate-900 dark:text-white text-sm">
            {sessionData.totalActiveUsers.toLocaleString()} / {sessionData.capacityThreshold.toLocaleString()} ({sessionData.utilizationPercent}%)
          </span>
        </div>
        <ProgressBar progress={sessionData.utilizationPercent} color="#0c87eb" height={8} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
        {sessionData.breakdown.map((item) => (
          <div key={item.role} className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 block uppercase font-bold">{item.role}</span>
            <span className={cn('font-bold text-xs block', item.color)}>{item.count.toLocaleString()} ({item.percent}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SessionMetricCard;
