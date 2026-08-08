import React from 'react';
import { Radio, Activity, Navigation } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function GpsHealthCard({ gpsData, className = '' }) {
  if (!gpsData) return null;

  return (
    <div className={cn('p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4 font-mono text-xs', className)}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-emerald-500 animate-pulse" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">GPS Telemetry Stream Pipeline</h4>
        </div>
        <span className="text-[10px] font-bold text-emerald-500">● {gpsData.streamHealth}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Vehicles</span>
          <span className="text-lg font-extrabold text-slate-900 dark:text-white">{gpsData.activeVehicles}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Events / Sec</span>
          <span className="text-lg font-extrabold text-transit-500">{gpsData.eventsPerSec.toLocaleString()}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Avg Stream Latency</span>
          <span className="text-lg font-extrabold text-cyan-500">{gpsData.avgLatencyMs} ms</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Dropped Packets</span>
          <span className="text-lg font-extrabold text-emerald-500">{gpsData.droppedPercent}%</span>
        </div>
      </div>
    </div>
  );
}

export default GpsHealthCard;
