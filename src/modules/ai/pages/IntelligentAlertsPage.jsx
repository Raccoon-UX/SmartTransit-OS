import React, { useState, useEffect } from 'react';
import { Bell, Check, X, ShieldAlert, Sparkles, Send } from 'lucide-react';
import { alertIntelligenceService } from '../../../services/ai/alertIntelligenceService.js';
import { ConfidenceBadge } from '../components/ConfidenceBadge.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function IntelligentAlertsPage() {
  const [data, setData] = useState({ alerts: [] });

  useEffect(() => {
    const unsub = alertIntelligenceService.subscribe(setData);
    return () => unsub();
  }, []);

  const handleApprove = (id) => {
    alertIntelligenceService.updateAlertStatus(id, 'APPROVED');
  };

  const handleReject = (id) => {
    alertIntelligenceService.updateAlertStatus(id, 'REJECTED');
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Bell className="w-3.5 h-3.5" />
            <span>INTELLIGENT ALERT DRAFTING ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Intelligent Transit Draft Advisories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            AI detects operational impacts and drafts advisories requiring explicit Transport Admin approval.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {data.alerts.map((alt) => {
          const isPending = alt.status === 'DRAFT_PENDING_REVIEW';
          return (
            <div key={alt.id} className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-2">
                  <StatusBadge status={alt.severity} label={alt.severity} size="sm" variant={alt.severity === 'CRITICAL' ? 'critical' : 'warning'} />
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200 dark:border-slate-700">
                    {alt.routeId}
                  </span>
                  <span className="text-xs font-mono text-slate-400">ID: {alt.id}</span>
                </div>
                <ConfidenceBadge confidence={alt.confidence} level={alt.confidenceLevel} size="sm" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">{alt.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-sans leading-relaxed p-3 rounded-xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-800 font-mono">
                  "{alt.message}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 font-bold">
                  Predicted Delay: +{alt.predictedDelayMin} mins
                </div>
                <div className="p-2.5 rounded-xl bg-transit-500/10 border border-transit-500/20 text-transit-600 dark:text-transit-400 font-bold">
                  Affected Stops: {alt.affectedStopsCount} terminals
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/60 dark:border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Status: <strong className="text-amber-500">{alt.status}</strong></span>
                {isPending ? (
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" leftIcon={X} onClick={() => handleReject(alt.id)} className="text-rose-500 hover:bg-rose-500/10">
                      Reject Draft
                    </Button>
                    <Button variant="primary" size="sm" leftIcon={Send} onClick={() => handleApprove(alt.id)}>
                      Approve & Publish to Admin Alerts
                    </Button>
                  </div>
                ) : (
                  <span className="text-emerald-500 font-bold">Status: {alt.status}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IntelligentAlertsPage;
