import React from 'react';
import { Bus, MapPin, Radio, ShieldCheck, Sparkles, Building2, Cpu, ArrowRight } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function PublicFacilitiesSection({ className = '' }) {
  const cards = [
    {
      id: 'smart-stops',
      title: 'Smart Bus Stops',
      tag: 'DIGITAL INFRASTRUCTURE',
      description: 'Connected bus shelters featuring real-time digital arrival boards, accessibility indicators, live service advisories, and interactive public kiosks.',
      icon: MapPin,
      color: 'text-transit-500 bg-transit-500/10 border-transit-500/20',
      bullets: ['Digital arrival displays', 'Accessibility indicators', 'Live service notices', 'Interactive public kiosks'],
    },
    {
      id: 'intelligent-transit',
      title: 'Intelligent Transit',
      tag: 'REAL-TIME TELEMETRY',
      description: 'Live vehicle tracking, predictive sub-minute ETA algorithms, line occupancy awareness, and automated dispatch optimization across municipal corridors.',
      icon: Bus,
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20',
      bullets: ['Live vehicle telemetry', 'Predictive sub-minute ETA', 'Occupancy awareness', 'Corridor optimization'],
    },
    {
      id: 'connected-services',
      title: 'Connected Public Services',
      tag: 'CITIZEN INFORMATION',
      description: 'Unified public announcement streams, emergency transit alerts, digital accessibility status, and multi-channel citizen mobility applications.',
      icon: Radio,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      bullets: ['Real-time service alerts', 'Public info broads', 'Infrastructure monitoring', 'Citizen-facing apps'],
    },
    {
      id: 'city-operations',
      title: 'Smarter City Operations',
      tag: 'CIVIC COMMAND',
      description: 'Enterprise fleet command, automated incident detection, predictive AI demand forecasting, and real-time NOC system operations center.',
      icon: Building2,
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      bullets: ['Fleet command center', 'Dispatch intelligence', 'AI demand predictions', 'Infrastructure SRE monitoring'],
    },
  ];

  return (
    <section id="smart-facilities" className={cn('py-16 sm:py-24 bg-white dark:bg-navy-900 border-y border-slate-200 dark:border-slate-800 text-left', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 border border-transit-500/20 text-xs font-mono font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>CIVIC INFRASTRUCTURE TRANSFORMATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Transforming Everyday Public Infrastructure
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            From the road to the bus stop, SmartTransit OS connects the facilities and services people depend on every single day.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-navy-850 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={cn('p-3 rounded-2xl border', card.color)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded bg-slate-200 dark:bg-navy-800 text-slate-700 dark:text-slate-300 uppercase">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans">{card.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">{card.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 space-y-1.5 font-mono text-xs">
                  {card.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[11px] text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-transit-500" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PublicFacilitiesSection;
