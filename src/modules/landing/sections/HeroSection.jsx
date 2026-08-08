import React from 'react';
import { ArrowRight, Play, Shield, Activity, Radio, Sparkles, Bus, Users, ShieldCheck, Building2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { CityTransitVisual } from '../components/CityTransitVisual.jsx';
import { LANDING_METRICS } from '../../../data/landing/transitMetrics.js';
import { cn } from '../../../utils/index.js';

export function HeroSection({ onExploreTransit, onHowItWorks }) {
  const m = LANDING_METRICS.hero;

  return (
    <section className="relative pt-6 sm:pt-10 pb-12 sm:pb-20 overflow-hidden text-left bg-gradient-to-b from-[#F7F9FC] to-white dark:from-slate-950 dark:to-navy-950">
      {/* Background Ambient Network Lighting & Faint City Grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-transit-500/15 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Responsive Desktop Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Eyebrow, Main Headline, Pitch, CTAs & Live KPIs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 border border-transit-500/20 text-xs font-mono font-bold shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-transit-500" />
              <span>SMART PUBLIC INFRASTRUCTURE</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans leading-[1.12]">
              Making Public Transit <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-transit-500 via-cyan-500 to-emerald-500">
                Smarter for Everyone.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              SmartTransit OS connects buses, passengers, drivers, transport authorities and digital transit infrastructure through one intelligent real-time platform. Built to make everyday public transportation more predictable, accessible and responsive.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                rightIcon={ArrowRight}
                onClick={onExploreTransit}
                className="shadow-glow font-bold"
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

            {/* Live Network Indicator */}
            <div className="flex items-center space-x-2 pt-1 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 telemetry-live" />
              <span>● LIVE NETWORK TELEMETRY ACTIVE</span>
            </div>

            {/* Integrated Live Metric Strip */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-6 text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Fleet</span>
                <div className="flex items-center space-x-1.5">
                  <Bus className="w-4 h-4 text-transit-500" />
                  <strong className="text-slate-900 dark:text-white font-bold text-sm">{m.activeBuses} Buses</strong>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-0.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Connected Riders</span>
                <div className="flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-cyan-500" />
                  <strong className="text-slate-900 dark:text-white font-bold text-sm">{m.connectedRiders} Commuters</strong>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 dark:bg-slate-800" />
              <div className="space-y-0.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Telemetry Uptime</span>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <strong className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{m.systemUptime}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Metropolitan Transit Network Visualization */}
          <div className="lg:col-span-7 w-full min-w-0">
            <CityTransitVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
