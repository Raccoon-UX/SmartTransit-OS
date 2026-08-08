import React from 'react';
import { ShieldCheck, Server, Database, Lock, RefreshCw, HardDrive, ArrowRight } from 'lucide-react';
import { SECURITY_ARCH_DATA } from '../../../data/landing/securityArchData.js';
import { cn } from '../../../utils/index.js';

export function SecurityScalabilitySection() {
  return (
    <section id="technology" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ENTERPRISE RESILIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Built to Stay Reliable When the City Gets Busy.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Stateless API nodes, in-memory caching, rate-limited public endpoints, and multi-region disaster backups safeguard municipal operations during peak rush hour surges.
          </p>
        </div>

        {/* 8-Tier Infrastructure Topology Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <span className="text-xs font-mono uppercase font-bold text-slate-500 dark:text-slate-400">
              High-Availability Infrastructure Topology
            </span>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              Active Redundancy
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {SECURITY_ARCH_DATA.topology.map((t, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-center flex flex-col justify-center space-y-1">
                <span className="text-[9px] font-mono text-transit-500 font-bold">L{idx + 1}</span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100 leading-snug">{t.label}</span>
                <span className="text-[9px] text-slate-400 font-mono">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Resilience Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECURITY_ARCH_DATA.features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className={cn(
                  'p-6 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-4',
                  'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
                  'shadow-sm dark:shadow-card hover:border-emerald-500/40'
                )}
              >
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{feat.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SecurityScalabilitySection;
