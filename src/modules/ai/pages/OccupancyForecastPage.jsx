import React, { useState, useEffect } from 'react';
import { Users, AlertTriangle, Bus, ShieldAlert, Sparkles } from 'lucide-react';
import { occupancyService } from '../../../services/ai/occupancyService.js';
import { ForecastChart } from '../components/ForecastChart.jsx';
import { ConfidenceBadge } from '../components/ConfidenceBadge.jsx';
import { AIExplanationCard } from '../components/AIExplanationCard.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function OccupancyForecastPage() {
  const [data, setData] = useState({ forecasts: [] });

  useEffect(() => {
    const unsub = occupancyService.subscribe(setData);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>OCCUPANCY FORECASTING ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Passenger Occupancy Forecasting
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Predictive load modeling across transit buses and corridors to prevent overcrowding.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data.forecasts.map((occ) => {
          const isCritical = occ.riskLevel === 'CRITICAL' || occ.riskLevel === 'HIGH';
          const chartData = [
            { label: 'Current', percent: occ.currentOccupancy },
            { label: '10 Min Out', percent: occ.forecast10min },
            { label: '20 Min Out', percent: occ.forecast20min, risk: occ.riskLabel },
            { label: '30 Min Out', percent: occ.forecast30min },
          ];

          return (
            <div key={occ.id} className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-transit-500/10 text-transit-500 font-mono font-bold">
                    <Bus className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">{occ.busNumber}</h3>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">
                        {occ.routeId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">{occ.routeName}</p>
                  </div>
                </div>
                <ConfidenceBadge confidence={occ.confidence} level={occ.confidenceLevel} size="sm" />
              </div>

              <ForecastChart title={`${occ.busNumber} Load Prediction`} forecastData={chartData} />

              <div className={cn(
                'p-4 rounded-2xl border text-xs font-mono space-y-1',
                isCritical ? 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              )}>
                <div className="flex items-center justify-between">
                  <strong className="uppercase font-bold">AI Recommended Action</strong>
                  <StatusBadge status={occ.riskLabel} label={occ.riskLabel} size="sm" variant={isCritical ? 'critical' : 'success'} />
                </div>
                <p className="font-sans leading-relaxed">{occ.recommendation}</p>
              </div>

              <AIExplanationCard
                title="Occupancy Factor Breakdown"
                factors={occ.factors}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OccupancyForecastPage;
