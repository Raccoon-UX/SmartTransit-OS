import React, { useState, useEffect } from 'react';
import { Route, Sparkles, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { routeIntelligenceService } from '../../../services/ai/routeIntelligenceService.js';
import { ConfidenceBadge } from '../components/ConfidenceBadge.jsx';
import { RecommendationCard } from '../components/RecommendationCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function RouteIntelligencePage() {
  const [data, setData] = useState({ insights: [] });

  useEffect(() => {
    const unsub = routeIntelligenceService.subscribe(setData);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Route className="w-3.5 h-3.5" />
            <span>ROUTE INTELLIGENCE ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Route Performance Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Reliability scoring, delay risk detection, and simulated optimization recommendations.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {data.insights.map((ri) => (
          <div key={ri.id} className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-transit-500/10 text-transit-500 font-mono font-bold">
                  {ri.routeId}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">{ri.routeName}</h3>
                  <p className="text-xs text-slate-500 font-mono">Service Quality: <strong className="text-transit-500">{ri.serviceQuality}</strong></p>
                </div>
              </div>
              <ConfidenceBadge confidence={ri.confidence} level={ri.confidenceLevel} />
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Reliability Score</div>
                <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{ri.reliabilityScore} / 100</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Avg Delay</div>
                <div className="text-2xl font-extrabold text-amber-500">{ri.avgDelayMinutes} min</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Delay Risk</div>
                <div className="text-2xl font-extrabold text-amber-500">{ri.delayRisk}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Load Factor</div>
                <div className="text-2xl font-extrabold text-emerald-500">{ri.loadFactor}%</div>
              </div>
            </div>

            {/* Route Recommendations */}
            {ri.recommendations && ri.recommendations.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono font-bold text-slate-400 uppercase">AI Route Optimization Recommendations</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ri.recommendations.map((rec) => (
                    <div key={rec.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-bold text-slate-800 dark:text-slate-200">{rec.title}</span>
                        <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold">{rec.priority}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-sans">{rec.reason}</p>
                      <div className="text-[11px] font-mono text-emerald-500 font-bold">Impact: {rec.expectedImpact}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RouteIntelligencePage;
