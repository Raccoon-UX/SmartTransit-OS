import React from 'react';
import { ShieldCheck, Shield } from 'lucide-react';
import { SECURITY_ARCH_DATA } from '../../../data/landing/securityArchData.js';
import { cn } from '../../../utils/index.js';

export function SecurityScalabilitySection() {
  return (
    <section id="technology" className="py-12 sm:py-16 border-t border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold border border-slate-300 dark:border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>ENTERPRISE RESILIENCE & SECURITY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            High-Availability Municipal Infrastructure Topology
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Stateless API gateways, memory-cached query brokers, rate-limited public endpoints, and multi-region backups protecting municipal data.
          </p>
        </div>

        {/* 8-Tier Infrastructure Topology Diagram */}
        <div className="p-4 rounded bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 space-y-3 shadow-subtle">
          <div className="flex items-center justify-between pb-2 border-b border-slate-300 dark:border-slate-800">
            <span className="text-xs font-mono font-bold uppercase text-slate-800 dark:text-slate-200">
              Technical Infrastructure Layers (L1 - L8)
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
              ● Active Multi-Region Redundancy
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {SECURITY_ARCH_DATA.topology.map((t, idx) => (
              <div key={idx} className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-center flex flex-col justify-center space-y-0.5">
                <span className="text-[10px] font-mono text-[#0B3D91] dark:text-sky-400 font-bold">L{idx + 1}</span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-slate-100 leading-snug">{t.label}</span>
                <span className="text-[9px] text-slate-500 font-mono">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6 Resilience Feature Cards (Flat Bordered) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECURITY_ARCH_DATA.features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className={cn(
                  'p-4 rounded border text-left space-y-2',
                  'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800',
                  'shadow-subtle'
                )}
              >
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded bg-slate-100 dark:bg-slate-800 text-[#0B3D91] dark:text-sky-400 border border-slate-300 dark:border-slate-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white font-sans">{feat.title}</h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default SecurityScalabilitySection;
