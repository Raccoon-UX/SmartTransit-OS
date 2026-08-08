import React from 'react';
import { Sparkles, ArrowRight, ShieldAlert, Cpu, Route, Users, CheckCircle2 } from 'lucide-react';
import { ConfidenceBadge } from './ConfidenceBadge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function AIInsightCard({
  title,
  summary,
  confidence = 90,
  confidenceLevel = 'HIGH',
  reason,
  actionLabel,
  onAction,
  variant = 'prediction', // 'prediction' | 'warning' | 'recommendation' | 'anomaly' | 'system'
  timestamp = 'Just now',
  className = '',
}) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'warning':
      case 'anomaly':
        return {
          bg: 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/30',
          badgeBg: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
          icon: ShieldAlert,
        };
      case 'recommendation':
        return {
          bg: 'bg-transit-500/5 dark:bg-transit-500/10 border-transit-500/30',
          badgeBg: 'bg-transit-500/20 text-transit-600 dark:text-transit-400',
          icon: Sparkles,
        };
      case 'system':
        return {
          bg: 'bg-indigo-500/5 dark:bg-indigo-500/10 border-indigo-500/30',
          badgeBg: 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400',
          icon: Cpu,
        };
      default:
        return {
          bg: 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/30',
          badgeBg: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
          icon: CheckCircle2,
        };
    }
  };

  const style = getVariantStyles();
  const Icon = style.icon;

  return (
    <div
      className={cn(
        'p-5 rounded-2xl border transition-all text-left space-y-3 relative overflow-hidden',
        'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 shadow-sm',
        style.bg,
        className
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <div className={cn('p-2 rounded-xl shrink-0', style.badgeBg)}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            DEMO AI INTELLIGENCE
          </span>
        </div>
        <ConfidenceBadge confidence={confidence} level={confidenceLevel} size="sm" className="shrink-0" />
      </div>

      <div>
        <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans">{title}</h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-sans leading-relaxed">{summary}</p>
      </div>

      {reason && (
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-navy-800/80 border border-slate-200 dark:border-slate-700/50 text-xs font-mono">
          <span className="text-slate-400 font-bold">Reason: </span>
          <span className="text-slate-700 dark:text-slate-200">{reason}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        <span className="text-[11px] font-mono text-slate-400">Generated {timestamp}</span>
        {actionLabel && (
          <Button variant="outline" size="sm" rightIcon={ArrowRight} onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}


export default AIInsightCard;
