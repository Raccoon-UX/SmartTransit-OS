import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, Cpu, Activity } from 'lucide-react';
import { ConfidenceBadge } from './ConfidenceBadge.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function AnomalyCard({ anomaly, onAction }) {
  if (!anomaly) return null;

  const {
    id,
    entity,
    domain,
    type,
    title,
    description,
    severity,
    confidence,
    confidenceLevel,
    possibleCause,
    suggestedAction,
    status,
    detectedAt,
    relatedRoute,
  } = anomaly;

  const getSeverityBadgeVariant = (sev) => {
    switch (sev) {
      case 'CRITICAL':
        return 'critical';
      case 'HIGH':
        return 'warning';
      case 'MEDIUM':
        return 'accent';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <StatusBadge status={severity} label={severity} size="sm" variant={getSeverityBadgeVariant(severity)} />
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">
            {domain}
          </span>
          <span className="text-xs font-mono text-slate-400">ID: {id}</span>
        </div>
        <ConfidenceBadge confidence={confidence} level={confidenceLevel} size="sm" />
      </div>

      <div>
        <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans">{title}</h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-sans leading-relaxed">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300">
          <strong className="block text-[10px] uppercase font-bold text-amber-500">Possible Cause (AI Estimate)</strong>
          <span>{possibleCause}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-transit-500/10 border border-transit-500/20 text-transit-700 dark:text-transit-300">
          <strong className="block text-[10px] uppercase font-bold text-transit-500">Suggested Action</strong>
          <span>{suggestedAction}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400">Target: <strong className="text-slate-700 dark:text-slate-200">{entity}</strong></span>
          {relatedRoute && <span className="text-slate-400">• Route: <strong className="text-transit-500">{relatedRoute}</strong></span>}
        </div>
        <span className="text-slate-400">Detected {detectedAt}</span>
      </div>
    </div>
  );
}

export default AnomalyCard;
