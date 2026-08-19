import React, { useState } from 'react';
import { Bus, MapPin, Navigation, RotateCcw, Share2, Radio, Compass } from 'lucide-react';
import { RealisticCityCanvas } from '../../../components/maps/RealisticCityCanvas.jsx';
import { BusMapMarker } from '../../../components/maps/MapMarkerPrimitives.jsx';
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
        'relative w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-xl transition-all text-left bg-[#F4F7FB] font-sans select-none',
        className
      )}
    >
      {/* REALISTIC HIGH-FIDELITY VECTOR CITY CANVAS */}
      <RealisticCityCanvas
        showTraffic={true}
        showRoutes={true}
        showLabels={true}
        showLandmarks={true}
        activeRouteId={routeCode}
      />

      {/* TOP COCKPIT HUD BAR */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-40 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs shadow-md">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span className="font-extrabold">{busNumber}</span>
          <span className="text-[#0B3D91] dark:text-sky-400 font-bold">Line {routeCode}</span>
        </div>

        <div className="flex items-center space-x-2">
          {/* WhatsApp Share Location Button */}
          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold font-mono text-xs shadow-md inline-flex items-center space-x-1.5 border border-emerald-400 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Location</span>
          </button>

          <button
            type="button"
            onClick={() => setRecentered(true)}
            className="p-2 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-slate-900 transition-colors text-xs font-mono flex items-center space-x-1.5 shadow-md cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span className="hidden sm:inline">Recenter</span>
          </button>
        </div>
      </div>

      {/* DRIVER'S BUS VEHICLE MARKER ON ROAD CORRIDOR */}
      <div
        className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out pointer-events-auto cursor-pointer"
        style={{ left: `${coordinates.x}%`, top: `${coordinates.y}%` }}
      >
        <BusMapMarker
          busNumber={busNumber}
          routeCode={routeCode}
          heading={135}
          status="LIVE"
          occupancyPercent={68}
          speed="42 km/h"
          isSelected={true}
        />
      </div>

      {/* NEXT STOP HUD CARD (BOTTOM OVERLAY) */}
      <div className="absolute bottom-3 left-3 sm:left-4 right-3 sm:right-4 z-40 flex items-center justify-between pointer-events-auto p-3 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-xl">
        <div>
          <div className="text-[10px] font-mono font-bold uppercase text-slate-400">Current Approach Vector</div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans flex items-center space-x-1.5">
            <span className="text-slate-500">{currentStop}</span>
            <span className="text-slate-400">&rarr;</span>
            <strong className="text-[#0B3D91] dark:text-sky-400">{nextStop}</strong>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono font-bold uppercase text-slate-400">Live Progress</div>
          <div className="text-xs font-mono font-bold text-emerald-600">{tripProgress}% Completed</div>
        </div>
      </div>

      {/* WHATSAPP SHARE LOCATION MODAL */}
      <LocationShareModal
        isOpen={shareModalOpen}
        bus={driverBusObj}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}

export default DriverMap;
