import React from 'react';
import { MoreHorizontal, Maximize2 } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Standard Analytics Card Frame for Charts, Heatmaps, and Time-series Graphs
 */
export function AnalyticsCard({
  title,
  subtitle,
  actionSlot,
  children,
  className = '',
  onExpand,
}) {
  return (
    <div
      className={cn(
        'p-5 rounded-2xl border transition-all duration-200 text-left',
        'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
        'shadow-sm dark:shadow-card',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center space-x-2">
          {actionSlot}
          {onExpand && (
            <button
              type="button"
              onClick={onExpand}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 focus:outline-none"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}

export default AnalyticsCard;
