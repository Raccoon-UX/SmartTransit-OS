import React from 'react';
import { Server, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function ServiceHealthMatrix({ services = [], onSelectService, className = '' }) {
  return (
    <div className={cn('p-6 sm:p-7 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-5', className)}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            Core Service Health Matrix (12 Services)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Real-time status, latency, uptime, and request throughput per microservice. Click any service for telemetry drilldown.
          </p>
        </div>
        <span className="text-xs font-mono text-emerald-500 font-bold">12 / 12 ONLINE</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {services.map((srv) => (
          <div
            key={srv.id}
            onClick={() => onSelectService && onSelectService(srv)}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-mono cursor-pointer hover:border-transit-500/50 hover:shadow-md transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-transit-500/10 text-transit-600 dark:text-transit-400 font-bold text-[10px]">
                {srv.category}
              </span>
              <StatusBadge status={srv.status} size="sm" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{srv.name}</h4>
              <span className="text-[10px] text-slate-400 font-normal">{srv.version} • Click for telemetry</span>
            </div>

            <div className="grid grid-cols-3 gap-1 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px]">
              <div>
                <span className="text-[9px] uppercase text-slate-400 font-bold block">Latency</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400">{srv.latency}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-slate-400 font-bold block">Uptime</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{srv.uptime}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase text-slate-400 font-bold block">Throughput</span>
                <span className="font-bold text-slate-900 dark:text-white">{srv.rate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


export default ServiceHealthMatrix;
