import React, { useState } from 'react';
import { Sparkles, Info, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function AIExplanationCard({
  title = 'AI Prediction Explanation',
  factors = [
    { label: 'Traffic congestion on corridor', impactMin: 2.1 },
    { label: 'Suburban vehicle speed reduction', impactMin: 0.8 },
    { label: 'Historical dwell time pattern', impactMin: -0.4 },
    { label: 'Route density & stop frequency', impactMin: 0.6 },
  ],
  summary = 'Explanation derived from real-time spatial telemetry & historical route baselines.',
  className = '',
  collapsible = true,
  defaultExpanded = false,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        'p-4 rounded-2xl border bg-slate-900 text-white border-slate-800 shadow-md space-y-3 text-left transition-all',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-transit-400 animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">{title}</span>
        </div>
        
        {collapsible ? (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2.5 py-1 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-xs font-mono font-bold border border-purple-500/30 inline-flex items-center space-x-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Why this prediction?</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
          </button>
        ) : (
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/30">
            INFERENCE EXPLANATION
          </span>
        )}
      </div>

      {summary && <p className="text-xs text-slate-300 font-sans leading-relaxed">{summary}</p>}

      {(!collapsible || isExpanded) && factors && factors.length > 0 && (
        <div className="space-y-2 pt-1 animate-fade-in">
          <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">Top Contributing Feature Weights</div>
          <div className="space-y-1.5">
            {factors.map((f, idx) => {
              const val = f.impactMin !== undefined ? f.impactMin : (f.impactPercent !== undefined ? f.impactPercent : 0);
              const isPositive = val > 0;
              const formattedVal = f.impactMin !== undefined ? `${isPositive ? '+' : ''}${f.impactMin} min` : `${isPositive ? '+' : ''}${f.impactPercent}%`;

              return (
                <div key={idx} className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs font-mono space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-200">{f.label}</span>
                    <span className={cn('font-bold', isPositive ? 'text-rose-400' : 'text-emerald-400')}>
                      {formattedVal}
                    </span>
                  </div>
                  {/* Visual Impact Weight Indicator Bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all duration-500', isPositive ? 'bg-rose-500' : 'bg-emerald-500')}
                      style={{ width: `${Math.min(Math.abs(val) * 20 + 20, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 font-mono pt-1">
        <Info className="w-3 h-3 text-transit-400 shrink-0" />
        <span>Inference weights explain the telemetry inputs behind this AI prediction.</span>
      </div>
    </div>
  );
}

export default AIExplanationCard;
