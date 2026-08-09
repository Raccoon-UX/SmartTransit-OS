import React from 'react';
import { CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function ConfidenceBadge({ confidence = 90, level = 'HIGH', size = 'md', className = '' }) {
  const getLevelConfig = () => {
    if (level === 'HIGH' || confidence >= 85) {
      return {
        label: 'HIGH CONFIDENCE',
        badgeColor: 'bg-emerald-800 text-white border-emerald-900',
        icon: CheckCircle2,
      };
    }
    if (level === 'MEDIUM' || confidence >= 70) {
      return {
        label: 'MEDIUM CONFIDENCE',
        badgeColor: 'bg-amber-700 text-white border-amber-800',
        icon: AlertCircle,
      };
    }
    return {
      label: 'LOW CONFIDENCE',
      badgeColor: 'bg-rose-800 text-white border-rose-900',
      icon: HelpCircle,
    };
  };

  const config = getLevelConfig();
  const Icon = config.icon;

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px] space-x-1' : 'px-2.5 py-1 text-xs space-x-1.5';

  return (
    <div
      className={cn(
        'inline-flex items-center rounded font-mono font-bold border uppercase tracking-wider shadow-subtle',
        config.badgeColor,
        sizeClasses,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{config.label} ({confidence}%)</span>
    </div>
  );
}

export default ConfidenceBadge;
