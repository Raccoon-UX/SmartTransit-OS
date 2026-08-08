import React, { useState } from 'react';
import { Bus, MapPin, Navigation, Filter, RotateCcw, Radio, Gauge, Users, Clock, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { MOCK_ADMIN_FLEET } from '../../../data/admin/adminFleet.js';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function FleetMap({ onSelectBus, className = '' }) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [hoveredBus, setHoveredBus] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
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

  return (
    <div
      className={cn(
        'relative w-full h-[480px] sm:h-[580px] rounded-3xl overflow-hidden border shadow-2xl transition-all text-left',
        'bg-slate-950 border-slate-700/80 min-w-0 box-border',
        className
      )}
    >
      {/* City Network Overlay Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none stroke-slate-500/40">
        <defs>
          <pattern id="admin-map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#admin-map-grid)" />
      </svg>

      {/* Dynamic Route Vectors & Animated Path Highlight */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <path d="M 60 140 Q 180 180, 260 260 T 480 320 T 720 400" fill="none" stroke="#0c87eb" strokeWidth="4" className="opacity-70" />
        <path d="M 120 420 Q 300 340, 440 220 T 680 140" fill="none" stroke="#06b6d4" strokeWidth="3.5" className="opacity-60" />
        {selectedBus && (
          <path
            d={`M ${selectedBus.coordinates?.x * 7.5} ${selectedBus.coordinates?.y * 5} L 480 320`}
            fill="none"
            stroke="#a855f7"
            strokeWidth="4"
            strokeDasharray="8 4"
            className="animate-pulse opacity-90"
          />
        )}
      </svg>

      {/* Filter Control Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto max-w-full">
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700 text-xs font-mono max-w-full">
          <span className="text-[10px] text-slate-400 font-bold uppercase px-2">Map Filter:</span>
          {['ALL', 'ACTIVE', 'DELAYED', 'HIGH_OCCUPANCY', 'OFFLINE'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-2.5 py-1 rounded-xl transition-colors font-bold',
                statusFilter === st
                  ? 'bg-transit-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-emerald-400">
          <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
          <span>Live Telemetry Active ({filteredFleet.length} Vehicles Visible)</span>
        </div>
      </div>

      {/* Moving Interactive Bus Markers */}
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
            {/* Marker Icon Pin */}
            <div
              className={cn(
                'w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl border-2 transition-all',
                isSelected ? 'ring-4 ring-purple-500 scale-125 bg-purple-600 border-white' :
                bus.status === 'DELAYED'
                  ? 'bg-amber-500 border-amber-300'
                  : bus.status === 'OFFLINE'
                  ? 'bg-slate-700 border-slate-500'
                  : 'bg-transit-500 border-white',
                isHovered && !isSelected && 'scale-110'
              )}
            >
              <Bus className="w-4 h-4" />
            </div>

            {/* Compact Label */}
            <div className="mt-1 px-2 py-0.5 rounded-full bg-slate-950/95 border border-slate-700 text-white text-[10px] font-mono font-bold shadow whitespace-nowrap">
              {bus.busNumber} ({bus.routeId})
            </div>

            {/* Hover Compact Preview Chip */}
            {isHovered && !isSelected && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2.5 rounded-2xl bg-slate-900/95 text-white border border-slate-700 shadow-2xl z-40 text-xs font-mono space-y-1 pointer-events-none">
                <div className="flex items-center justify-between font-bold text-transit-400">
                  <span>{bus.busNumber}</span>
                  <span className="text-[10px] text-slate-400">{bus.routeId}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>Speed: {bus.speed}</span>
                  <span>Occupancy: {bus.occupancyPercent}%</span>
                </div>
                <div className="text-[10px] text-slate-400 truncate">Next: {bus.nextStop}</div>
              </div>
            )}
          </div>
        );
      })}

      {/* Interactive Vehicle Drawer Overlay */}
      {selectedBus && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md text-white border border-slate-700 shadow-2xl z-40 space-y-3 font-mono animate-fade-in text-left">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-xl bg-transit-500/20 text-transit-400 flex items-center justify-center font-bold">
                <Bus className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-sans">{selectedBus.busNumber}</h4>
                <p className="text-[10px] text-slate-400">{selectedBus.routeName}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedBus(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-slate-850 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">ETA Next Stop</span>
              <span className="font-bold text-transit-400 text-sm">{selectedBus.eta}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-850 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Cruising Speed</span>
              <span className="font-bold text-white text-sm">{selectedBus.speed}</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-850 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Occupancy</span>
              <span className="font-bold text-emerald-400 text-sm">{selectedBus.occupancyPercent}%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-850 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Assigned Driver</span>
              <span className="font-bold text-white text-xs truncate block">{selectedBus.driverName}</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-300 space-y-0.5 pt-1 border-t border-slate-800">
            <div><strong>Location:</strong> {selectedBus.currentLocation}</div>
            <div><strong>Next Stop:</strong> {selectedBus.nextStop}</div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-emerald-400 pt-1">
            <span className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
              <span>GPS LIVE • Updated 2 sec ago</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default FleetMap;
