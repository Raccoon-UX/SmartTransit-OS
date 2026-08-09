import React from 'react';
import { ArrowRight, Shield, Bus, Users, ShieldCheck } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { CityTransitVisual } from '../components/CityTransitVisual.jsx';
import { LANDING_METRICS } from '../../../data/landing/transitMetrics.js';
import { usePublicAccessibility } from '../../../context/PublicAccessibilityContext.jsx';

export function HeroSection({ onExploreTransit, onHowItWorks }) {
  const m = LANDING_METRICS.hero;
  const { t } = usePublicAccessibility();

  return (
    <section
      id="main-content"
      className="relative pt-6 sm:pt-10 pb-12 sm:pb-16 overflow-hidden text-left bg-slate-50 dark:bg-slate-950 border-b border-slate-300 dark:border-slate-800 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Official Institutional Headline & Copy */}
          <div className="lg:col-span-5 space-y-5">
            {/* Official Status Pill */}
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-mono text-[#B83E12] dark:text-sky-400 font-bold shadow-subtle">
              <Shield className="w-3.5 h-3.5 text-[#B83E12] shrink-0" />
              <span>{t('heroTag')}</span>
            </div>

            {/* Sober Formal Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans leading-[1.18]">
              {t('heroTitle')}
            </h1>

            {/* Plain Procedural Copy */}
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              {t('heroDescription')}
            </p>

            {/* Solid CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="md"
                rightIcon={ArrowRight}
                onClick={onExploreTransit}
                className="font-bold shadow-subtle bg-[#B83E12] hover:bg-[#A0350E] border-[#9E2F0A]"
              >
                {t('btnTrackBuses')}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={onHowItWorks}
                className="font-bold"
              >
                {t('btnSchedules')}
              </Button>
            </div>

            {/* Functional Status Indicator */}
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 telemetry-live" />
              <span>● {t('liveTelemetry')}</span>
            </div>

            {/* Data Strip */}
            <div className="pt-4 border-t border-slate-300 dark:border-slate-800 grid grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-subtle">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Active Fleet</span>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <Bus className="w-4 h-4 text-[#B83E12]" />
                  <strong className="text-slate-900 dark:text-white font-bold text-sm">{m.activeBuses} Buses</strong>
                </div>
              </div>

              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-subtle">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Commuters</span>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <Users className="w-4 h-4 text-blue-700" />
                  <strong className="text-slate-900 dark:text-white font-bold text-sm">{m.connectedRiders} Daily</strong>
                </div>
              </div>

              <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-subtle">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">System Uptime</span>
                <div className="flex items-center space-x-1.5 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <strong className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">{m.systemUptime}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic Metropolitan Transit Network Visualization */}
          <div className="lg:col-span-7 w-full min-w-0">
            <CityTransitVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
