import React, { useState } from 'react';
import { Bus, MapPin, Navigation, RotateCcw, Share2 } from 'lucide-react';
import { LocationShareModal } from '../../../components/maps/LocationShareModal.jsx';
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
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const driverBusObj = {
    id: busNumber,
    busNumber,
    routeId: routeCode,
    speed: 42,
    status: 'ACTIVE',
    lat: 19.0760,
    lng: 72.8777,
    nextStop,
    nextStopEta: '3 mins',
  };

  return (
    <div
      className={cn(
        'relative w-full h-[480px] sm:h-[580px] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-xl transition-all text-left bg-[#E8ECEF] font-sans',
        className
      )}
    >
      {/* REALISTIC GOOGLE MAPS LIGHT THEME CANVAS */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M 0 0 L 140 0 Q 220 180, 180 340 T 240 600 L 0 600 Z" fill="#A5C9EB" />
        <path d="M 680 40 Q 820 80, 960 160 L 960 40 Z" fill="#D2E8D4" />

        {/* Secondary White Local Streets */}
        <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="160" y1="120" x2="900" y2="120" />
          <line x1="180" y1="240" x2="960" y2="240" />
          <line x1="200" y1="360" x2="960" y2="360" />
          <line x1="300" y1="40" x2="300" y2="560" />
          <line x1="450" y1="40" x2="450" y2="560" />
        </g>

        {/* Google Maps Yellow Expressway */}
        <path d="M 180 80 Q 320 220, 520 280 T 880 480" fill="none" stroke="#FFE082" strokeWidth="10" strokeLinecap="round" />
      </svg>

      {/* Top Cockpit HUD Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs shadow-md">
          <Bus className="w-4 h-4 text-[#0B3D91]" />
          <span className="font-bold">{busNumber}</span>
          <span className="text-slate-500 font-normal">Line {routeCode}</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* WhatsApp Share Location Button */}
          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold font-mono text-xs shadow-md inline-flex items-center space-x-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Location on WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setRecentered(true)}
            className="p-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 transition-colors text-xs font-mono flex items-center space-x-1.5 shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Recenter Vector</span>
          </button>
        </div>
      </div>

      {/* Driver's Bus Vehicle Marker */}
      <div
        className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out pointer-events-none"
        style={{ left: `${coordinates.x}%`, top: `${coordinates.y}%` }}
      >
        <span className="absolute -inset-3 rounded-full bg-[#0B3D91]/30 animate-ping" />
        <div className="w-11 h-11 rounded-full bg-[#0B3D91] text-white flex items-center justify-center shadow-xl border-2 border-white">
          <Bus className="w-5 h-5" />
        </div>
      </div>

      {/* WhatsApp Share Location Modal */}
      <LocationShareModal
        isOpen={shareModalOpen}
        bus={driverBusObj}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}

export default DriverMap;
