import React from 'react';
import { 
  Radio, 
  Wifi, 
  WifiOff, 
  Clock, 
  Navigation, 
  Wrench, 
  AlertTriangle, 
  AlertOctagon, 
  CheckCircle2, 
  Activity, 
  MinusCircle 
} from 'lucide-react';
import { cn } from '../../utils/index.js';

export const STATUS_CONFIG = {
  LIVE: {
    label: 'LIVE',
    icon: Radio,
    badgeClasses: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    dotClass: 'bg-emerald-500',
    pulse: true,
  },
  ONLINE: {
    label: 'ONLINE',
    icon: Wifi,
    badgeClasses: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    dotClass: 'bg-emerald-500',
    pulse: true,
  },
  OFFLINE: {
    label: 'OFFLINE',
    icon: WifiOff,
    badgeClasses: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/30',
    dotClass: 'bg-slate-400',
    pulse: false,
  },
  DELAYED: {
    label: 'DELAYED',
    icon: Clock,
    badgeClasses: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    dotClass: 'bg-amber-500',
    pulse: true,
  },
  APPROACHING: {
    label: 'APPROACHING',
    icon: Navigation,
    badgeClasses: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    dotClass: 'bg-cyan-500',
    pulse: true,
  },
  MAINTENANCE: {
    label: 'MAINTENANCE',
    icon: Wrench,
    badgeClasses: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    dotClass: 'bg-purple-500',
    pulse: false,
  },
  WARNING: {
    label: 'WARNING',
    icon: AlertTriangle,
    badgeClasses: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    dotClass: 'bg-amber-500',
    pulse: false,
  },
  CRITICAL: {
    label: 'CRITICAL',
    icon: AlertOctagon,
    badgeClasses: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    dotClass: 'bg-rose-500',
    pulse: true,
  },
  RESOLVED: {
    label: 'RESOLVED',
    icon: CheckCircle2,
    badgeClasses: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    dotClass: 'bg-emerald-500',
    pulse: false,
  },
  ACTIVE: {
    label: 'ACTIVE',
    icon: Activity,
    badgeClasses: 'bg-transit-500/10 text-transit-600 dark:text-transit-400 border-transit-500/30',
    dotClass: 'bg-transit-500',
    pulse: true,
  },
  INACTIVE: {
    label: 'INACTIVE',
    icon: MinusCircle,
    badgeClasses: 'bg-slate-500/10 text-slate-500 dark:text-slate-400 border-slate-500/30',
    dotClass: 'bg-slate-500',
    pulse: false,
  },
};

/**
 * Standard Reusable Badge Component
 */
export function Badge({ 
  children, 
  variant = 'neutral', 
  size = 'md', 
  icon: Icon, 
  className = '' 
}) {
  const variantStyles = {
    neutral: 'bg-slate-100 dark:bg-navy-850 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700',
    primary: 'bg-transit-500/10 text-transit-600 dark:text-transit-300 border-transit-500/30',
    accent: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30',
    critical: 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/30',
  };

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5 rounded gap-1',
    md: 'text-xs px-2.5 py-0.75 rounded-md gap-1.5',
    lg: 'text-sm px-3 py-1 rounded-lg gap-2 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border font-mono font-semibold tracking-wide uppercase',
        variantStyles[variant] || variantStyles.neutral,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}

/**
 * Semantic Status Badge for Bus, Driver, Stop, Server states
 */
export function StatusBadge({ status = 'ONLINE', size = 'md', showIcon = true, customLabel, className = '' }) {
  const config = STATUS_CONFIG[status.toUpperCase()] || STATUS_CONFIG.ONLINE;
  const Icon = config.icon;

  const sizeStyles = {
    sm: 'text-[10px] px-2 py-0.5 rounded gap-1',
    md: 'text-xs px-2.5 py-1 rounded-md gap-1.5',
    lg: 'text-sm px-3 py-1.5 rounded-lg gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border font-mono font-semibold uppercase tracking-wider',
        config.badgeClasses,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dotClass, config.pulse && 'telemetry-live')} />
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      <span>{customLabel || config.label}</span>
    </span>
  );
}

export default Badge;
