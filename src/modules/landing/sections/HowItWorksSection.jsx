import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../../data/landing/howItWorksSteps.js';
import { cn } from '../../../utils/index.js';
import busSchedulesBg from '../../../assets/Bus-schedules.jpg';

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative py-16 sm:py-20 border-t border-slate-300 dark:border-slate-800 bg-slate-900 bg-cover bg-center bg-no-repeat bg-fixed text-left"
      style={{ backgroundImage: `url(${busSchedulesBg})` }}
    >
      {/* Dark Overlay Layer for Contrast */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md text-cyan-300 text-xs font-mono font-bold border border-white/20">
            <span>PIPELINE WORKFLOW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            How SmartTransit OS Operates.
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
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
                  'p-5 rounded border text-left flex flex-col justify-between space-y-4',
                  'bg-slate-900/90 backdrop-blur-md border-slate-700/80 shadow-panel hover:border-[#0B3D91]'
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-extrabold font-mono text-sky-400">{step.stepNumber}</span>
                    <div className="p-2 rounded bg-[#0B3D91] text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white font-sans">{step.title}</h3>
                  <span className="text-[10px] font-mono text-slate-400 block mt-0.5 mb-2">{step.subtitle}</span>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-400">
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
