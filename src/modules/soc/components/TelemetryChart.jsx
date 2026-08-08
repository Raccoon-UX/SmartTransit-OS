import React from 'react';
import { BarChart3, Activity } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function TelemetryChart({ title, series = [], color = '#0c87eb', className = '' }) {
  if (!series || series.length === 0) return null;

  const maxVal = Math.max(...series.map((s) => s.value)) || 100;

  return (
    <div className={cn('p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4 font-mono text-xs', className)}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{title}</h4>
        <Activity className="w-4 h-4 text-transit-500 animate-pulse" />
      </div>

      <div className="flex items-end space-x-2 h-40 pt-4">
        {series.map((d, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center justify-end">
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300 mb-1">{d.value}</span>
            <div
              className="w-full rounded-t-lg transition-all duration-300"
              style={{
                height: `${(d.value / maxVal) * 100}%`,
                backgroundColor: color,
                minHeight: '6px',
              }}
            />
            <span className="text-[9px] text-slate-400 mt-1 truncate w-full text-center">{d.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TelemetryChart;
