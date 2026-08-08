import React from 'react';
import { Radio, Activity, Wifi, ShieldCheck } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function VehicleStatusCard({ diagnostics, className = '' }) {
  if (!diagnostics) return null;

  return (
    <div
      className={cn(
        'p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-2',
        className
      )}
    >
      <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 uppercase">
        <span>Vehicle Telemetry Diagnostics</span>
        <span className="text-emerald-500 flex items-center space-x-1">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>Simulated Sensors Active</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400">GPS Signal</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">{diagnostics.gpsStatus}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400">Engine Systems</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">{diagnostics.engineStatus}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400">Network Link</span>
          <span className="font-bold text-cyan-600 dark:text-cyan-400">{diagnostics.networkStatus}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <span className="text-slate-500 dark:text-slate-400">SOC Sync</span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">{diagnostics.tripSync}</span>
        </div>
      </div>
    </div>
  );
}

export default VehicleStatusCard;
