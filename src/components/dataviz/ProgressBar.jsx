import React from 'react';
import { cn } from '../../utils/index.js';

/**
 * Standard Reusable Progress & Capacity Bar
 */
export function ProgressBar({
  value = 50, // 0 - 100
  max = 100,
  variant = 'transit', // 'transit' | 'success' | 'warning' | 'critical'
  size = 'md', // 'sm' | 'md' | 'lg'
  label,
  showValue = true,
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantStyles = {
    transit: 'bg-transit-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    critical: 'bg-rose-500',
  };

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full space-y-1.5 text-left', className)}>
      {(label || showValue) && (
        <div className="flex justify-between text-xs font-mono">
          {label && <span className="font-semibold text-slate-700 dark:text-slate-300">{label}</span>}
          {showValue && (
            <span className="text-slate-500 dark:text-slate-400">
              {Math.round(percentage)}% ({value}/{max})
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full rounded-full bg-slate-200 dark:bg-navy-800 overflow-hidden', heightStyles[size] || heightStyles.md)}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', variantStyles[variant] || variantStyles.transit)}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
