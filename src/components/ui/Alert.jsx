import React, { useState } from 'react';
import { AlertCircle, AlertTriangle, AlertOctagon, Info, CheckCircle2, X } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Standard Alert Banner with 5 severity modes
 */
export function Alert({
  severity = 'info', // 'info' | 'success' | 'warning' | 'critical' | 'emergency'
  title,
  children,
  onClose,
  className = '',
}) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  const getStyle = () => {
    switch (severity) {
      case 'success':
        return {
          icon: CheckCircle2,
          container: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200',
          iconColor: 'text-emerald-600 dark:text-emerald-400',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          container: 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200',
          iconColor: 'text-amber-600 dark:text-amber-400',
        };
      case 'critical':
      case 'emergency':
        return {
          icon: AlertOctagon,
          container: 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200',
          iconColor: 'text-rose-600 dark:text-rose-400',
        };
      default:
        return {
          icon: Info,
          container: 'bg-transit-500/10 border-transit-500/30 text-transit-900 dark:text-transit-200',
          iconColor: 'text-transit-600 dark:text-transit-400',
        };
    }
  };

  const config = getStyle();
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        'p-4 rounded-xl border flex items-start justify-between gap-3 text-left transition-all duration-200',
        config.container,
        className
      )}
    >
      <div className="flex items-start space-x-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.iconColor)} />
        <div>
          {title && <h4 className="text-sm font-bold tracking-tight mb-0.5">{title}</h4>}
          <div className="text-xs leading-relaxed opacity-90">{children}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleClose}
        className="p-1 rounded-lg opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default Alert;
