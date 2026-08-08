import React from 'react';
import { Activity } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function ApiMetricCard({ endpoints = [], className = '' }) {
  return (
    <div className={cn('p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4 font-mono text-xs', className)}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">API Endpoint Telemetry Metrics</h4>
        <span className="text-xs font-bold text-emerald-500">● 100% HEALTHY</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="py-2.5 px-3">Endpoint Route</th>
              <th className="py-2.5 px-3">Request Rate</th>
              <th className="py-2.5 px-3">Avg Latency</th>
              <th className="py-2.5 px-3">P95 Latency</th>
              <th className="py-2.5 px-3">Error Rate</th>
              <th className="py-2.5 px-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {endpoints.map((ep) => (
              <tr key={ep.path} className="hover:bg-slate-50 dark:hover:bg-navy-850">
                <td className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">{ep.path}</td>
                <td className="py-2.5 px-3 text-transit-500 font-bold">{ep.rate}</td>
                <td className="py-2.5 px-3 text-cyan-600 dark:text-cyan-400 font-bold">{ep.avgLatency}</td>
                <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">{ep.p95Latency}</td>
                <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-bold">{ep.errorRate}</td>
                <td className="py-2.5 px-3 text-right">
                  <StatusBadge status={ep.status} size="sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApiMetricCard;
