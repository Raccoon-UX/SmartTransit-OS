import React from 'react';
import { ShieldCheck, HeartHandshake, AlertTriangle, ArrowRight } from 'lucide-react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';

export function RoadSafetySection() {
  const { t } = usePublicAccessibility();

  const safetyCards = [
    {
      icon: '🪖',
      title: 'Wear a Helmet',
      desc: 'Use an approved protective helmet when riding a two-wheeler to ensure personal safety.',
    },
    {
      icon: '🚗',
      title: 'Fasten Seat Belts',
      desc: 'Seat belts significantly reduce the risk of serious injury for drivers and passengers.',
    },
    {
      icon: '🚦',
      title: 'Follow Traffic Signals',
      desc: 'Obey traffic signals, road signs, speed limits, and lawful directions from traffic police.',
    },
    {
      icon: '📱',
      title: 'Avoid Distracted Driving',
      desc: 'Do not use a mobile phone in a manner that distracts focus while driving any vehicle.',
    },
    {
      icon: '🚑',
      title: 'Give Way to Emergency Vehicles',
      desc: 'Allow ambulances, fire engines, and police emergency vehicles to pass safely immediately.',
    },
    {
      icon: '🚶',
      title: 'Respect Pedestrians',
      desc: 'Use designated zebra crossings and give pedestrians appropriate priority on city roads.',
    },
  ];

  const etiquetteCards = [
    { label: 'Keep Aisles Clear', icon: '🧳' },
    { label: 'Respect Priority Seating', icon: '♿' },
    { label: 'Allow Exit First', icon: '🚶' },
    { label: 'Keep Buses Clean', icon: '🧹' },
    { label: 'Do Not Obstruct Doors', icon: '🚪' },
    { label: 'Follow Staff Instructions', icon: '👮' },
    { label: 'Keep Noise Reasonable', icon: '🔇' },
    { label: 'Report Unsafe Issues', icon: '⚠️' },
  ];

  return (
    <section id="road-safety" className="py-16 sm:py-20 bg-slate-900 text-white border-t border-slate-800 text-left font-sans select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#B83E12] text-white text-xs font-mono font-bold border border-amber-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ROAD SAFETY & CITIZEN AWARENESS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Road Safety Awareness & Travel Etiquette.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Essential safety guidelines and public transport etiquette for a safer, respectful municipal transit corridor.
          </p>
        </div>

        {/* 6 Road Safety Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {safetyCards.map((card, idx) => (
            <div
              key={idx}
              className="p-5 rounded bg-slate-950 border border-slate-800 space-y-2 hover:border-amber-400/60 transition-colors"
            >
              <div className="text-3xl">{card.icon}</div>
              <h3 className="font-bold text-white text-base font-sans">{card.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Responsible Travel Etiquette Strip */}
        <div className="p-6 rounded bg-slate-950/90 border border-slate-800 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
            <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0" />
            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
              Travel Responsibly — Public Transport Etiquette
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono text-xs">
            {etiquetteCards.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded bg-slate-900 border border-slate-800 text-center space-y-1 text-slate-300"
              >
                <div className="text-xl">{item.icon}</div>
                <div className="text-[11px] font-sans font-bold leading-tight text-white">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoadSafetySection;
