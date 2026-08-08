import React from 'react';
import { Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function OccupancyIndicator({
  percent = 50,
  status,
  size = 'md',
  showBar = true,
  className = '',
}) {
  let effectiveStatus = status;
  if (!effectiveStatus) {
    if (percent < 50) effectiveStatus = 'LOW';
    else if (percent <= 75) effectiveStatus = 'MEDIUM';
    else if (percent <= 90) effectiveStatus = 'HIGH';
    else effectiveStatus = 'FULL';
  }

  const config = {
    LOW: {
      label: 'Low Occupancy (Seats Available)',
      short: 'Low Crowding',
      color: 'text-emerald-600 dark:text-emerald-400',
      barColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
      icon: CheckCircle2,
    },
    MEDIUM: {
      label: 'Moderate (Few Seats Left)',
      short: 'Moderate',
      color: 'text-cyan-600 dark:text-cyan-400',
      barColor: 'bg-cyan-500',
      badgeBg: 'bg-cyan-500/10 border-cyan-500/20',
      icon: Users,
    },
    HIGH: {
      label: 'High Occupancy (Standing Room Only)',
      short: 'High Crowding',
      color: 'text-amber-600 dark:text-amber-400',
      barColor: 'bg-amber-500',
      badgeBg: 'bg-amber-500/10 border-amber-500/20',
      icon: Users,
    },
    FULL: {
      label: 'Bus at Full Capacity',
      short: 'Bus Full',
      color: 'text-rose-600 dark:text-rose-400',
      barColor: 'bg-rose-500',
      badgeBg: 'bg-rose-500/10 border-rose-500/20',
      icon: AlertTriangle,
    },
  }[effectiveStatus] || config?.LOW;

  const Icon = config.icon;

  if (size === 'sm') {
    return (
      <span
        className={cn(
          'inline-flex items-center space-x-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border',
          config.color,
          config.badgeBg,
          className
        )}
        title={config.label}
      >
        <Icon className="w-3 h-3" />
        <span>{percent}% ({config.short})</span>
      </span>
    );
  }

  return (
    <div className={cn('space-y-1.5 text-left', className)} title={config.label}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5">
          <Icon className={cn('w-3.5 h-3.5', config.color)} />
          <span className="font-bold text-slate-800 dark:text-slate-200">{config.short}</span>
        </div>
        <span className={cn('font-mono font-extrabold text-xs', config.color)}>{percent}%</span>
      </div>

      {showBar && (
        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-navy-800 overflow-hidden">
          <div
            className={cn('h-full transition-all duration-300 rounded-full', config.barColor)}
            style={{ width: `${Math.min(100, Math.max(5, percent))}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default OccupancyIndicator;
