import React, { useEffect, useState } from 'react';
import { Radio, RefreshCw } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Live Status Pulse with subtle border glow
 */
export function LiveStatusPulse({ label = 'LIVE TELEMETRY STREAM', className = '' }) {
  return (
    <div
      className={cn(
        'inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider',
        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30',
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span>{label}</span>
    </div>
  );
}

/**
 * Smooth ETA Countdown Timer Chip
 */
export function EtaCountdown({ initialSeconds = 240, className = '' }) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

  return (
    <div
      className={cn(
        'inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg font-mono font-bold text-xs',
        'bg-transit-500 text-white shadow-sm shadow-transit-500/20',
        className
      )}
    >
      <span>ETA:</span>
      <span className="tabular-nums">{formatted}</span>
    </div>
  );
}

/**
 * Visual flash indicator whenever real-time values update
 */
export function DataRefreshFlash({ isUpdating = false, children, className = '' }) {
  return (
    <div
      className={cn(
        'transition-all duration-300',
        isUpdating && 'bg-transit-500/20 ring-2 ring-transit-500/40 rounded-lg p-0.5',
        className
      )}
    >
      {children}
    </div>
  );
}
