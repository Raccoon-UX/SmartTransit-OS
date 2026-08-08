import React from 'react';
import { Server, Activity, AlertTriangle } from 'lucide-react';
import { ProgressBar } from '../../../components/dataviz/ProgressBar.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function ServerHealthCard({ server, className = '' }) {
  if (!server) return null;

  const isWarning = server.status === 'WARNING';

  return (
    <div
      className={cn(
        'p-5 rounded-3xl bg-white dark:bg-navy-900 border shadow-sm text-left space-y-4 font-mono text-xs',
        isWarning ? 'border-amber-500/80' : 'border-slate-200 dark:border-slate-800',
        className
      )}
    >
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Server className="w-4 h-4 text-transit-500" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{server.name}</h4>
        </div>
        <StatusBadge status={server.status} size="sm" />
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold uppercase text-[10px]">CPU Utilization</span>
            <span className={cn('font-bold', server.cpuPercent > 80 ? 'text-amber-500' : 'text-slate-900 dark:text-white')}>{server.cpuPercent}%</span>
          </div>
          <ProgressBar progress={server.cpuPercent} color={server.cpuPercent > 80 ? '#f59e0b' : '#0c87eb'} height={6} />
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Memory Load</span>
            <span className="font-bold text-slate-900 dark:text-white">{server.ramPercent}%</span>
          </div>
          <ProgressBar progress={server.ramPercent} color="#06b6d4" height={6} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
        <div>
          <span className="text-slate-400 block uppercase font-bold">Throughput</span>
          <span className="font-bold text-slate-900 dark:text-white">{server.requestsPerSec} req/s</span>
        </div>
        <div>
          <span className="text-slate-400 block uppercase font-bold">Connections</span>
          <span className="font-bold text-slate-900 dark:text-white">{server.connections}</span>
        </div>
      </div>
    </div>
  );
}

export default ServerHealthCard;
