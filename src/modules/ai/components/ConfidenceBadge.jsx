import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function ConfidenceBadge({ confidence = 90, level = 'HIGH', size = 'md', className = '' }) {
  const getLevelConfig = () => {
    if (level === 'HIGH' || confidence >= 85) {
      return {
        label: 'HIGH CONFIDENCE',
        bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
        textColor: 'text-emerald-700 dark:text-emerald-300',
        borderColor: 'border-emerald-500/30',
        icon: CheckCircle2,
      };
    }
    if (level === 'MEDIUM' || confidence >= 70) {
      return {
        label: 'MEDIUM CONFIDENCE',
        bgColor: 'bg-amber-500/10 dark:bg-amber-500/20',
        textColor: 'text-amber-700 dark:text-amber-300',
        borderColor: 'border-amber-500/30',
        icon: AlertCircle,
      };
    }
    return {
      label: 'LOW CONFIDENCE',
      bgColor: 'bg-rose-500/10 dark:bg-rose-500/20',
      textColor: 'text-rose-700 dark:text-rose-300',
      borderColor: 'border-rose-500/30',
      icon: HelpCircle,
    };
  };

  const config = getLevelConfig();
  const Icon = config.icon;

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs space-x-1' : 'px-2.5 py-1 text-xs space-x-1.5';

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-mono font-bold border',
        config.bgColor,
        config.textColor,
        config.borderColor,
        sizeClasses,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label}</span>
      <span className="opacity-80">({confidence}%)</span>
    </div>
  );
}

export default ConfidenceBadge;
