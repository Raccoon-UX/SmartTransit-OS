import React, { useState, useEffect } from 'react';
import { Cpu, Activity, Server, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { systemIntelligenceService } from '../../../services/ai/systemIntelligenceService.js';
import { ConfidenceBadge } from '../components/ConfidenceBadge.jsx';
import { MetricCard } from '../../../components/cards/MetricCard.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';

export function SystemIntelligencePage() {
  const [data, setData] = useState({ system: null });

  useEffect(() => {
    const unsub = systemIntelligenceService.subscribe(setData);
    return () => unsub();
  }, []);

  const sys = data.system;
  if (!sys) return null;

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold mb-1 border border-indigo-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>SYSTEM HEALTH & CAPACITY PREDICTOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            System Telemetry Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Predictive infrastructure capacity risks and SOC cluster health analysis.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold border border-indigo-500/20">
          SYSTEM ADMIN ACCESS ONLY
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="System Health Score"
          value={`${sys.healthScore} / 100`}
          trend="OPERATIONAL"
          trendDirection="up"
          trendLabel="overall score"
          icon={Activity}
        />
        <MetricCard
          title="Capacity Risk"
          value={sys.capacityRisk}
          trend={`Proj: ${sys.projectedUtilization15m}%`}
          trendDirection="neutral"
          trendLabel="in 15 mins"
          icon={Cpu}
        />
        <MetricCard
          title="Current Load"
          value={`${sys.currentUtilization}%`}
          trend="+4%"
          trendDirection="up"
          trendLabel="vs baseline"
          icon={Server}
        />
        <MetricCard
          title="Predictive Confidence"
          value={`${sys.confidence}%`}
          trend="HIGH"
          trendDirection="up"
          trendLabel="model confidence"
          icon={ShieldCheck}
        />
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Capacity Risk Assessment</h3>
          <ConfidenceBadge confidence={sys.confidence} level={sys.confidenceLevel} />
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono space-y-1 text-amber-700 dark:text-amber-300">
          <strong className="block text-[10px] uppercase font-bold text-amber-500">Predicted Capacity Warning</strong>
          <p className="font-sans leading-relaxed">{sys.recommendation}</p>
        </div>

        <div className="space-y-2 font-mono">
          <div className="text-xs font-bold text-slate-400 uppercase">Top Risk Contributing Factors</div>
          <div className="space-y-1">
            {sys.riskFactors && sys.riskFactors.map((rf, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">{rf.factor}</span>
                <span className="text-amber-500 font-bold">+{rf.weight}% Weight</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemIntelligencePage;
