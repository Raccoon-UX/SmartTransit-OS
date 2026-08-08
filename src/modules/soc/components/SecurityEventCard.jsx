import React from 'react';
import { Shield, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function SecurityEventCard({ event, className = '' }) {
  if (!event) return null;

  const isHigh = event.severity === 'HIGH';
  const isWarning = event.severity === 'WARNING';

  return (
    <div className={cn('p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-start space-x-3 text-xs font-mono text-left', className)}>
      <span className={cn('px-2 py-0.5 rounded font-bold text-[10px]', isHigh ? 'bg-rose-500 text-white' : isWarning ? 'bg-amber-500 text-slate-900' : 'bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300')}>
        {event.severity}
      </span>

      <div className="flex-1 space-y-0.5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 dark:text-white font-sans">{event.eventType}</span>
          <span className="text-[10px] text-slate-400">{event.timestamp}</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{event.details}</p>
        <span className="text-[10px] text-slate-400 block font-normal">Source: {event.source}</span>
      </div>
    </div>
  );
}

export default SecurityEventCard;
