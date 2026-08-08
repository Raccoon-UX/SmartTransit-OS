import React from 'react';
import { ArrowRight, Building2, Bus, Users, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { CityTransitVisual } from '../components/CityTransitVisual.jsx';
import { LANDING_METRICS } from '../../../data/landing/transitMetrics.js';

export function HeroSection({ onExploreTransit, onHowItWorks }) {
  const m = LANDING_METRICS.hero;

  return (
    <section className="relative pt-8 sm:pt-12 pb-14 sm:pb-24 overflow-hidden text-left bg-[#F7F5F0] dark:bg-navy-950 border-b border-[#E5E0D8] dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-white dark:bg-navy-900 border border-[#E5E0D8] dark:border-slate-800 text-xs font-mono font-semibold text-[#1769D1] dark:text-sky-400 shadow-subtle">
              <Building2 className="w-3.5 h-3.5" />
              <span>SMART PUBLIC INFRASTRUCTURE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-[#172033] dark:text-white tracking-tight font-sans leading-[1.12]">
              Making Public Transit <br />
              <span className="text-[#1769D1]">
                Smarter for Everyone.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#596273] dark:text-slate-300 leading-relaxed font-normal">
              SmartTransit OS connects buses, passengers, drivers and transport authorities through one intelligent real-time platform — helping cities make everyday public transportation safer, more predictable and more accessible.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="lg"
                rightIcon={ArrowRight}
                onClick={onExploreTransit}
                className="font-bold shadow-subtle"
              >
                Explore Live Transit
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={onHowItWorks}
                className="font-bold"
              >
                See How It Works
              </Button>
            </div>

            {/* Live Network Status Indicator */}
            <div className="flex items-center space-x-2 text-xs font-mono text-[#218A63] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#218A63] telemetry-live" />
              <span>● LIVE NETWORK TELEMETRY ACTIVE</span>
            </div>

            {/* Integrated Metric Strip */}
            <div className="pt-6 border-t border-[#E5E0D8] dark:border-slate-800 flex flex-wrap items-center gap-6 text-xs font-mono text-[#596273] dark:text-slate-400">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#596273] dark:text-slate-500 block">Active Fleet</span>
                <div className="flex items-center space-x-1.5">
                  <Bus className="w-4 h-4 text-[#1769D1]" />
                  <strong className="text-[#172033] dark:text-white font-bold text-sm">{m.activeBuses} Buses</strong>
                </div>
              </div>
              <div className="h-8 w-px bg-[#E5E0D8] dark:bg-slate-800" />
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#596273] dark:text-slate-500 block">Connected Riders</span>
                <div className="flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-[#0E8F82]" />
                  <strong className="text-[#172033] dark:text-white font-bold text-sm">{m.connectedRiders} Commuters</strong>
                </div>
              </div>
              <div className="h-8 w-px bg-[#E5E0D8] dark:bg-slate-800" />
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-[#596273] dark:text-slate-500 block">Telemetry Uptime</span>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#218A63]" />
                  <strong className="text-[#218A63] font-bold text-sm">{m.systemUptime}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Metropolitan Transit Scene */}
          <div className="lg:col-span-7 w-full min-w-0">
            <CityTransitVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
