import React from 'react';
import { Sliders, RefreshCw, AlertCircle, Users, Radio, Cpu, RotateCcw } from 'lucide-react';
import { aiEngine } from '../../../services/ai/aiEngine.js';
import { cn } from '../../../utils/index.js';

export function AIDemoControls({ isSimulationActive = false, activeType = null, className = '' }) {
  return (
    <div className={cn('p-5 sm:p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl space-y-4 text-left select-none relative overflow-hidden', className)}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3.5 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold font-sans text-white tracking-tight">
              AI Demo Simulation Controls
            </h4>
            <p className="text-[11px] text-slate-400 font-mono">
              Trigger simulated telemetry anomalies to demonstrate AI adaptation
            </p>
          </div>
        </div>

        <span className="w-fit px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-mono font-bold border border-amber-500/30 tracking-wider">
          {isSimulationActive ? `SIMULATION: ${activeType}` : 'BASELINE AI ACTIVE'}
        </span>
      </div>

      {/* Action Buttons Grid (Dark Slate Pills with High-Contrast White Text & Color-Coded Icons) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-mono font-bold relative z-10">
        <button
          type="button"
          onClick={() => aiEngine.triggerSimulateDelay()}
          className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all shadow-xs cursor-pointer group"
        >
          <Radio className="w-4 h-4 text-amber-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-white">Simulate Delay</span>
        </button>

        <button
          type="button"
          onClick={() => aiEngine.triggerSimulateCrowdSurge()}
          className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all shadow-xs cursor-pointer group"
        >
          <Users className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-white">Crowd Surge</span>
        </button>

        <button
          type="button"
          onClick={() => aiEngine.triggerSimulateGpsAnomaly()}
          className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all shadow-xs cursor-pointer group"
        >
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-white">GPS Dropout</span>
        </button>

        <button
          type="button"
          onClick={() => aiEngine.triggerSimulateApiDegradation()}
          className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all shadow-xs cursor-pointer group"
        >
          <Cpu className="w-4 h-4 text-purple-400 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-white">API Spike</span>
        </button>

        <button
          type="button"
          onClick={() => aiEngine.resetSimulation()}
          className="col-span-2 sm:col-span-1 flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold border border-amber-400 shadow-md transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-slate-950 shrink-0" />
          <span>Reset AI</span>
        </button>
      </div>
    </div>
  );
}

export default AIDemoControls;
