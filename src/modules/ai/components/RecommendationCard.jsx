import React from 'react';
import { Sparkles, Check, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { ConfidenceBadge } from './ConfidenceBadge.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function RecommendationCard({ recommendation, onApprove, onReject }) {
  if (!recommendation) return null;

  const {
    id,
    title,
    category,
    categoryCode,
    reason,
    expectedImpact,
    confidence,
    confidenceLevel,
    priority,
    createdAt,
    status,
    targetEntity,
  } = recommendation;

  const getPriorityBadgeVariant = (prio) => {
    switch (prio) {
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

  const isPending = status === 'NEW' || status === 'REVIEWED';

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <StatusBadge status={priority} label={priority} size="sm" variant={getPriorityBadgeVariant(priority)} />
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">
            {category}
          </span>
          <span className="text-xs font-mono text-slate-400">ID: {id}</span>
        </div>
        <ConfidenceBadge confidence={confidence} level={confidenceLevel} size="sm" />
      </div>

      <div>
        <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans">{title}</h4>
        <div className="mt-2 space-y-1 text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800">
            <span className="text-slate-400 font-bold">Why: </span>
            <span className="text-slate-700 dark:text-slate-300">{reason}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
            <span className="text-emerald-500 font-bold">Expected Impact: </span>
            <span>{expectedImpact}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <span className="text-slate-400">Status:</span>
          <span className={cn(
            'font-bold px-2 py-0.5 rounded border',
            status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' :
            status === 'REJECTED' ? 'bg-rose-500/10 text-rose-500 border-rose-500/30' :
            'bg-amber-500/10 text-amber-500 border-amber-500/30'
          )}>
            {status}
          </span>
        </div>

        {isPending ? (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" leftIcon={X} onClick={() => onReject && onReject(id)} className="text-rose-500 hover:bg-rose-500/10">
              Reject
            </Button>
            <Button variant="primary" size="sm" leftIcon={Check} onClick={() => onApprove && onApprove(id)}>
              Approve Action
            </Button>
          </div>
        ) : (
          <span className="text-slate-400">Decision Recorded • {createdAt}</span>
        )}
      </div>
    </div>
  );
}

export default RecommendationCard;
