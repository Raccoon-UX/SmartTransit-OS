import React from 'react';
import { Activity, Sparkles, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function AIActivityFeed({ activities = [] }) {
  if (!activities || activities.length === 0) return null;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-transit-500/10 text-transit-500">
            <Activity className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">AI Prediction & Audit Stream</h4>
        </div>
        <span className="text-xs font-mono text-slate-400">{activities.length} Events Logged</span>
      </div>

      <div className="space-y-3 font-mono">
        {activities.map((act) => (
          <div key={act.id} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800/60">
            <div className="p-1.5 rounded-lg bg-transit-500/10 text-transit-500 shrink-0 mt-0.5">
              <Zap className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 space-y-0.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-200">{act.entity}</span>
                <span>{act.timestamp}</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-sans">{act.message}</p>
              <div className="text-[10px] text-slate-400">Actor: {act.user}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AIActivityFeed;
