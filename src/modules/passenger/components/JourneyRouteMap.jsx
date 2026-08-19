import React from 'react';
import { MapPin, Navigation, Bus, Repeat, Footprints, Radio, Clock } from 'lucide-react';
import { RealisticCityCanvas } from '../../../components/maps/RealisticCityCanvas.jsx';
import { cn } from '../../../utils/index.js';

export function JourneyRouteMap({ plan, className = '' }) {
  if (!plan) return null;

  const isTransfer = plan.transfersCount > 0;

  return (
    <div
      className={cn(
        'relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-md bg-[#F4F7FB] font-sans text-left select-none',
        className
      )}
    >
      {/* REALISTIC HIGH-FIDELITY VECTOR CITY CANVAS UNDERLAY */}
      <RealisticCityCanvas
        showTraffic={false}
        showRoutes={false}
        showLabels={true}
        showLandmarks={true}
      />

      {/* DEDICATED JOURNEY MULTIMODAL ROUTE OVERLAY */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 650" preserveAspectRatio="none">
        <defs>
          <filter id="journeyGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#0B3D91" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* 1. Walking Leg 1 (Dashed Emerald Line) */}
        <path
          d="M 220 195 L 280 240"
          fill="none"
          stroke="#10B981"
          strokeWidth="4.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />

        {/* 2. Transit Bus Leg 1 (Solid Transit Deep Blue Line) */}
        <path
          d={isTransfer ? 'M 280 240 Q 380 320, 500 350' : 'M 280 240 Q 420 350, 680 470'}
          fill="none"
          stroke="#0B3D91"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#journeyGlow)"
        />

        {isTransfer && (
          <>
            {/* 3. Transfer Intermodal Hub Connector */}
            <path
              d="M 500 350 L 530 360"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="4 4"
            />

            {/* 4. Transit Bus Leg 2 (Solid Saffron Line) */}
            <path
              d="M 530 360 Q 640 410, 800 490"
              fill="none"
              stroke="#B83E12"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#journeyGlow)"
            />
          </>
        )}

        {/* 5. Final Walking Leg to Destination (Dashed Line) */}
        <path
          d={isTransfer ? 'M 800 490 L 840 535' : 'M 680 470 L 720 515'}
          fill="none"
          stroke="#10B981"
          strokeWidth="4.5"
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
      </svg>

      {/* Top Map Status Overlay */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-40 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-md">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Multimodal Plan Visualization</span>
        </div>

        <div className="px-3 py-1 rounded-xl bg-[#0B3D91] text-white text-xs font-mono font-bold shadow-md">
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
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#0B3D91] text-white font-mono text-[11px] font-bold shadow-lg border border-white">
          <Bus className="w-3 h-3 text-amber-300" />
          <span>Board Bus 1</span>
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
      <div className="absolute bottom-3 left-3 right-3 z-30 p-2.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-xs font-mono flex flex-wrap items-center justify-between gap-2 shadow-md">
        <div className="flex items-center space-x-4 text-[11px]">
          <span className="flex items-center space-x-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
            <Footprints className="w-3 h-3" />
            <span>Walk</span>
          </span>
          <span className="flex items-center space-x-1.5 text-[#0B3D91] dark:text-sky-400 font-bold">
            <Bus className="w-3 h-3 text-[#0B3D91]" />
            <span>Bus Leg 1</span>
          </span>
          {isTransfer && (
            <>
              <span className="flex items-center space-x-1.5 text-amber-600 dark:text-amber-400 font-bold">
                <Repeat className="w-3 h-3 text-amber-500" />
                <span>Transfer</span>
              </span>
              <span className="flex items-center space-x-1.5 text-[#B83E12] dark:text-amber-500 font-bold">
                <Bus className="w-3 h-3 text-[#B83E12]" />
                <span>Bus Leg 2</span>
              </span>
            </>
          )}
        </div>
        <span className="text-[10px] text-slate-500 hidden sm:inline">SmartTransit Custom Multi-Vector Engine</span>
      </div>
    </div>
  );
}

export default JourneyRouteMap;
