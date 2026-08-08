import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../../data/landing/howItWorksSteps.js';
import { cn } from '../../../utils/index.js';

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold border border-cyan-500/20">
            <span>PIPELINE WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            How SmartTransit OS Operates.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            From vehicle telematics sensors to public LED kiosks, data flows across 5 high-speed algorithmic stages.
          </p>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.stepNumber}
                className={cn(
                  'p-5 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-4',
                  'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
                  'shadow-sm dark:shadow-card hover:border-transit-500/40'
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-extrabold font-mono text-transit-500">{step.stepNumber}</span>
                    <div className={cn('p-2 rounded-xl border', step.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{step.title}</h3>
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5 mb-2">{step.subtitle}</span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-mono text-slate-400">
                  Step 0{idx + 1} of 05
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
