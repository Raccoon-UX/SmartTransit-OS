import React, { useState, useEffect } from 'react';
import { Clock, Filter, Bus, Route, Sparkles } from 'lucide-react';
import { etaService } from '../../../services/ai/etaService.js';
import { PredictionCard } from '../components/PredictionCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function EtaIntelligencePage() {
  const [data, setData] = useState({ predictions: [], history: [] });
  const [timeFilter, setTimeFilter] = useState('TODAY'); // 'TODAY' | '7_DAYS' | '30_DAYS'

  useEffect(() => {
    const unsub = etaService.subscribe(setData);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>PREDICTIVE ETA ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Predictive ETA Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comparing scheduled timetables, GPS telemetry, and AI predictions with contributing factor breakdowns.
          </p>
        </div>

        {/* Time Filters */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
          {['TODAY', '7_DAYS', '30_DAYS'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFilter(tf)}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-all',
                timeFilter === tf ? 'bg-white dark:bg-navy-800 text-transit-500 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              )}
            >
              {tf.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Active Predictive ETA Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Active Vehicle ETA Predictions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.predictions.map((pred) => (
            <PredictionCard key={pred.id} prediction={pred} showExplanation={true} />
          ))}
        </div>
      </div>

      {/* ETA Prediction History & Accuracy Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Historical Prediction Accuracy Log</h3>
          <span className="text-xs font-mono text-slate-400">SIMULATED HISTORICAL LOG</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase">
                <th className="p-3">Date</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Route</th>
                <th className="p-3">Target Stop</th>
                <th className="p-3">AI Predicted</th>
                <th className="p-3">Actual Arrival</th>
                <th className="p-3">Error (Min)</th>
                <th className="p-3">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300">
              {data.history.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-navy-950/50">
                  <td className="p-3">{row.date}</td>
                  <td className="p-3 font-bold">{row.busNumber}</td>
                  <td className="p-3"><span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800">{row.routeId}</span></td>
                  <td className="p-3">{row.stop}</td>
                  <td className="p-3 text-transit-500 font-bold">{row.predictedEta}</td>
                  <td className="p-3 font-bold">{row.actualArrival}</td>
                  <td className="p-3">
                    <span className={cn('font-bold', row.errorMin > 0 ? 'text-amber-500' : 'text-emerald-500')}>
                      {row.errorMin > 0 ? `+${row.errorMin}m` : `${row.errorMin}m`}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-emerald-500">{row.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EtaIntelligencePage;
