import React, { useState } from 'react';
import { Info, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function AIExplanationCard({
  title = 'Algorithmic Prediction Explanation',
  factors = [
    { label: 'Corridor traffic congestion delay', impactMin: 2.1 },
    { label: 'Suburban vehicle speed reduction', impactMin: 0.8 },
    { label: 'Historical dwell time baseline', impactMin: -0.4 },
    { label: 'Route density & stop frequency', impactMin: 0.6 },
  ],
  summary = 'Explanation derived from spatial GPS telemetry & historical route baselines.',
  className = '',
  collapsible = true,
  defaultExpanded = true,
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div
      className={cn(
        'p-4 rounded border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-left space-y-3 text-xs font-sans shadow-subtle',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-2">
        <div className="flex items-center space-x-2 font-mono font-bold text-slate-900 dark:text-white uppercase">
          <Info className="w-4 h-4 text-[#0B3D91] dark:text-sky-400 shrink-0" />
          <span>{title}</span>
        </div>
        
        {collapsible && (
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold border border-slate-300 dark:border-slate-700 inline-flex items-center space-x-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Factor Breakdown</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {summary && <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{summary}</p>}

      {(!collapsible || isExpanded) && factors && factors.length > 0 && (
        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase font-bold text-slate-500">
            Contributing Factor Weights (Statistical Impact)
          </div>
          
          <div className="overflow-x-auto rounded border border-slate-300 dark:border-slate-700">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold uppercase text-[10px]">
                  <th className="py-2 px-3">Telemetry Input Variable</th>
                  <th className="py-2 px-3 text-right">Impact Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {factors.map((f, idx) => {
                  const val = f.impactMin !== undefined ? f.impactMin : (f.impactPercent !== undefined ? f.impactPercent : 0);
                  const isPositive = val > 0;
                  const formattedVal = f.impactMin !== undefined ? `${isPositive ? '+' : ''}${f.impactMin} min` : `${isPositive ? '+' : ''}${f.impactPercent}%`;

                  return (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                      <td className="py-2 px-3 text-slate-800 dark:text-slate-200 font-sans">{f.label}</td>
                      <td className={cn('py-2 px-3 text-right font-bold', isPositive ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400')}>
                        {formattedVal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIExplanationCard;
