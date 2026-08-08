import React, { useState, useEffect } from 'react';
import { BarChart3, Grid, Calendar, Clock, Sparkles } from 'lucide-react';
import { demandService } from '../../../services/ai/demandService.js';
import { ConfidenceBadge } from '../components/ConfidenceBadge.jsx';
import { cn } from '../../../utils/index.js';

export function DemandForecastPage() {
  const [data, setData] = useState({ forecasts: [], heatmap: { hours: [], routes: [] } });

  useEffect(() => {
    const unsub = demandService.subscribe(setData);
    return () => unsub();
  }, []);

  const getHeatmapColor = (level) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-rose-500/80 text-white font-bold border-rose-600';
      case 'HIGH':
        return 'bg-amber-500/80 text-slate-950 font-bold border-amber-600';
      case 'MEDIUM':
        return 'bg-emerald-500/60 text-slate-950 font-bold border-emerald-600';
      default:
        return 'bg-slate-200 dark:bg-navy-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>PASSENGER DEMAND ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Passenger Demand Forecasting
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Predictive hourly demand modeling and visual Time × Route heatmap matrix.
          </p>
        </div>
      </div>

      {/* Demand Heatmap Matrix */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Grid className="w-4 h-4 text-transit-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Time × Route Demand Heatmap Matrix
            </h3>
          </div>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-navy-700" /><span>LOW</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /><span>MEDIUM</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /><span>HIGH</span></span>
            <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /><span>CRITICAL</span></span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="p-2 text-left">Route</th>
                {data.heatmap.hours.map((h) => (
                  <th key={h} className="p-2">{h}:00</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.heatmap.routes.map((r) => (
                <tr key={r.id}>
                  <td className="p-2 text-left font-bold text-slate-800 dark:text-slate-200">{r.name}</td>
                  {r.levels.map((lvl, idx) => (
                    <td key={idx} className="p-1">
                      <div
                        className={cn(
                          'py-1.5 px-1 rounded border text-[10px] uppercase transition-all',
                          getHeatmapColor(lvl)
                        )}
                      >
                        {lvl}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hourly Demand Cards per Route */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Route Hourly Demand Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.forecasts.map((d) => (
            <div key={d.routeId} className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans">{d.routeId}</h4>
                  <p className="text-xs text-slate-500 font-mono">{d.routeName}</p>
                </div>
                <ConfidenceBadge confidence={d.confidence} level={d.confidenceLevel} size="sm" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-slate-50 dark:bg-navy-950">
                <div>Peak Hour: <strong className="text-transit-500">{d.peakHour}</strong></div>
                <div>Demand Trend: <strong className="text-amber-500">{d.demandTrend}</strong></div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono font-bold text-slate-400">Peak Window Demand Distribution</div>
                <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                  {d.hourlyDemand.slice(2, 6).map((h) => (
                    <div key={h.hour} className="p-2 rounded-lg bg-slate-100 dark:bg-navy-800 border border-slate-200 dark:border-slate-700">
                      <div className="text-[10px] text-slate-400">{h.hour}</div>
                      <div className="font-bold text-slate-900 dark:text-white">{h.percent}%</div>
                      <div className="text-[9px] font-bold text-amber-500">{h.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DemandForecastPage;
