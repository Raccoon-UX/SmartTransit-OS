import React from 'react';
import { ShieldAlert, CheckCircle2, Clock, User, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function IncidentCard({
  incident,
  onUpdateStatus,
  className = '',
}) {
  if (!incident) return null;

  const isResolved = incident.status === 'RESOLVED';

  return (
    <div
      className={cn(
        'p-6 rounded-3xl bg-white dark:bg-navy-900 border shadow-sm text-left space-y-4 font-mono text-xs',
        isResolved ? 'border-slate-200 dark:border-slate-800' : 'border-amber-500/80',
        className
      )}
    >
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold text-xs">
            {incident.severity}
          </span>
          <span className="font-bold text-slate-400">{incident.id}</span>
        </div>
        <StatusBadge status={isResolved ? 'ONLINE' : 'WARNING'} label={incident.status} size="sm" />
      </div>

      <div>
        <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans">{incident.title}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono leading-relaxed">
          {incident.description}
        </p>
      </div>

      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Impact</span>
        <span className="font-bold text-slate-900 dark:text-white">{incident.currentImpact}</span>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
        <span className="text-slate-400">Responder: <strong className="text-slate-900 dark:text-white">{incident.assignedResponder}</strong></span>

        {!isResolved && (
          <div className="flex items-center space-x-2">
            {incident.status === 'DETECTED' && (
              <Button variant="outline" size="sm" onClick={() => onUpdateStatus(incident.id, 'INVESTIGATING')}>
                Begin Investigation
              </Button>
            )}
            {incident.status === 'INVESTIGATING' && (
              <Button variant="outline" size="sm" onClick={() => onUpdateStatus(incident.id, 'MITIGATING')}>
                Apply Mitigation
              </Button>
            )}
            {incident.status === 'MITIGATING' && (
              <Button variant="primary" size="sm" onClick={() => onUpdateStatus(incident.id, 'RESOLVED', 'Incident resolved. Latency normalized.')}>
                Mark Resolved
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default IncidentCard;
