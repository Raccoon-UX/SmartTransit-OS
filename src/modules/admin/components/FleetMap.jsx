import React, { useState } from 'react';
import { Bus, MapPin, Navigation, Filter, RotateCcw, Radio, Gauge, Users, Clock, ArrowRight, ShieldCheck, X, Share2, Layers, ZoomIn, ZoomOut, Compass, Search } from 'lucide-react';
import { MOCK_ADMIN_FLEET } from '../../../data/admin/adminFleet.js';
import { LocationShareModal } from '../../../components/maps/LocationShareModal.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function FleetMap({ onSelectBus, className = '' }) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [mapMode, setMapMode] = useState('Map'); // 'Map', 'Satellite', 'Traffic'
  const [hoveredBus, setHoveredBus] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [busToShare, setBusToShare] = useState(null);
  const [fleet] = useState(MOCK_ADMIN_FLEET);

  const filteredFleet = fleet.filter((bus) => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'HIGH_OCCUPANCY') return bus.occupancyPercent >= 75;
    return bus.status === statusFilter;
  });

  const handleBusClick = (bus) => {
    setSelectedBus(bus);
    if (onSelectBus) onSelectBus(bus);
  };

  const handleOpenShare = (e, bus) => {
    e.stopPropagation();
    setBusToShare(bus || selectedBus || fleet[0]);
    setShareModalOpen(true);
  };

  return (
    <div
      className={cn(
        'relative w-full h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-xl text-left select-none font-sans min-w-0 box-border',
        mapMode === 'Satellite' ? 'bg-slate-900' : 'bg-[#E8ECEF]',
        className
      )}
    >
      {/* REALISTIC GOOGLE MAPS LIGHT THEME CANVAS */}
      {mapMode !== 'Satellite' ? (
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Water Bodies (Sea / River) */}
          <path
            d="M 0 0 L 140 0 Q 220 180, 180 340 T 240 600 L 0 600 Z"
            fill="#A5C9EB"
            className="transition-colors duration-300"
          />
          <text x="50" y="280" fill="#3B82F6" className="text-[11px] font-sans font-bold opacity-60">Mahim Creek / Coastal Waterway</text>

          {/* Green Parks & Reserves */}
          <path
            d="M 680 40 Q 820 80, 960 160 L 960 40 Z"
            fill="#D2E8D4"
          />
          <text x="820" y="90" fill="#15803D" className="text-[10px] font-sans font-bold opacity-70">Central Park & Botanical Reserve</text>

          <path
            d="M 320 380 Q 420 340, 520 480 L 320 480 Z"
            fill="#D2E8D4"
          />

          {/* Secondary Road Grid (White Local Streets) */}
          <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <line x1="160" y1="120" x2="900" y2="120" />
            <line x1="180" y1="240" x2="960" y2="240" />
            <line x1="200" y1="360" x2="960" y2="360" />
            <line x1="220" y1="480" x2="960" y2="480" />
            
            <line x1="300" y1="40" x2="300" y2="560" />
            <line x1="450" y1="40" x2="450" y2="560" />
            <line x1="600" y1="40" x2="600" y2="560" />
            <line x1="750" y1="40" x2="750" y2="560" />
          </g>

          {/* Local Streets Borders (Grey Outlines) */}
          <g stroke="#CBD5E1" strokeWidth="1.5" fill="none">
            <line x1="160" y1="117" x2="900" y2="117" />
            <line x1="160" y1="123" x2="900" y2="123" />
            <line x1="180" y1="237" x2="960" y2="237" />
            <line x1="180" y1="243" x2="960" y2="243" />
            <line x1="200" y1="357" x2="960" y2="357" />
            <line x1="200" y1="363" x2="960" y2="363" />
          </g>

          {/* Primary Arterial Expressways (Google Maps Yellow Highways) */}
          <g stroke="#FFE082" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 180 80 Q 320 220, 520 280 T 880 480" fill="none" />
            <path d="M 220 520 Q 420 380, 620 220 T 920 80" fill="none" />
          </g>

          {/* Expressway Border Lines */}
          <g stroke="#F59E0B" strokeWidth="1" fill="none" opacity="0.6">
            <path d="M 180 75 Q 320 215, 520 275 T 880 475" />
            <path d="M 180 85 Q 320 225, 520 285 T 880 485" />
          </g>

          {/* Traffic Density Overlays (When Traffic mode is active) */}
          {mapMode === 'Traffic' && (
            <g stroke="#EF4444" strokeWidth="8" strokeDasharray="12 6" className="animate-pulse">
              <path d="M 320 220 L 520 280" fill="none" />
              <path d="M 420 380 L 620 220" fill="none" />
            </g>
          )}

          {/* Bus Stop Node Markers */}
          <g fill="#0B3D91" stroke="#FFFFFF" strokeWidth="2">
            <circle cx="300" cy="120" r="5" />
            <circle cx="450" cy="240" r="5" />
            <circle cx="600" cy="360" r="5" />
            <circle cx="750" cy="480" r="5" />
          </g>
        </svg>
      ) : (
        /* Satellite View Texture Grid */
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      )}

      {/* TOP HEADER CONTROLS BAR (Google Maps Header Style) */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto max-w-full">
        {/* Left: Map Type Switcher (Map | Satellite | Traffic) */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-md text-xs font-mono">
          <button
            type="button"
            onClick={() => setMapMode('Map')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-bold transition-colors',
              mapMode === 'Map' ? 'bg-[#0B3D91] text-white shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            Google Light
          </button>
          <button
            type="button"
            onClick={() => setMapMode('Satellite')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-bold transition-colors',
              mapMode === 'Satellite' ? 'bg-[#0B3D91] text-white shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            Satellite
          </button>
          <button
            type="button"
            onClick={() => setMapMode('Traffic')}
            className={cn(
              'px-3 py-1.5 rounded-lg font-bold transition-colors',
              mapMode === 'Traffic' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            Traffic Layer
          </button>
        </div>

        {/* Center/Right: Status Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-md text-xs font-mono">
          <span className="text-[10px] text-slate-500 font-bold uppercase px-2">Filter:</span>
          {['ALL', 'ACTIVE', 'DELAYED', 'HIGH_OCCUPANCY'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-2.5 py-1 rounded-lg transition-colors font-bold text-[11px]',
                statusFilter === st
                  ? 'bg-[#B83E12] text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              )}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Location Export & Share WhatsApp Button */}
        <button
          type="button"
          onClick={(e) => handleOpenShare(e, selectedBus || fleet[0])}
          className="px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold font-mono text-xs shadow-lg inline-flex items-center space-x-1.5 border border-emerald-400 transition-transform active:scale-95"
        >
          <Share2 className="w-4 h-4" />
          <span>Export / Share on WhatsApp</span>
        </button>
      </div>

      {/* REAL-TIME MOVING GOOGLE MAP PINS */}
      {filteredFleet.map((bus) => {
        const isSelected = selectedBus?.id === bus.id;
        const isHovered = hoveredBus?.id === bus.id;

        return (
          <div
            key={bus.id}
            onClick={() => handleBusClick(bus)}
            onMouseEnter={() => setHoveredBus(bus)}
            onMouseLeave={() => setHoveredBus(null)}
            className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
            style={{ left: `${bus.coordinates.x}%`, top: `${bus.coordinates.y}%` }}
          >
            {/* Google Map Bus Marker Pin */}
            <div
              className={cn(
                'flex items-center space-x-1.5 px-2.5 py-1 rounded-full shadow-lg border transition-all',
                isSelected
                  ? 'bg-[#0B3D91] text-white border-amber-400 ring-4 ring-[#0B3D91]/30 scale-110'
                  : bus.status === 'DELAYED'
                  ? 'bg-amber-500 text-slate-950 border-amber-300 font-bold'
                  : 'bg-white text-slate-900 border-slate-400 font-bold hover:scale-105'
              )}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <Bus className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs font-mono font-bold whitespace-nowrap">{bus.busNumber || bus.id}</span>
              <span className="text-[9px] opacity-75 font-mono">({bus.routeId})</span>
            </div>

            {/* Hover Quick Card Popup */}
            {(isHovered || isSelected) && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-52 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-2xl text-xs font-sans text-slate-900 dark:text-white z-40 pointer-events-auto">
                <div className="flex items-center justify-between font-bold border-b border-slate-200 dark:border-slate-800 pb-1 mb-1.5">
                  <span>{bus.busNumber || bus.id}</span>
                  <span className="text-[10px] font-mono text-[#0B3D91] dark:text-sky-400">{bus.routeId}</span>
                </div>
                <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                  <div>Speed: <strong className="text-slate-900 dark:text-white">{bus.speed} km/h</strong></div>
                  <div>Occupancy: <strong className="text-slate-900 dark:text-white">{bus.occupancyPercent}%</strong></div>
                  <div>Next Stop: <strong className="text-slate-900 dark:text-white">{bus.nextStop}</strong></div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => handleOpenShare(e, bus)}
                    className="text-[10px] font-bold text-[#25D366] hover:underline flex items-center space-x-1"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>WhatsApp Share</span>
                  </button>
                  <span className="text-[9px] text-slate-400 font-mono">GPS Live</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* GOOGLE MAPS BOTTOM CONTROLS & LOGO OVERLAY */}
      <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
        <div className="px-3 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 shadow-sm flex items-center space-x-2">
          <span className="text-[#0B3D91] dark:text-sky-400 font-black">Google Maps</span>
          <span>• Light Theme Vector Engine</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl shadow-md overflow-hidden text-slate-700 dark:text-slate-300 font-bold">
            <button type="button" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 border-b border-slate-200 dark:border-slate-800">
              <ZoomIn className="w-4 h-4" />
            </button>
            <button type="button" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Share / Export Location Modal */}
      <LocationShareModal
        isOpen={shareModalOpen}
        bus={busToShare}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}

export default FleetMap;
