import React from 'react';
import { StatusBadge } from '../ui/Badge.jsx';
import { cn } from '../../utils/index.js';

/**
 * Standard Status Card for Backend, Microservices, Databases, GPS Streamers
 */
export function StatusCard({
  serviceName,
  status = 'ONLINE',
  uptime = '99.98%',
  latency = '24ms',
  details,
  icon: Icon,
  className = '',
}) {
  return (
    <div
      className={cn(
        'p-5 rounded-2xl border transition-all duration-200 text-left',
        'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
        'shadow-sm dark:shadow-card',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-800 text-transit-500 dark:text-transit-400">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{serviceName}</h4>
            {details && <p className="text-xs text-slate-500 dark:text-slate-400">{details}</p>}
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs font-mono">
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">Uptime (30d)</span>
          <span className="font-semibold text-slate-700 dark:text-slate-200">{uptime}</span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px] uppercase">Latency</span>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">{latency}</span>
        </div>
      </div>
    </div>
  );
}

export default StatusCard;
