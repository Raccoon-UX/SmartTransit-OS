import React from 'react';
import { Bus, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { ConfidenceBadge } from './ConfidenceBadge.jsx';
import { AIExplanationCard } from './AIExplanationCard.jsx';
import { cn } from '../../../utils/index.js';

export function PredictionCard({ prediction, showExplanation = true }) {
  if (!prediction) return null;

  const {
    busNumber,
    routeId,
    routeName,
    currentStop,
    nextStop,
    scheduledEta,
    telemetryEta,
    aiPredictedEta,
    delayMinutes,
    confidence,
    confidenceLevel,
    factors,
  } = prediction;

  const isDelayed = delayMinutes > 0;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-transit-500/10 text-transit-500 font-bold font-mono">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-slate-900 dark:text-white font-sans">{busNumber}</span>
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">
                {routeId}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              {currentStop} → <strong className="text-transit-500">{nextStop}</strong>
            </p>
          </div>
        </div>
        <ConfidenceBadge confidence={confidence} level={confidenceLevel} />
      </div>

      {/* ETA Timeline Comparison */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="text-xs font-mono font-bold uppercase text-slate-400">ETA Timeline Comparison</div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Scheduled</div>
            <div className="text-sm sm:text-base font-extrabold text-slate-700 dark:text-slate-300 font-mono">{scheduledEta}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Telemetry</div>
            <div className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-200 font-mono">{telemetryEta}</div>
          </div>
          <div className={cn(
            'p-2.5 rounded-lg border',
            isDelayed ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
          )}>
            <div className="text-[10px] font-mono uppercase font-bold">AI Prediction</div>
            <div className="text-sm sm:text-base font-extrabold font-mono">{aiPredictedEta}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono pt-1 text-slate-500 dark:text-slate-400">
          <span>Prediction Variance:</span>
          <span className={cn('font-bold', isDelayed ? 'text-amber-500' : 'text-emerald-500')}>
            {isDelayed ? `+${delayMinutes} min delay predicted` : 'On Time'}
          </span>
        </div>
      </div>

      {showExplanation && factors && (
        <AIExplanationCard
          title="Predictive ETA Model Explanation"
          factors={factors}
          summary={`Current traffic slowdown and route progression indicate a ${delayMinutes}-minute delay compared with scheduled arrival.`}
        />
      )}
    </div>
  );
}

export default PredictionCard;
