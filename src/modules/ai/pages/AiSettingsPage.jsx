import React, { useState, useEffect } from 'react';
import { Settings, Sliders, ShieldCheck, Cpu } from 'lucide-react';
import { aiEngine } from '../../../services/ai/aiEngine.js';
import { AIDemoControls } from '../components/AIDemoControls.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function AiSettingsPage() {
  const [snapshot, setSnapshot] = useState(aiEngine.getSnapshot());

  useEffect(() => {
    const unsub = aiEngine.subscribe(setSnapshot);
    return () => unsub();
  }, []);

  const { settings, isSimulationActive, activeSimulationType } = snapshot;

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Settings className="w-3.5 h-3.5" />
            <span>AI PLATFORM SETTINGS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            AI Engine & Threshold Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Configure simulated inference parameters, confidence thresholds, and demo simulation triggers.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
          SYSTEM ADMIN ACCESS ONLY
        </span>
      </div>

      {/* Demo Controls Panel */}
      <AIDemoControls isSimulationActive={isSimulationActive} activeType={activeSimulationType} />

      {/* Simulated Settings Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Simulated Inference Parameters</h3>
          <span className="text-xs font-mono text-slate-400">PROTOTYPE SETTINGS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="block font-bold text-slate-700 dark:text-slate-200 uppercase">Confidence Threshold</label>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Minimum Confidence for Auto-Drafting:</span>
              <strong className="text-transit-500">{settings.confidenceThresholdPercent}%</strong>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">Predictions below this score will be flagged as low-confidence.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="block font-bold text-slate-700 dark:text-slate-200 uppercase">Prediction Refresh Interval</label>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Engine Refresh Rate:</span>
              <strong className="text-transit-500">{settings.predictionRefreshIntervalSec} seconds</strong>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">Controlled simulation timer interval for telemetry updates.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="block font-bold text-slate-700 dark:text-slate-200 uppercase">Alert Sensitivity</label>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Sensitivity Mode:</span>
              <strong className="text-amber-500">{settings.alertSensitivity}</strong>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 space-y-2">
            <label className="block font-bold text-slate-700 dark:text-slate-200 uppercase">Explainability Mode</label>
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
              <span>Factor Weight Display:</span>
              <strong className="text-emerald-500">{settings.explainabilityMode}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AiSettingsPage;
