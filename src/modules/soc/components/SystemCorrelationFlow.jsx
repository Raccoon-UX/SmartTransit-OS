import React from 'react';
import { ArrowRight, Activity, Zap, Server, ShieldCheck } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function SystemCorrelationFlow({ isSurgeActive, isScaledOut, className = '' }) {
  return (
    <div className={cn('p-6 sm:p-7 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-5', className)}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            System Telemetry Correlation Flow
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Visual dependency pipeline demonstrating how traffic surges correlate across platform layers.
          </p>
        </div>
        <span className="text-[10px] font-mono font-bold text-transit-500">REALTIME CORRELATION</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">1. Traffic Ingestion</span>
          <div className="font-bold text-slate-900 dark:text-white font-sans">{isSurgeActive ? '9,850 Users (+300%)' : '8,451 Connected Users'}</div>
          <span className="text-[10px] text-slate-400 block">CDN Edge Filters Active</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">2. Cluster CPU Load</span>
          <div className={cn('font-bold text-sm', isSurgeActive && !isScaledOut ? 'text-amber-500' : 'text-emerald-500')}>
            {isSurgeActive && !isScaledOut ? '92% CPU (High Load)' : isScaledOut ? '68% CPU (Scaled)' : '63% CPU (Normal)'}
          </div>
          <span className="text-[10px] text-slate-400 block">3 App Nodes Active</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">3. API Latency Impact</span>
          <div className={cn('font-bold text-sm', isSurgeActive && !isScaledOut ? 'text-amber-500' : 'text-cyan-500')}>
            {isSurgeActive && !isScaledOut ? '145 ms (Elevated)' : '14 ms (Optimal)'}
          </div>
          <span className="text-[10px] text-slate-400 block">API Gateway Response</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">4. Scalability Action</span>
          <div className="font-bold text-emerald-500">
            {isScaledOut ? 'Auto Scale-Out Executed' : isSurgeActive ? 'Scale-Out Recommended' : 'Headroom Normal'}
          </div>
          <span className="text-[10px] text-slate-400 block">{isScaledOut ? '4 Nodes Active (+33%)' : 'Standby Pool Ready'}</span>
        </div>
      </div>
    </div>
  );
}

export default SystemCorrelationFlow;
