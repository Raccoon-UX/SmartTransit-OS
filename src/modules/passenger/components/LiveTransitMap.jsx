import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Navigation, Compass, Radio, Users, Filter, RotateCcw, X, Clock, Share2, ZoomIn, ZoomOut } from 'lucide-react';
import { MOCK_PASSENGER_BUSES } from '../../../data/passenger/mockBuses.js';
import { MOCK_PASSENGER_STOPS } from '../../../data/passenger/mockStops.js';
import { LocationShareModal } from '../../../components/maps/LocationShareModal.jsx';
import { BusDetailCard } from './BusDetailCard.jsx';
import { cn } from '../../../utils/index.js';

export function LiveTransitMap({
  selectedBusId = 'b-245',
  onSelectBus,
  onAddToFavorites,
  className = '',
}) {
  const [buses, setBuses] = useState(MOCK_PASSENGER_BUSES);
  const [selectedRouteFilter, setSelectedRouteFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeBusId, setActiveBusId] = useState(selectedBusId);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [busToShare, setBusToShare] = useState(null);

  // Simulate vehicle motion on controlled interval
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        (Array.isArray(prev) ? prev : []).map((bus, idx) => {
          const deltaX = (Math.sin(Date.now() / 3500 + idx) * 1.5).toFixed(1);
          const deltaY = (Math.cos(Date.now() / 3500 + idx) * 1.5).toFixed(1);
          const baseCoords = bus.coordinates || { x: 50, y: 50 };
          return {
            ...bus,
            dynamicCoords: {
              x: Math.max(12, Math.min(88, (baseCoords.x || 50) + parseFloat(deltaX))),
              y: Math.max(15, Math.min(85, (baseCoords.y || 50) + parseFloat(deltaY))),
            },
          };
        })
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const safeBuses = Array.isArray(buses) ? buses : [];
  const filteredBuses = safeBuses.filter((b) => {
    if (!b) return false;
    if (selectedRouteFilter !== 'ALL' && b.routeId !== selectedRouteFilter) return false;
    if (selectedStatusFilter !== 'ALL' && b.operationalStatus !== selectedStatusFilter) return false;
    return true;
  });

  const activeBus = safeBuses.find((b) => b.id === activeBusId) || safeBuses[0] || {};

  const handleBusClick = (b) => {
    setActiveBusId(b.id);
    if (onSelectBus) onSelectBus(b);
  };

  const handleOpenShare = (e, bus) => {
    e.stopPropagation();
    setBusToShare(bus || activeBus);
    setShareModalOpen(true);
  };

  return (
    <div
      className={cn(
        'relative w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-xl transition-all duration-300 text-left bg-[#E8ECEF] font-sans',
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

      {/* Top Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-md">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Live GPS Telemetry ({filteredBuses.length} Buses Active)</span>
        </div>

        {/* WhatsApp Location Export Button */}
        <button
          type="button"
          onClick={(e) => handleOpenShare(e, activeBus)}
          className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold font-mono text-xs shadow-md inline-flex items-center space-x-1.5 border border-emerald-400"
        >
          <Share2 className="w-4 h-4" />
          <span>Export / Share on WhatsApp</span>
        </button>
      </div>

      {/* Dynamic Moving Bus Markers */}
      {filteredBuses.map((bus) => {
        const coords = bus.dynamicCoords || bus.coordinates;
        const isActive = bus.id === activeBusId;

        return (
          <div
            key={bus.id}
            onClick={() => handleBusClick(bus)}
            className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
            style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
          >
            <div
              className={cn(
                'flex items-center space-x-1.5 px-2.5 py-1 rounded-full shadow-lg border transition-all',
                isActive
                  ? 'bg-[#0B3D91] text-white border-amber-400 ring-4 ring-[#0B3D91]/30 scale-110'
                  : 'bg-white text-slate-900 border-slate-400 font-bold hover:scale-105'
              )}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Bus className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs font-mono font-bold">{bus.busNumber}</span>
            </div>
          </div>
        );
      })}

      {/* Selected Bus Detail Card */}
      {activeBus && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-40">
          <BusDetailCard
            bus={activeBus}
            onAddToFavorites={onAddToFavorites}
            onClose={() => setActiveBusId(null)}
          />
        </div>
      )}

      {/* WhatsApp Share Location Modal */}
      <LocationShareModal
        isOpen={shareModalOpen}
        bus={busToShare}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}

export default LiveTransitMap;
