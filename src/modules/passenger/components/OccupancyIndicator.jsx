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
      short: 'Seats Available',
      textColor: 'text-emerald-800 dark:text-emerald-300',
      barColor: 'bg-emerald-700',
      badgeBg: 'bg-emerald-800 text-white border-emerald-900',
      icon: CheckCircle2,
    },
    MEDIUM: {
      label: 'Moderate (Few Seats Left)',
      short: 'Moderate Capacity',
      textColor: 'text-[#0B3D91] dark:text-sky-300',
      barColor: 'bg-[#0B3D91]',
      badgeBg: 'bg-[#0B3D91] text-white border-[#07275f]',
      icon: Users,
    },
    HIGH: {
      label: 'High Occupancy (Standing Room Only)',
      short: 'Standing Only',
      textColor: 'text-amber-800 dark:text-amber-300',
      barColor: 'bg-amber-700',
      badgeBg: 'bg-amber-700 text-white border-amber-800',
      icon: Users,
    },
    FULL: {
      label: 'Bus at Full Capacity',
      short: 'Bus Full',
      textColor: 'text-rose-800 dark:text-rose-300',
      barColor: 'bg-rose-700',
      badgeBg: 'bg-rose-800 text-white border-rose-900',
      icon: AlertTriangle,
    },
  }[effectiveStatus] || {
    label: 'Low Occupancy (Seats Available)',
    short: 'Seats Available',
    textColor: 'text-emerald-800 dark:text-emerald-300',
    barColor: 'bg-emerald-700',
    badgeBg: 'bg-emerald-800 text-white border-emerald-900',
    icon: CheckCircle2,
  };

  const Icon = config.icon;

  if (size === 'sm') {
    return (
      <span
        className={cn(
          'inline-flex items-center space-x-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase shadow-subtle',
          config.badgeBg,
          className
        )}
        title={config.label}
      >
        <Icon className="w-3 h-3 shrink-0" />
        <span>{percent}% ({config.short})</span>
      </span>
    );
  }

  return (
    <div className={cn('space-y-1 text-left', className)} title={config.label}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5">
          <Icon className={cn('w-3.5 h-3.5 shrink-0', config.textColor)} />
          <span className="font-bold text-slate-900 dark:text-slate-100">{config.short}</span>
        </div>
        <span className={cn('font-mono font-bold text-xs', config.textColor)}>{percent}%</span>
      </div>

      {showBar && (
        <div className="w-full h-1.5 rounded bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className={cn('h-full transition-all duration-200 rounded', config.barColor)}
            style={{ width: `${Math.min(100, Math.max(5, percent))}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default OccupancyIndicator;
