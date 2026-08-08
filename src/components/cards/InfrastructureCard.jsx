import React from 'react';
import { Cpu, Server, Database, Wifi, Activity } from 'lucide-react';
import { StatusBadge } from '../ui/Badge.jsx';
import { cn } from '../../utils/index.js';

export function InfrastructureCard({
  resourceName = 'Core Telemetry Ingestion Node',
  type = 'CPU', // 'CPU' | 'RAM' | 'DATABASE' | 'WEBSOCKET' | 'API'
  utilizationPercent = 42,
  status = 'ONLINE',
  throughput = '14.2k msgs/sec',
  allocated = '4 / 8 vCPU (50%)',
  className = '',
}) {
  const getTypeIcon = () => {
    switch (type) {
      case 'CPU':
        return Cpu;
      case 'RAM':
        return Activity;
      case 'DATABASE':
        return Database;
      case 'WEBSOCKET':
        return Wifi;
      default:
        return Server;
    }
  };

  const Icon = getTypeIcon();

  const getBarColor = (pct) => {
    if (pct < 60) return 'bg-emerald-500';
    if (pct < 85) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div
      className={cn(
        'p-5 rounded-2xl border transition-all text-left',
        'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
        'shadow-sm dark:shadow-card',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-navy-800 text-transit-500 dark:text-transit-400">
            <Icon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{type}</h4>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">{resourceName}</span>
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>

      {/* Progress Meter */}
      <div className="space-y-1.5 my-3">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-slate-500 dark:text-slate-400">Load Utilization</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{utilizationPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-navy-800 overflow-hidden">
          <div
            className={cn('h-full transition-all duration-500 rounded-full', getBarColor(utilizationPercent))}
            style={{ width: `${utilizationPercent}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono text-slate-500 dark:text-slate-400">
        <div>
          <span>Throughput: </span>
          <strong className="text-slate-800 dark:text-slate-200">{throughput}</strong>
        </div>
        <div>
          <span>Capacity: </span>
          <strong className="text-slate-800 dark:text-slate-200">{allocated}</strong>
        </div>
      </div>
    </div>
  );
}

export default InfrastructureCard;
