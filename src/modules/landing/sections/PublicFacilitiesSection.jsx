import React from 'react';
import { Bus, MapPin, Radio, Building2 } from 'lucide-react';
import { cn } from '../../../utils/index.js';
import transformingBg from '../../../assets/Transforming.webp';

export function PublicFacilitiesSection({ className = '' }) {
  const cards = [
    {
      id: 'smart-stops',
      title: 'Smart Bus Stops',
      tag: 'DIGITAL INFRASTRUCTURE',
      description: 'Connected bus shelters featuring real-time digital arrival boards, accessibility indicators, live service advisories, and interactive public kiosks.',
      icon: MapPin,
      bullets: ['Digital arrival displays', 'Accessibility indicators', 'Live service notices', 'Interactive public kiosks'],
    },
    {
      id: 'intelligent-transit',
      title: 'Intelligent Transit',
      tag: 'REAL-TIME TELEMETRY',
      description: 'Live vehicle tracking, predictive sub-minute ETA algorithms, line occupancy awareness, and automated dispatch optimization across municipal corridors.',
      icon: Bus,
      bullets: ['Live vehicle telemetry', 'Predictive sub-minute ETA', 'Occupancy awareness', 'Corridor optimization'],
    },
    {
      id: 'connected-services',
      title: 'Connected Public Services',
      tag: 'CITIZEN INFORMATION',
      description: 'Unified public announcement streams, emergency transit alerts, digital accessibility status, and multi-channel citizen mobility applications.',
      icon: Radio,
      bullets: ['Real-time service alerts', 'Public info broads', 'Infrastructure monitoring', 'Citizen-facing apps'],
    },
    {
      id: 'city-operations',
      title: 'Smarter City Operations',
      tag: 'CIVIC COMMAND',
      description: 'Enterprise fleet command, automated incident detection, predictive AI demand forecasting, and real-time NOC system operations center.',
      icon: Building2,
      bullets: ['Fleet command center', 'Dispatch intelligence', 'AI demand predictions', 'Infrastructure SRE monitoring'],
    },
  ];

  return (
    <section
      id="smart-facilities"
      className={cn(
        'relative py-16 sm:py-24 border-y border-slate-300 dark:border-slate-800 text-left bg-slate-900 bg-cover bg-center bg-no-repeat bg-fixed',
        className
      )}
      style={{ backgroundImage: `url(${transformingBg})` }}
    >
      {/* Dark Overlay Layer for Contrast */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md text-sky-300 border border-white/20 text-xs font-mono font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>CIVIC INFRASTRUCTURE TRANSFORMATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Transforming Everyday Public Infrastructure
          </h2>
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            From the road to the bus stop, SmartTransit OS connects the facilities and services people depend on every single day.
          </p>
        </div>

        {/* 4 Cards Grid with Opaque Glass Overlay */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="p-6 rounded bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-panel hover:border-[#0B3D91] transition-all duration-200 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded bg-[#0B3D91] text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-extrabold px-2 py-0.5 rounded bg-slate-800 text-slate-300 uppercase border border-slate-700">
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-sans">{card.title}</h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">{card.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-1.5 font-mono text-xs">
                  {card.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-[11px] text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
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
