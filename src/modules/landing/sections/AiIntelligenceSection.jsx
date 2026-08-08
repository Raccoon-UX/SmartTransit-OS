import React from 'react';
import { Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { AI_FEATURES_DATA } from '../../../data/landing/aiFeaturesData.js';
import { cn } from '../../../utils/index.js';

export function AiIntelligenceSection() {
  return (
    <section id="ai-intelligence" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold border border-transit-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI INTELLIGENCE LAYER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            From Tracking Data to Transit Intelligence.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            SmartTransit OS evolves raw coordinate streams into predictive urban mobility algorithms — anticipating passenger surges, road bottlenecks, and schedule deviations.
          </p>
        </div>

        {/* 4 AI Intelligence Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {AI_FEATURES_DATA.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={cn(
                  'p-6 rounded-2xl border transition-all duration-200 text-left flex flex-col justify-between space-y-4',
                  'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
                  'shadow-sm dark:shadow-card hover:border-transit-500/40 hover:shadow-glow-sm'
                )}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={cn('p-3 rounded-xl border', item.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-transit-600 dark:text-transit-300 border border-slate-200 dark:border-slate-700 uppercase">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">{item.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Capability:</span>
                  <span>{item.metric}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AiIntelligenceSection;
