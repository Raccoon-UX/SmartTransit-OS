import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * SmartTransit OS — Standard Enterprise Metric / KPI Card
 * Displays label, large metric value, status badge (placed below value), and context subtitle with zero overflow.
 */
export function MetricCard({
  title,
  label,
  value,
  trend,
  trendDirection = 'up', // 'up' | 'down' | 'neutral'
  trendLabel = 'vs baseline',
  icon: Icon,
  accentColor = 'transit',
  sparklineSlot,
  className = '',
  onClick,
}) {
  const isClickable = Boolean(onClick);
  const cardTitle = title || label || 'Metric';

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-4 sm:p-5 rounded-2xl transition-all duration-200 text-left border relative overflow-hidden flex flex-col justify-between min-w-0 w-full box-border min-h-[148px]',
        'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md',
        isClickable && 'hover:border-transit-500/50 hover:shadow-glow-sm cursor-pointer hover:-translate-y-0.5',
        className
      )}
    >
      {/* Top Header Row: Label & Icon */}
      <div className="flex items-start justify-between gap-2 min-w-0 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate min-w-0 flex-1">
          {cardTitle}
        </span>
        {Icon && (
          <div className="p-2 rounded-xl bg-slate-100 dark:bg-navy-800 text-transit-500 dark:text-transit-400 shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Primary Metric Value */}
      <div className="min-w-0 mb-2">
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight leading-none break-words min-w-0">
          {value}
        </div>
      </div>

      {/* Status / Trend Badge (Placed BELOW Metric) */}
      {trend && (
        <div className="min-w-0 mb-3">
          <div
            className={cn(
              'inline-flex items-center space-x-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-full border max-w-full w-fit whitespace-normal break-words leading-tight',
              trendDirection === 'up'
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : trendDirection === 'down'
                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                : 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30'
            )}
          >
            {trendDirection === 'up' ? (
              <TrendingUp className="w-3 h-3 shrink-0" />
            ) : trendDirection === 'down' ? (
              <TrendingDown className="w-3 h-3 shrink-0" />
            ) : (
              <Minus className="w-3 h-3 shrink-0" />
            )}
            <span className="break-words min-w-0">{trend}</span>
          </div>
        </div>
      )}

      {/* Subtitle / Context Row */}
      <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800/80 min-w-0 mt-auto">
        <span className="truncate min-w-0 flex-1">{trendLabel}</span>
        {sparklineSlot && <div className="w-16 sm:w-20 h-6 shrink-0 min-w-0">{sparklineSlot}</div>}
      </div>
    </div>
  );
}

export default MetricCard;
