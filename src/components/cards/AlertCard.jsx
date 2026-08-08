import React from 'react';
import { AlertCircle, AlertTriangle, AlertOctagon, Info, Bell, X } from 'lucide-react';
import { cn } from '../../utils/index.js';

export function AlertCard({
  severity = 'HIGH', // 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  title = 'Route RT-108 Delay Notice',
  message = 'Heavy traffic congestion along North Expressway causing a 12-minute delay.',
  timestamp = '2 mins ago',
  affectedRoute = 'RT-108',
  onDismiss,
  className = '',
}) {
  const getSeverityConfig = (level) => {
    switch (level.toUpperCase()) {
      case 'CRITICAL':
        return {
          icon: AlertOctagon,
          bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/80',
          textColor: 'text-rose-900 dark:text-rose-200',
          iconColor: 'text-rose-600 dark:text-rose-400',
          tag: 'CRITICAL ALERT',
          tagBg: 'bg-rose-600 text-white',
        };
      case 'HIGH':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/80',
          textColor: 'text-amber-900 dark:text-amber-200',
          iconColor: 'text-amber-600 dark:text-amber-400',
          tag: 'HIGH IMPACT',
          tagBg: 'bg-amber-500 text-white',
        };
      case 'MEDIUM':
      case 'LOW':
        return {
          icon: AlertCircle,
          bg: 'bg-blue-50 dark:bg-sky-950/40 border-blue-200 dark:border-sky-800/80',
          textColor: 'text-blue-900 dark:text-blue-200',
          iconColor: 'text-blue-600 dark:text-blue-400',
          tag: 'SERVICE UPDATE',
          tagBg: 'bg-transit-500 text-white',
        };
      default:
        return {
          icon: Info,
          bg: 'bg-slate-50 dark:bg-navy-900 border-slate-200 dark:border-slate-800',
          textColor: 'text-slate-900 dark:text-slate-200',
          iconColor: 'text-slate-600 dark:text-slate-400',
          tag: 'INFO',
          tagBg: 'bg-slate-700 text-white',
        };
    }
  };

  const config = getSeverityConfig(severity);
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'p-4 rounded-2xl border transition-all text-left relative',
        config.bg,
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 min-w-0">
        <div className="flex items-start space-x-3 min-w-0 flex-1">
          <div className={cn('p-2 rounded-xl mt-0.5 shrink-0', 'bg-white/80 dark:bg-navy-800', config.iconColor)}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className={cn('text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase shrink-0', config.tagBg)}>
                {config.tag}
              </span>
              {affectedRoute && (
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-white/70 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shrink-0">
                  {affectedRoute}
                </span>
              )}
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono shrink-0">{timestamp}</span>
            </div>
            <h4 className={cn('text-sm font-bold truncate', config.textColor)}>{title}</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed break-words">{message}</p>
          </div>
        </div>


        {onDismiss && (
          <button
            type="button"
            onClick={onDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

export default AlertCard;
