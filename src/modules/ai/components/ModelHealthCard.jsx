import React from 'react';
import { Cpu, Activity, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function ModelHealthCard({
  name,
  status = 'READY', // 'READY' | 'DEGRADED' | 'OFFLINE' | 'TRAINING SIMULATION'
  latencyMs = 42,
  predictionsCount = 420,
  confidenceAvg = 91,
  lastInference = 'Just now',
}) {
  const getStatusVariant = (st) => {
    switch (st) {
      case 'READY':
        return 'success';
      case 'DEGRADED':
        return 'warning';
      case 'OFFLINE':
        return 'critical';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-transit-500/10 text-transit-500">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-900 dark:text-white font-sans">{name}</span>
        </div>
        <StatusBadge status={status} label={status} size="sm" variant={getStatusVariant(status)} />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-200/60 dark:border-slate-800 text-center font-mono">
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-navy-950">
          <div className="text-[10px] text-slate-400 uppercase">Avg Latency</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{latencyMs} ms</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-navy-950">
          <div className="text-[10px] text-slate-400 uppercase">Predictions</div>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-200">{predictionsCount}</div>
        </div>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-navy-950">
          <div className="text-[10px] text-slate-400 uppercase">Avg Confidence</div>
          <div className="text-sm font-bold text-emerald-500">{confidenceAvg}%</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
        <span>Last Inference: {lastInference}</span>
        <span>DEMO MODEL</span>
      </div>
    </div>
  );
}

export default ModelHealthCard;
