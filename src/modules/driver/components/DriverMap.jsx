import React, { useState } from 'react';
import { Bus, MapPin, Navigation, RotateCcw, Compass, Radio } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function DriverMap({
  busNumber = 'Bus 245',
  routeCode = 'RT-108',
  currentStop = 'Dahisar Check Naka',
  nextStop = 'Magathane Junction',
  tripProgress = 42,
  coordinates = { x: 38, y: 44 },
  className = '',
}) {
  const [recentered, setRecentered] = useState(true);

  return (
    <div
      className={cn(
        'relative w-full h-[480px] sm:h-[580px] rounded-3xl overflow-hidden border shadow-2xl transition-all text-left',
        'bg-slate-950 border-slate-700/80',
        className
      )}
    >
      {/* High Contrast Road Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none stroke-slate-500/40">
        <defs>
          <pattern id="driver-map-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#driver-map-grid)" />
      </svg>

      {/* Primary Route Path Vector */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path
          d="M 60 140 Q 180 180, 260 260 T 480 320 T 720 400"
          fill="none"
          stroke="#0c87eb"
          strokeWidth="6"
          strokeLinecap="round"
          className="opacity-90"
        />
      </svg>

      {/* Top Cockpit HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white font-mono text-xs shadow-lg">
          <Bus className="w-4 h-4 text-transit-400" />
          <span className="font-bold">{busNumber}</span>
          <span className="text-slate-400 font-normal">Line {routeCode}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setRecentered(true)}
            className="p-2 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white transition-colors text-xs font-mono flex items-center space-x-1.5 shadow-lg"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Recenter Vector</span>
          </button>

          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-emerald-400 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 telemetry-live" />
            <span>GPS Sync: 42ms</span>
          </div>
        </div>
      </div>

      {/* Current Stop Node */}
      <div className="absolute top-[28%] left-[26%] z-10 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-7 h-7 rounded-full bg-slate-900 border-2 border-slate-300 flex items-center justify-center text-slate-200 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
        </div>
        <div className="mt-1 px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 text-[10px] font-mono font-bold whitespace-nowrap shadow border border-slate-700">
          Passed: {currentStop}
        </div>
      </div>

      {/* Next Stop Highlighted Node */}
      <div className="absolute top-[48%] left-[48%] z-10 transform -translate-x-1/2 -translate-y-1/2">
        <span className="absolute -inset-2 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
        <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-xl border-2 border-white">
          <Navigation className="w-4 h-4" />
        </div>
        <div className="mt-1 px-2.5 py-1 rounded-xl bg-emerald-950/95 text-emerald-300 text-xs font-mono font-extrabold whitespace-nowrap shadow-xl border border-emerald-600">
          NEXT: {nextStop} (3 min)
        </div>
      </div>

      {/* Driver's Bus Vehicle Vector Marker */}
      <div
        className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out pointer-events-none"
        style={{ left: `${coordinates.x}%`, top: `${coordinates.y}%` }}
      >
        <span className="absolute -inset-3 rounded-full bg-transit-500/40 animate-ping" />
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-transit-500 to-transit-700 text-white flex items-center justify-center shadow-glow border-2 border-white">
          <Bus className="w-6 h-6" />
        </div>
        <div className="mt-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/95 border border-slate-700 text-white text-[11px] font-mono font-extrabold shadow-md whitespace-nowrap text-center">
          {busNumber}
        </div>
      </div>

      {/* Bottom Route Guidance Banner Overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
        <div className="p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white font-mono text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Guidance Vector</span>
            <span className="font-bold text-white text-sm font-sans">{currentStop} → {nextStop}</span>
          </div>
          <div className="flex items-center space-x-3 text-right">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Route Progress</span>
              <span className="font-bold text-transit-400">{tripProgress}% Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverMap;
