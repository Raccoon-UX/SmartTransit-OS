import React from 'react';
import { cn } from '../../utils/index.js';

/**
 * Route Waypoint Node for stop lists and map legends
 */
export function WaypointNode({
  stopName,
  stopCode,
  isCurrent = false,
  isPassed = false,
  isDestination = false,
  eta,
  className = '',
}) {
  return (
    <div className={cn('flex items-start space-x-3 text-left relative group', className)}>
      {/* Waypoint circle */}
      <div className="relative flex flex-col items-center mt-1">
        <div
          className={cn(
            'w-3.5 h-3.5 rounded-full border-2 transition-all',
            isCurrent
              ? 'bg-transit-500 border-white dark:border-navy-950 ring-4 ring-transit-500/30'
              : isPassed
              ? 'bg-slate-400 border-slate-300 dark:border-slate-700'
              : isDestination
              ? 'bg-emerald-500 border-white dark:border-navy-950'
              : 'bg-white dark:bg-navy-900 border-slate-400 dark:border-slate-600'
          )}
        />
      </div>

      {/* Stop details */}
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'text-xs font-semibold',
              isCurrent
                ? 'text-transit-600 dark:text-transit-400 font-bold'
                : isPassed
                ? 'text-slate-400 dark:text-slate-500'
                : 'text-slate-800 dark:text-slate-200'
            )}
          >
            {stopName}
          </span>
          {eta && (
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {eta}
            </span>
          )}
        </div>
        {stopCode && <span className="text-[10px] font-mono text-slate-400">{stopCode}</span>}
      </div>
    </div>
  );
}

/**
 * Traffic Congestion Indicator Bar
 */
export function TrafficSegment({ level = 'SMOOTH' }) {
  const getTraffic = () => {
    switch (level) {
      case 'HEAVY':
        return 'bg-rose-500 text-rose-100';
      case 'MODERATE':
        return 'bg-amber-500 text-amber-100';
      default:
        return 'bg-emerald-500 text-emerald-100';
    }
  };

  return <div className={cn('h-1.5 w-full rounded-full transition-all', getTraffic())} />;
}
