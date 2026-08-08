import React from 'react';
import { Activity, Zap, ShieldAlert, RotateCcw, CheckCircle2, Server } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function TrafficSurgeSimulator({
  isSurgeActive,
  isScaledOut,
  onTriggerSurge,
  onTriggerScaleOut,
  onReset,
  className = '',
}) {
  return (
    <div
      className={cn(
        'p-6 sm:p-7 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-6',
        className
      )}
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-amber-500 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            Traffic Surge & Autoscaling Simulator
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
          DEMO CONTROL PANEL
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono">
        ⚡ <strong>Scalability Demonstration:</strong> Simulate a sudden 300% traffic surge across passenger apps to evaluate system capacity, load warning triggers, and autoscale recovery.
      </div>

      {/* Control Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        <button
          type="button"
          onClick={onTriggerSurge}
          disabled={isSurgeActive}
          className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 text-slate-900 font-extrabold flex flex-col items-center justify-center space-y-1 shadow-lg disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Zap className="w-6 h-6 text-slate-900" />
          <span>Simulate Traffic Surge</span>
          <span className="text-[10px] font-normal opacity-80">+300% User Traffic Spike</span>
        </button>

        <button
          type="button"
          onClick={onTriggerScaleOut}
          disabled={!isSurgeActive || isScaledOut}
          className="p-5 rounded-2xl bg-gradient-to-br from-transit-500 to-transit-700 text-white font-extrabold flex flex-col items-center justify-center space-y-1 shadow-lg disabled:opacity-50 hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Server className="w-6 h-6" />
          <span>Simulate Scale-Out</span>
          <span className="text-[10px] font-normal opacity-80">Add App Node (3 → 4 Nodes)</span>
        </button>

        <button
          type="button"
          onClick={onReset}
          className="p-5 rounded-2xl bg-slate-100 dark:bg-navy-850 hover:bg-slate-200 dark:hover:bg-navy-800 text-slate-700 dark:text-slate-300 font-bold flex flex-col items-center justify-center space-y-1 border border-slate-200 dark:border-slate-700 transition-all"
        >
          <RotateCcw className="w-6 h-6 text-slate-400" />
          <span>Reset Simulation</span>
          <span className="text-[10px] text-slate-400 font-normal">Restore Baseline State</span>
        </button>
      </div>

      {/* Simulation Feedback Banner */}
      {isSurgeActive && (
        <div
          className={cn(
            'p-4 rounded-2xl border text-xs font-mono space-y-1.5',
            isScaledOut
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-800 dark:text-amber-300'
          )}
        >
          <div className="font-bold uppercase flex items-center space-x-2">
            {isScaledOut ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldAlert className="w-4 h-4 text-amber-500" />}
            <span>{isScaledOut ? 'CAPACITY RECOVERED — SCALE-OUT EXECUTED' : 'CAPACITY THRESHOLD EXCEEDED'}</span>
          </div>
          <p>
            {isScaledOut
              ? 'Added +1 App Node (3 → 4 Nodes). CPU load normalized to 68%. Headroom increased by +33%.'
              : 'Active sessions spiked to 9,850. CPU load 92%. TelemetryWatcher recommends immediate Scale-Out.'}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrafficSurgeSimulator;
