import React from 'react';
import { Layers, RotateCcw, AlertTriangle } from 'lucide-react';
import { Button } from './Button.jsx';
import { cn } from '../../utils/index.js';

/**
 * Standard Reusable Empty State
 */
export function EmptyState({
  icon: Icon = Layers,
  title = 'No Transit Data Available',
  description = 'No active vehicles or routes match the specified query filters.',
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <div
      className={cn(
        'p-8 sm:p-12 rounded-2xl border text-center flex flex-col items-center justify-center space-y-4',
        'bg-slate-50/50 dark:bg-navy-900/40 border-dashed border-slate-300 dark:border-slate-800',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-slate-200/80 dark:bg-navy-800 text-slate-500 dark:text-slate-400 flex items-center justify-center">
        <Icon className="w-6 h-6" />
      </div>

      <div className="max-w-sm space-y-1">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
      </div>

      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

/**
 * Standard Error & Retry State
 */
export function ErrorState({
  title = 'Telemetry Stream Disrupted',
  message = 'Failed to synchronize with city transit telemetry gateway.',
  onRetry,
  className = '',
}) {
  return (
    <div
      className={cn(
        'p-8 rounded-2xl border text-center flex flex-col items-center justify-center space-y-4',
        'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6" />
      </div>

      <div className="max-w-sm space-y-1">
        <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">{title}</h4>
        <p className="text-xs text-rose-700 dark:text-rose-400">{message}</p>
      </div>

      {onRetry && (
        <Button variant="destructive" size="sm" leftIcon={RotateCcw} onClick={onRetry}>
          Reconnect Telemetry
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
