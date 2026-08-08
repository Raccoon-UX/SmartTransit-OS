import React from 'react';
import { Navigation, Radio } from 'lucide-react';
import { InteractiveMapDemo } from '../components/InteractiveMapDemo.jsx';
import { cn } from '../../../utils/index.js';

export function LiveTrackingShowcaseSection() {
  return (
    <section id="live-tracking" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/20">
            <Radio className="w-3.5 h-3.5" />
            <span>LIVE TRACKING EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            See Every Journey in Motion.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Witness how live GPS streams translate into high-fidelity waypoint maps, arrival countdowns, and crowding indicators.
          </p>
        </div>

        {/* Interactive Map Showcase */}
        <InteractiveMapDemo />
      </div>
    </section>
  );
}

export default LiveTrackingShowcaseSection;
