import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { securityService } from '../../../services/soc/securityService.js';
import { SecurityEventCard } from '../components/SecurityEventCard.jsx';

export function SecurityPage() {
  const [events] = useState(() => securityService.getSecurityEvents());
  const [metrics] = useState(() => securityService.getSecurityMetrics());

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-mono font-bold mb-1 border border-purple-500/20">
          <Shield className="w-3.5 h-3.5" />
          <span>SECURITY MONITORING</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Security Center & Anomaly Audit
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Authentication success rates, rate-limit enforcement events, and unauthorized access attempts.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Auth Success Rate</span>
          <span className="text-xl font-extrabold text-emerald-500 mt-1 block">{metrics.authSuccessRatePercent}%</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Failed Logins</span>
          <span className="text-xl font-extrabold text-amber-500 mt-1 block">{metrics.failedLoginCount}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Rate-Limit Triggers</span>
          <span className="text-xl font-extrabold text-transit-500 mt-1 block">{metrics.rateLimitEventsCount}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Blocked Requests</span>
          <span className="text-xl font-extrabold text-cyan-500 mt-1 block">{metrics.blockedRequestsCount}</span>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">
          Security Event Audit Stream
        </h3>
        <div className="space-y-2">
          {events.map((ev) => (
            <SecurityEventCard key={ev.id} event={ev} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecurityPage;
