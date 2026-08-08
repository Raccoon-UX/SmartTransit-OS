import React from 'react';
import { Loader2, Activity } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Animated Pulse Skeleton Element
 */
export function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded bg-slate-200 dark:bg-navy-800',
        className
      )}
      {...props}
    />
  );
}

/**
 * Metric Card Skeleton
 */
export function MetricCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-32" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </div>
  );
}

/**
 * Transit Bus Card Skeleton
 */
export function BusCardSkeleton() {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-4 w-28" />
        </div>
        <Skeleton className="h-5 w-16 rounded-md" />
      </div>
      <Skeleton className="h-4 w-48" />
      <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

/**
 * Table Row Skeleton
 */
export function TableSkeleton({ rows = 5, cols = 4 }) {
  return (
    <div className="w-full space-y-3">
      <div className="flex space-x-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        {Array.from({ length: cols }).map((_, idx) => (
          <Skeleton key={idx} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, rIdx) => (
        <div key={rIdx} className="flex space-x-4 py-2 border-b border-slate-100 dark:border-slate-800/50">
          {Array.from({ length: cols }).map((_, cIdx) => (
            <Skeleton key={cIdx} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Centered Loading Spinner
 */
export function Spinner({ size = 'md', className = '' }) {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10',
  };

  return (
    <div className="flex items-center justify-center">
      <Loader2 className={cn('animate-spin text-transit-500', sizeMap[size] || sizeMap.md, className)} />
    </div>
  );
}

/**
 * Full Page Loading Overlay
 */
export function PageLoading({ message = 'Loading SmartTransit OS telemetry mesh...' }) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-transit-500/10 flex items-center justify-center text-transit-500 border border-transit-500/30">
          <Activity className="w-7 h-7 animate-pulse text-transit-400" />
        </div>
        <div className="absolute -inset-1 rounded-2xl border-2 border-transit-500/40 animate-ping pointer-events-none" />
      </div>
      <p className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">{message}</p>
    </div>
  );
}
