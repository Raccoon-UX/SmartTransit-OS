import React from 'react';
import { cn } from '../../utils/index.js';

/**
 * Clean SVG Donut Gauge for Occupancy, CPU, and Battery status
 */
export function GaugeDonut({
  value = 65, // 0 - 100
  size = 80,
  strokeWidth = 8,
  color = '#0c87eb',
  trackColor,
  label,
  sublabel,
  className = '',
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, value)) / 100) * circumference;

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className={cn('text-slate-200 dark:text-navy-800', trackColor)}
        />
        {/* Fill circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm font-bold text-slate-900 dark:text-white font-mono leading-none">
          {label !== undefined ? label : `${Math.round(value)}%`}
        </span>
        {sublabel && (
          <span className="text-[9px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 uppercase">
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}

export default GaugeDonut;
