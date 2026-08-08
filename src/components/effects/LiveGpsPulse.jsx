import React from 'react';
import { cn } from '../../utils/index.js';

/**
 * Live GPS Pulse Beacon for vehicle tracking and live coordinates
 */
export function LiveGpsPulse({ color = 'transit', size = 'md', className = '' }) {
  const colorMap = {
    transit: 'bg-transit-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
  };

  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const activeColor = colorMap[color] || colorMap.transit;

  return (
    <span className={cn('relative inline-flex items-center justify-center', className)}>
      <span className={cn('absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping', activeColor)} />
      <span className={cn('relative inline-flex rounded-full', activeColor, sizeMap[size] || sizeMap.md)} />
    </span>
  );
}

export default LiveGpsPulse;
