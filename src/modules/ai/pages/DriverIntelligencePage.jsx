import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, Award, AlertCircle, HeartPulse } from 'lucide-react';
import { driverIntelligenceService } from '../../../services/ai/driverIntelligenceService.js';
import { ConfidenceBadge } from '../components/ConfidenceBadge.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function DriverIntelligencePage() {
  const [data, setData] = useState({ insights: [] });

  useEffect(() => {
    const unsub = driverIntelligenceService.subscribe(setData);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>DRIVER SAFETY & OPERATIONAL ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Driver Safety & Operational Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Operational assistance only. No sensitive profiling or automated personnel actions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.insights.map((dri) => (
          <div key={dri.id} className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">{dri.driverName}</h3>
                <p className="text-xs text-slate-500 font-mono">ID: {dri.driverId} • {dri.busNumber}</p>
              </div>
              <ConfidenceBadge confidence={dri.confidence} level={dri.confidenceLevel} size="sm" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-center font-mono">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="text-[10px] text-emerald-500 uppercase font-bold">Safety Score</div>
                <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{dri.safetyScore}%</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Route Adherence</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{dri.routeAdherencePercent}%</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs font-mono space-y-1">
              <span className="text-slate-400 font-bold">Operational Insight:</span>
              <p className="text-slate-700 dark:text-slate-300 font-sans">{dri.insight}</p>
            </div>

            <div className="p-3 rounded-xl bg-transit-500/10 border border-transit-500/20 text-xs font-mono space-y-1">
              <span className="text-transit-500 font-bold uppercase text-[10px]">Coaching Suggestion</span>
              <p className="text-slate-700 dark:text-slate-300 font-sans">{dri.coachingSuggestion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverIntelligencePage;
