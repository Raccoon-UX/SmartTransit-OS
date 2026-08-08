import React, { useState } from 'react';
import { BarChart3, Activity, TrendingUp } from 'lucide-react';
import { analyticsService } from '../../../services/admin/analyticsService.js';
import { cn } from '../../../utils/index.js';

export function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState('today');
  const [data, setData] = useState(() => analyticsService.getAnalytics('today'));

  const handleTimeframe = (tf) => { setTimeframe(tf); setData(analyticsService.getAnalytics(tf)); };
  const maxOnTime = Math.max(...data.onTimeRateSeries.map((d) => d.value));

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-mono font-bold mb-1 border border-purple-500/20"><BarChart3 className="w-3.5 h-3.5" /><span>PERFORMANCE INTELLIGENCE</span></div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">Analytics Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Fleet utilization, route performance, and operational metrics across time filters.</p>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-[10px] text-slate-400 font-bold uppercase">Timeframe:</span>
        {[['today', 'Today'], ['7days', '7 Days'], ['30days', '30 Days']].map(([tf, label]) => (
          <button key={tf} type="button" onClick={() => handleTimeframe(tf)} className={cn('px-3 py-1.5 rounded-xl font-bold transition-colors', timeframe === tf ? 'bg-transit-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-navy-850 text-slate-600 dark:text-slate-400')}>{label}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center"><span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Fleet Utilization</span><div className="text-3xl font-extrabold text-emerald-500 mt-2">{data.fleetUtilizationPercent}%</div><span className="text-xs font-mono text-slate-400">Active / Total Fleet</span></div>
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center"><span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Average Speed</span><div className="text-3xl font-extrabold text-cyan-500 mt-2">{data.avgSpeedKmh}</div><span className="text-xs font-mono text-slate-400">Network Average</span></div>
        <div className="p-5 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center"><span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">Trips Executed</span><div className="text-3xl font-extrabold text-transit-500 mt-2">{data.totalTripsExecuted.toLocaleString()}</div><span className="text-xs font-mono text-slate-400">{data.timeframe}</span></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">On-Time Performance Rate</h3>
          <div className="flex items-end space-x-2 h-48">
            {data.onTimeRateSeries.map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center justify-end">
                <span className="text-[10px] font-mono font-bold text-transit-500 mb-1">{d.value}%</span>
                <div className="w-full rounded-t-lg bg-transit-500 transition-all duration-300" style={{ height: `${(d.value / maxOnTime) * 100}%`, minHeight: '8px' }} />
                <span className="text-[9px] font-mono text-slate-400 mt-1 truncate w-full text-center">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Route Load Distribution</h3>
          <div className="space-y-3">
            {data.routeLoadSeries.map((d) => (
              <div key={d.route} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono"><span className="font-bold text-slate-900 dark:text-white">{d.route}</span><span className="font-bold text-transit-500">{d.loadPercent}%</span></div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-navy-850 overflow-hidden"><div className="h-full rounded-full bg-gradient-to-r from-transit-500 to-cyan-500 transition-all duration-500" style={{ width: `${d.loadPercent}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400 text-center">
        ℹ️ Prototype analytics — generated from simulated operational data. Not connected to live production telemetry.
      </div>
    </div>
  );
}
export default AnalyticsPage;
