import React from 'react';
import { MapPin, Navigation, Bus, Repeat, Footprints, Radio } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function JourneyRouteMap({ plan, className = '' }) {
  if (!plan) return null;

  const isTransfer = plan.transfersCount > 0;

  return (
    <div
      className={cn(
        'relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-md bg-[#E8ECEF] font-sans text-left',
        className
      )}
    >
      {/* REALISTIC VECTOR MAP CANVAS WITH VISUAL TRANSIT PATHS */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
        {/* Landmass and Water Boundaries */}
        <path d="M 0 0 L 160 0 Q 240 180, 200 340 T 260 600 L 0 600 Z" fill="#A5C9EB" />
        <path d="M 720 40 Q 860 80, 1000 160 L 1000 40 Z" fill="#D2E8D4" />

        {/* Secondary Municipal Streets */}
        <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="160" y1="120" x2="900" y2="120" />
          <line x1="180" y1="240" x2="960" y2="240" />
          <line x1="200" y1="360" x2="960" y2="360" />
          <line x1="300" y1="40" x2="300" y2="560" />
          <line x1="480" y1="40" x2="480" y2="560" />
          <line x1="680" y1="40" x2="680" y2="560" />
        </g>

        {/* 1. Walking Leg 1 (Dashed Emerald Line) */}
        <path
          d="M 220 180 L 280 220"
          fill="none"
          stroke="#10B981"
          strokeWidth="4"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* 2. Transit Bus Leg 1 (Solid Transit Blue Line) */}
        <path
          d={isTransfer ? 'M 280 220 Q 380 300, 500 320' : 'M 280 220 Q 420 320, 680 440'}
          fill="none"
          stroke="#0878D1"
          strokeWidth="8"
          strokeLinecap="round"
        />

        {isTransfer && (
          <>
            {/* 3. Transfer Intermodal Hub (Pulsing Circle + Link) */}
            <path
              d="M 500 320 L 530 330"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="4 4"
            />

            {/* 4. Transit Bus Leg 2 (Solid Saffron Line) */}
            <path
              d="M 530 330 Q 640 380, 800 460"
              fill="none"
              stroke="#B83E12"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </>
        )}

        {/* 5. Final Walking Leg to Destination (Dashed Line) */}
        <path
          d={isTransfer ? 'M 800 460 L 840 500' : 'M 680 440 L 720 480'}
          fill="none"
          stroke="#10B981"
          strokeWidth="4"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
      </svg>

      {/* Top Map Status Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-md">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Multimodal Journey Simulation Map</span>
        </div>

        <div className="px-3 py-1 rounded-xl bg-slate-900/90 text-white text-xs font-mono font-bold">
          {plan.totalDuration} Total
        </div>
      </div>

      {/* Map Interactive Landmarks & Waypoint Nodes */}
      {/* Origin Node */}
      <div className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2" style={{ left: '22%', top: '30%' }}>
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono text-[11px] font-bold shadow-lg border border-white">
          <Footprints className="w-3 h-3" />
          <span>Origin</span>
        </div>
      </div>

      {/* Boarding Stop Node */}
      <div className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2" style={{ left: '28%', top: '37%' }}>
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-600 text-white font-mono text-[11px] font-bold shadow-lg border border-white">
          <Bus className="w-3 h-3" />
          <span>Bus 1 Stop</span>
        </div>
      </div>

      {/* Transfer Interchange Node (If Applicable) */}
      {isTransfer && (
        <div className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2" style={{ left: '51%', top: '54%' }}>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-mono text-[11px] font-bold shadow-lg border border-white ring-4 ring-amber-400/30 animate-pulse">
            <Repeat className="w-3 h-3" />
            <span>Transfer Hub</span>
          </div>
        </div>
      )}

      {/* Destination Node */}
      <div
        className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: isTransfer ? '84%' : '72%', top: isTransfer ? '83%' : '80%' }}
      >
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-rose-600 text-white font-mono text-[11px] font-bold shadow-lg border border-white">
          <MapPin className="w-3 h-3" />
          <span>Destination</span>
        </div>
      </div>

      {/* Bottom Map Legend */}
      <div className="absolute bottom-3 left-3 right-3 z-20 p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-xs font-mono flex flex-wrap items-center justify-between gap-2 shadow-md">
        <div className="flex items-center space-x-4 text-[11px]">
          <span className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
            <Footprints className="w-3 h-3" />
            <span>Walk</span>
          </span>
          <span className="flex items-center space-x-1.5 text-blue-600 dark:text-sky-400 font-bold">
            <Bus className="w-3 h-3 text-blue-600" />
            <span>Bus 1</span>
          </span>
          {isTransfer && (
            <>
              <span className="flex items-center space-x-1.5 text-amber-600 dark:text-amber-400 font-bold">
                <Repeat className="w-3 h-3 text-amber-500" />
                <span>Transfer</span>
              </span>
              <span className="flex items-center space-x-1.5 text-[#B83E12] dark:text-amber-500 font-bold">
                <Bus className="w-3 h-3 text-[#B83E12]" />
                <span>Bus 2</span>
              </span>
            </>
          )}
        </div>
        <span className="text-[10px] text-slate-500">Estimated Transit Route</span>
      </div>
    </div>
  );
}

export default JourneyRouteMap;
