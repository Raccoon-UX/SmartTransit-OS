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
  MinusCircle,
  Ban
} from 'lucide-react';
import { cn } from '../../utils/index.js';

export const STATUS_CONFIG = {
  LIVE: {
    label: 'LIVE',
    icon: Radio,
    badgeClasses: 'bg-emerald-800 dark:bg-emerald-500/20 text-white dark:text-emerald-300 border-emerald-900 dark:border-emerald-500/40',
    dotClass: 'bg-emerald-400',
    pulse: false,
  },
  ONLINE: {
    label: 'ONLINE',
    icon: Wifi,
    badgeClasses: 'bg-emerald-800 dark:bg-emerald-500/20 text-white dark:text-emerald-300 border-emerald-900 dark:border-emerald-500/40',
    dotClass: 'bg-emerald-400',
    pulse: false,
  },
  OFFLINE: {
    label: 'OFFLINE',
    icon: WifiOff,
    badgeClasses: 'bg-slate-700 dark:bg-slate-800 text-white dark:text-slate-300 border-slate-800 dark:border-slate-700',
    dotClass: 'bg-slate-400',
    pulse: false,
  },
  DELAYED: {
    label: 'DELAYED',
    icon: Clock,
    badgeClasses: 'bg-amber-700 dark:bg-amber-500/20 text-white dark:text-amber-300 border-amber-800 dark:border-amber-500/40',
    dotClass: 'bg-amber-300',
    pulse: false,
  },
  APPROACHING: {
    label: 'APPROACHING',
    icon: Navigation,
    badgeClasses: 'bg-blue-800 dark:bg-sky-500/20 text-white dark:text-sky-300 border-blue-900 dark:border-sky-500/40',
    dotClass: 'bg-blue-300',
    pulse: false,
  },
  MAINTENANCE: {
    label: 'MAINTENANCE',
    icon: Wrench,
    badgeClasses: 'bg-slate-700 dark:bg-slate-800 text-white dark:text-slate-300 border-slate-800 dark:border-slate-700',
    dotClass: 'bg-slate-300',
    pulse: false,
  },
  WARNING: {
    label: 'WARNING',
    icon: AlertTriangle,
    badgeClasses: 'bg-amber-700 dark:bg-amber-500/20 text-white dark:text-amber-300 border-amber-800 dark:border-amber-500/40',
    dotClass: 'bg-amber-300',
    pulse: false,
  },
  CRITICAL: {
    label: 'CRITICAL',
    icon: AlertOctagon,
    badgeClasses: 'bg-rose-800 dark:bg-rose-500/20 text-white dark:text-rose-300 border-rose-900 dark:border-rose-500/40',
    dotClass: 'bg-rose-300',
    pulse: false,
  },
  RESOLVED: {
    label: 'RESOLVED',
    icon: CheckCircle2,
    badgeClasses: 'bg-emerald-800 dark:bg-emerald-500/20 text-white dark:text-emerald-300 border-emerald-900 dark:border-emerald-500/40',
    dotClass: 'bg-emerald-400',
    pulse: false,
  },
  ACTIVE: {
    label: 'ACTIVE',
    icon: Activity,
    badgeClasses: 'bg-[#0B3D91] dark:bg-sky-500/20 text-white dark:text-sky-300 border-[#07275f] dark:border-sky-500/40',
    dotClass: 'bg-blue-300',
    pulse: false,
  },
  INACTIVE: {
    label: 'INACTIVE',
    icon: MinusCircle,
    badgeClasses: 'bg-slate-700 dark:bg-slate-800 text-white dark:text-slate-300 border-slate-800 dark:border-slate-700',
    dotClass: 'bg-slate-400',
    pulse: false,
  },
  SUSPENDED: {
    label: 'SUSPENDED',
    icon: Ban,
    badgeClasses: 'bg-rose-800 dark:bg-rose-500/20 text-white dark:text-rose-300 border-rose-900 dark:border-rose-500/40',
    dotClass: 'bg-rose-400',
    pulse: false,
  },
  IDLE: {
    label: 'IDLE',
    icon: MinusCircle,
    badgeClasses: 'bg-slate-700 dark:bg-slate-800 text-white dark:text-slate-300 border-slate-800 dark:border-slate-700',
    dotClass: 'bg-slate-400',
    pulse: false,
  },
};

/**
 * Government Digital Service Flat Badge Component
 */
export function Badge({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon: Icon,
  className = '' 
}) {
  const variantStyles = {
    primary: 'bg-[#0B3D91] dark:bg-sky-500/20 text-white dark:text-sky-300 border-[#07275f] dark:border-sky-500/40',
    secondary: 'bg-slate-700 dark:bg-slate-800 text-white dark:text-slate-300 border-slate-800 dark:border-slate-700',
    accent: 'bg-[#0B3D91] dark:bg-sky-500/20 text-white dark:text-sky-300 border-[#07275f] dark:border-sky-500/40',
    success: 'bg-emerald-800 dark:bg-emerald-500/20 text-white dark:text-emerald-300 border-emerald-900 dark:border-emerald-500/40',
    warning: 'bg-amber-700 dark:bg-amber-500/20 text-white dark:text-amber-300 border-amber-800 dark:border-amber-500/40',
    critical: 'bg-rose-800 dark:bg-rose-500/20 text-white dark:text-rose-300 border-rose-900 dark:border-rose-500/40',
    info: 'bg-blue-800 dark:bg-sky-500/20 text-white dark:text-sky-300 border-blue-900 dark:border-sky-500/40',
    neutral: 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700',
  };

  const sizeStyles = {
    sm: 'text-[10px] font-mono px-2 py-0.5 space-x-1',
    md: 'text-xs font-mono px-2.5 py-0.5 space-x-1.5',
    lg: 'text-xs font-mono px-3 py-1 space-x-1.5',
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center font-bold rounded border uppercase tracking-wider whitespace-nowrap shadow-subtle',
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}

/**
 * Status Badge Component for Live Operational States
 */
export function StatusBadge({ 
  status = 'ONLINE', 
  showIcon = true,
  customLabel,
  size = 'md', 
  className = '' 
}) {
  const config = STATUS_CONFIG[status.toUpperCase()] || STATUS_CONFIG.ONLINE;
  const Icon = config.icon;
  const displayLabel = customLabel || config.label;

  const sizeStyles = {
    sm: 'text-[10px] font-mono px-2 py-0.5 space-x-1',
    md: 'text-xs font-mono px-2.5 py-0.5 space-x-1.5',
    lg: 'text-xs font-mono px-3 py-1 space-x-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded border uppercase tracking-wider whitespace-nowrap shadow-subtle',
        config.badgeClasses,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      {showIcon && Icon && <Icon className="w-3 h-3 shrink-0" />}
      <span>{displayLabel}</span>
    </span>
  );
}

export default Badge;
