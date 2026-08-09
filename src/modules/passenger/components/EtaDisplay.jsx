import React from 'react';
import { Clock, Radio } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function EtaDisplay({ eta = '3 min', size = 'md', className = '' }) {
  const isArriving = eta.toLowerCase().includes('arriving') || eta.toLowerCase().includes('1 min') || eta.toLowerCase().includes('2 min');
  const isDelayed = eta.toLowerCase().includes('delayed') || eta.toLowerCase().includes('late');

  let badgeColor = 'bg-[#0B3D91] text-white border-[#07275f]';
  if (isArriving) {
    badgeColor = 'bg-emerald-800 text-white border-emerald-900';
  } else if (isDelayed) {
    badgeColor = 'bg-rose-800 text-white border-rose-900';
  }

  if (size === 'sm') {
    return (
      <span className={cn('inline-flex items-center space-x-1 px-2 py-0.5 rounded font-mono text-[11px] font-bold border shadow-subtle', badgeColor, className)}>
        {isArriving ? <Radio className="w-3 h-3 shrink-0" /> : <Clock className="w-3 h-3 shrink-0" />}
        <span>{eta}</span>
      </span>
    );
  }

  return (
    <div className={cn('inline-flex items-center space-x-1.5 px-3 py-1 rounded font-mono text-xs font-bold border shadow-subtle', badgeColor, className)}>
      {isArriving ? <Radio className="w-3.5 h-3.5 shrink-0" /> : <Clock className="w-3.5 h-3.5 shrink-0" />}
      <span>ETA: {eta}</span>
    </div>
  );
}

export default EtaDisplay;
