import React, { useState, useEffect } from 'react';
import { AlertTriangle, Cpu, Terminal, ShieldCheck, Sparkles } from 'lucide-react';
import { incidentIntelligenceService } from '../../../services/ai/incidentIntelligenceService.js';
import { ConfidenceBadge } from '../components/ConfidenceBadge.jsx';
import { AIExplanationCard } from '../components/AIExplanationCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function IncidentIntelligencePage() {
  const [data, setData] = useState({ incidents: [] });

  useEffect(() => {
    const unsub = incidentIntelligenceService.subscribe(setData);
    return () => unsub();
  }, []);

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold mb-1 border border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SOC INCIDENT AI ROOT CAUSE ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            SOC Incident AI Assessment
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            System Operations Center incident signal correlation and likelihood assessments.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold border border-rose-500/20">
          SYSTEM ADMIN ACCESS ONLY
        </span>
      </div>

      <div className="space-y-6">
        {data.incidents.map((inc) => (
          <div key={inc.id} className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <span className="px-2.5 py-1 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold border border-rose-500/20">
                  {inc.incidentId}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">{inc.title}</h3>
              </div>
              <ConfidenceBadge confidence={inc.confidence} level={inc.confidenceLevel} />
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 font-mono">
              "{inc.summary}"
            </p>

            {/* Signal Likelihood Breakdown */}
            <div className="space-y-2 font-mono">
              <div className="text-xs font-bold text-slate-400 uppercase">Contributing Signal Likelihood Breakdown</div>
              <div className="space-y-1.5">
                {inc.contributingSignals.map((sig, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{sig.name}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-400">{sig.status}</span>
                      <span className={cn('font-bold', sig.likelihood > 50 ? 'text-rose-500' : 'text-slate-400')}>
                        {sig.likelihood}% Likelihood
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Technical Actions */}
            <div className="space-y-2 font-mono">
              <div className="text-xs font-bold text-transit-500 uppercase">Recommended SRE / NOC Actions</div>
              <div className="space-y-1">
                {inc.recommendedActions.map((act, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-transit-500 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncidentIntelligencePage;
