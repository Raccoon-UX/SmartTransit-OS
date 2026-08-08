import React from 'react';
import { cn } from '../../utils/index.js';
import { STATUS_CONFIG } from './Badge.jsx';

/**
 * Real-time status dot with optional telemetry pulse wave
 */
export function StatusDot({ status = 'ONLINE', size = 'md', pulse = true, className = '' }) {
  const config = STATUS_CONFIG[status.toUpperCase()] || STATUS_CONFIG.ONLINE;

  const sizeMap = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3.5 h-3.5',
  };

  return (
    <span className={cn('relative inline-flex items-center justify-center', className)}>
      {pulse && config.pulse && (
        <span
          className={cn(
            'absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping',
            config.dotClass
          )}
        />
      )}
      <span className={cn('relative inline-flex rounded-full', config.dotClass, sizeMap[size] || sizeMap.md)} />
    </span>
  );
}

/**
 * Status Indicator with label and dot
 */
export function StatusIndicator({ status = 'ONLINE', label, size = 'md', pulse = true, className = '' }) {
  const config = STATUS_CONFIG[status.toUpperCase()] || STATUS_CONFIG.ONLINE;

  return (
    <div className={cn('inline-flex items-center space-x-2 text-left', className)}>
      <StatusDot status={status} size={size} pulse={pulse} />
      <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
        {label || config.label}
      </span>
    </div>
  );
}
