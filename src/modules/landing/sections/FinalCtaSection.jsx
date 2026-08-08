import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function FinalCtaSection({ onExploreTransit, onExplorePlatform }) {
  return (
    <section className="py-20 sm:py-28 border-t border-slate-200 dark:border-slate-800/80 relative overflow-hidden text-center">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-transit-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold border border-transit-500/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SMART CITY INTELLIGENCE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
          Ready to Make Public Transit Smarter?
        </h2>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Connect the city, the fleet and the people through one intelligent transit platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            variant="primary"
            size="lg"
            rightIcon={ArrowRight}
            onClick={onExploreTransit}
            className="shadow-glow"
          >
            Explore Live Transit
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={onExplorePlatform}
          >
            View Platform Architecture
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
