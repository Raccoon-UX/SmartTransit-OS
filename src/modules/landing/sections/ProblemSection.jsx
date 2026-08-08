import React from 'react';
import { Clock, AlertTriangle, Users, HelpCircle, CheckCircle2, ShieldCheck, Radio, Navigation } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function ProblemSection() {
  const beforePoints = [
    { label: 'Unpredictable Waiting Times', desc: 'Commuters wait at curbs with zero visibility into whether their bus is 2 or 25 minutes away.' },
    { label: 'Severe Bus Overcrowding', desc: 'Passengers board blindly without knowing if the arriving vehicle has available seating or standing room.' },
    { label: 'Silent Transit Delays', desc: 'Traffic jams, diversions, or breakdowns happen without instant notification to passengers.' },
    { label: 'Uncoordinated Dispatch', desc: 'Transport authorities manage bus fleets reactively rather than using live data telemetry.' },
  ];

  const afterPoints = [
    { label: 'Sub-Minute ETA Countdown', desc: 'Dynamic arrival estimates calculated with live GPS coordinates, road traffic, and stop dwell times.' },
    { label: 'Occupancy Awareness (Low/Med/High)', desc: 'Real-time passenger load meters allow citizens to choose comfortable, uncrowded buses.' },
    { label: 'Instant Citywide Service Alerts', desc: 'Emergency broadcast alerts and delay notices delivered before commuters arrive at the terminal.' },
    { label: 'Unified Command & AI Dispatch', desc: 'Municipal transport authorities orchestrate fleet schedules with live data intelligence.' },
  ];

  return (
    <section className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold mb-2 border border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>THE COMMUTE CHALLENGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Public Transit Shouldn't Be a Guess.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Every day, millions of urban commuters waste hours at bus stops dealing with unpredictable delays, overcrowding, and fragmented transit information.
          </p>
        </div>

        {/* Before vs. After Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Before Column: Traditional Transit */}
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-rose-200 dark:border-rose-900/60">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-rose-500">TRADITIONAL BUS COMMUTE</span>
                <h3 className="text-xl font-bold text-rose-950 dark:text-rose-200 font-sans">
                  The Guesswork Paradigm
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30">
                BEFORE
              </span>
            </div>

            <div className="space-y-4">
              {beforePoints.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-400 flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">{item.label}</h4>
                    <p className="text-xs text-rose-700 dark:text-rose-300/80 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* After Column: SmartTransit OS */}
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-200 dark:border-emerald-900/60">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-500">SMARTTRANSIT OS NETWORK</span>
                <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-200 font-sans">
                  Predictable Intelligence
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                AFTER
              </span>
            </div>

            <div className="space-y-4">
              {afterPoints.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">{item.label}</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300/80 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProblemSection;
