import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';
import busTicketingBg from '../../../assets/Bus-tickting.jpg';

export function FinalCtaSection({ onExploreTransit, onExplorePlatform }) {
  return (
    <section
      className="relative py-24 sm:py-32 border-t border-slate-300 dark:border-slate-800 text-center bg-slate-900 bg-cover bg-center bg-no-repeat bg-fixed overflow-hidden"
      style={{ backgroundImage: `url(${busTicketingBg})` }}
    >
      {/* Dark Overlay Layer for Contrast */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md text-sky-300 text-xs font-mono font-bold border border-white/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SMART CITY INTELLIGENCE</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Ready to Make Public Transit Smarter?
        </h2>

        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed">
          Connect the city, the fleet and the people through one intelligent transit platform.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            variant="primary"
            size="lg"
            rightIcon={ArrowRight}
            onClick={onExploreTransit}
            className="font-bold shadow-panel"
          >
            Explore Live Transit
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onExplorePlatform}
            className="font-bold bg-slate-900/80 text-white border-slate-700 hover:bg-slate-800"
          >
            View Platform Architecture
          </Button>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
