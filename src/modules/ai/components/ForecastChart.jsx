import React from 'react';
import { TrendingUp, Users } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function ForecastChart({ title = 'Occupancy Forecast Trend', forecastData = [] }) {
  if (!forecastData || forecastData.length === 0) return null;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-transit-500/10 text-transit-500">
            <TrendingUp className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{title}</h4>
        </div>
        <span className="text-xs font-mono text-slate-400">30-Min Forecast Window</span>
      </div>

      <div className="space-y-3">
        {forecastData.map((item, idx) => {
          const isCritical = item.percent >= 90;
          const isHigh = item.percent >= 75 && item.percent < 90;
          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{item.label}</span>
                <span
                  className={cn(
                    'font-bold',
                    isCritical ? 'text-rose-500' : isHigh ? 'text-amber-500' : 'text-emerald-500'
                  )}
                >
                  {item.percent}% {item.risk ? `(${item.risk})` : ''}
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-navy-950 overflow-hidden border border-slate-200/50 dark:border-slate-800">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    isCritical ? 'bg-rose-500' : isHigh ? 'bg-amber-500' : 'bg-emerald-500'
                  )}
                  style={{ width: `${Math.min(100, item.percent)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastChart;
