import React from 'react';
import { Cpu, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AI_FEATURES_DATA } from '../../../data/landing/aiFeaturesData.js';
import busTrackerBg from '../../../assets/0_bus-trackerjpeg.avif';

export function AiIntelligenceSection() {
  return (
    <section
      id="ai-intelligence"
      className="relative py-16 sm:py-20 border-t border-slate-300 dark:border-slate-800 bg-slate-900 bg-cover bg-center bg-no-repeat bg-fixed text-left"
      style={{ backgroundImage: `url(${busTrackerBg})` }}
    >
      {/* Dark Overlay Layer for Contrast */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md text-sky-300 text-xs font-mono font-bold border border-white/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>PREDICTIVE TRANSIT ALGORITHMS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Predictive Dispatch & Operations Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-200">
            Algorithmic forecasting models analyzing telemetry streams for route delay prediction, passenger demand estimation, and anomaly detection.
          </p>
        </div>

        {/* Prototype / Simulated Algorithm Notice Banner */}
        <div className="p-3 rounded bg-amber-950/60 backdrop-blur-md border border-amber-500/40 text-xs text-amber-200 flex items-center space-x-2.5 font-mono">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>OFFICIAL NOTICE:</strong> Algorithmic predictions are generated via simulated statistical models for operational decision assistance. Final dispatch authority remains with human transport controllers.
          </span>
        </div>

        {/* Analytical Machine Learning Models Table with Backdrop Blur */}
        <div className="overflow-x-auto rounded border border-slate-700 bg-slate-900/90 backdrop-blur-md shadow-panel">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-700 text-slate-200 font-bold uppercase text-[11px] font-mono">
                <th className="py-3 px-4">Model Name</th>
                <th className="py-3 px-4">Analytical Focus</th>
                <th className="py-3 px-4">Operational Logic & Evidence Factors</th>
                <th className="py-3 px-4 text-right">Target Precision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {AI_FEATURES_DATA.map((item) => {
                const Icon = item.icon;
                return (
                  <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white font-mono">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                        {item.tag}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed max-w-xl">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-sky-400">
                      {item.metric}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AiIntelligenceSection;
