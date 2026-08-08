import React from 'react';
import { Layers, Activity, Radio, ArrowRight } from 'lucide-react';
import { ArchitecturalFlow } from '../components/ArchitecturalFlow.jsx';
import { cn } from '../../../utils/index.js';

export function SolutionSection() {
  return (
    <section className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold border border-transit-500/20">
            <Layers className="w-3.5 h-3.5" />
            <span>UNIFIED SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            One Intelligent Layer for the Entire Transit Network.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            SmartTransit OS bridges hardware GPS broadcasters, municipal traffic signals, and passenger mobile screens into one high-availability real-time telemetry mesh.
          </p>
        </div>

        {/* Reusable Architectural Flow Visual */}
        <ArchitecturalFlow />
      </div>
    </section>
  );
}

export default SolutionSection;
