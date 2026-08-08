import React from 'react';
import { LANDING_METRICS } from '../../../data/landing/transitMetrics.js';
import { cn } from '../../../utils/index.js';

export function ImpactMetricsSection() {
  const metrics = LANDING_METRICS.impact;

  return (
    <section className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
            <span>Prototype network metrics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Benchmarked for High-Density Urban Commutes.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Simulated throughput benchmarks validated across multi-route metropolitan transit models.
          </p>
        </div>


        {/* 4-Card Bold Impact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                'p-6 sm:p-8 rounded-3xl border transition-all text-left flex flex-col justify-between space-y-4',
                'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
                'shadow-sm dark:shadow-card'
              )}
            >
              <div>
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight block">
                  {item.value}
                </span>
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 font-sans mt-1">
                  {item.label}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] font-mono font-semibold text-transit-500">
                {item.trend}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ImpactMetricsSection;
