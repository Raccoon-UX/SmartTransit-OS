import React from 'react';
import { Clock, Radio, AlertTriangle } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function EtaDisplay({ eta = '3 min', size = 'md', className = '' }) {
  const isArriving = eta.toLowerCase().includes('arriving') || eta.toLowerCase().includes('1 min') || eta.toLowerCase().includes('2 min');
  const isDelayed = eta.toLowerCase().includes('delayed') || eta.toLowerCase().includes('late');

  let badgeColor = 'bg-transit-500/10 text-transit-600 dark:text-transit-400 border-transit-500/20';
  if (isArriving) {
    badgeColor = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
  } else if (isDelayed) {
    badgeColor = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';
  }

  if (size === 'sm') {
    return (
      <span className={cn('inline-flex items-center space-x-1 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold border', badgeColor, className)}>
        {isArriving ? <Radio className="w-3 h-3 animate-pulse text-emerald-500" /> : <Clock className="w-3 h-3" />}
        <span>{eta}</span>
      </span>
    );
  }

  return (
    <div className={cn('inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl font-mono text-sm font-extrabold border shadow-sm', badgeColor, className)}>
      {isArriving ? <Radio className="w-4 h-4 animate-pulse text-emerald-500" /> : <Clock className="w-4 h-4" />}
      <span>{eta}</span>
    </div>
  );
}

export default EtaDisplay;
