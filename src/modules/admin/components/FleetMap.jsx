import React, { useState, useRef } from 'react';
import {
  Bus,
  MapPin,
  Navigation,
  Filter,
  RotateCcw,
  Radio,
  Gauge,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  X,
  Share2,
  Layers,
  ZoomIn,
  ZoomOut,
  Compass,
  Search,
} from 'lucide-react';
import { MOCK_ADMIN_FLEET } from '../../../data/admin/adminFleet.js';
import { LocationShareModal } from '../../../components/maps/LocationShareModal.jsx';
import { RealisticCityCanvas } from '../../../components/maps/RealisticCityCanvas.jsx';
import { BusMapMarker } from '../../../components/maps/MapMarkerPrimitives.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function FleetMap({ onSelectBus, className = '' }) {
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [mapMode, setMapMode] = useState('City'); // 'City', 'Traffic', 'Satellite'
  const [hoveredBus, setHoveredBus] = useState(null);
  const [selectedBus, setSelectedBus] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [busToShare, setBusToShare] = useState(null);
  const [fleet] = useState(MOCK_ADMIN_FLEET);

  // Zoom & Pan State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialPanX: 0, initialPanY: 0 });

  const safeFleet = Array.isArray(fleet) ? fleet : [];
  const filteredFleet = safeFleet.filter((bus) => {
    if (!bus) return false;
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'HIGH_OCCUPANCY') return (bus.occupancyPercent || 0) >= 75;
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

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.2));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (e.target.closest('button, input, select, .no-pan')) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: panOffset.x,
      initialPanY: panOffset.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPanOffset({
      x: dragStartRef.current.initialPanX + dx,
      y: dragStartRef.current.initialPanY + dy,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn(
        'relative w-full h-[520px] sm:h-[620px] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-xl text-left select-none font-sans min-w-0 box-border',
        mapMode === 'Satellite' ? 'bg-[#0F172A]' : 'bg-[#F4F7FB]',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
        className
      )}
    >
      {/* ZOOM & PAN WRAPPER */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out origin-center"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
        }}
      >
        {/* REALISTIC HIGH-FIDELITY VECTOR CITY CANVAS */}
        <RealisticCityCanvas
          isSatellite={mapMode === 'Satellite'}
          showTraffic={mapMode === 'Traffic'}
          showRoutes={true}
          showLabels={true}
          showLandmarks={true}
          activeRouteId={selectedBus?.routeId || null}
        />

        {/* REAL-TIME MOVING FLEET BUS MARKERS */}
        {filteredFleet.map((bus) => {
          const isSelected = selectedBus?.id === bus.id;
          const isHovered = hoveredBus?.id === bus.id;

          return (
            <div
              key={bus.id}
              onClick={(e) => {
                e.stopPropagation();
                handleBusClick(bus);
              }}
              onMouseEnter={() => setHoveredBus(bus)}
              onMouseLeave={() => setHoveredBus(null)}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 no-pan"
              style={{ left: `${bus.coordinates.x}%`, top: `${bus.coordinates.y}%` }}
            >
              <BusMapMarker
                busNumber={bus.busNumber || bus.id}
                routeCode={bus.routeId}
                heading={bus.heading || 45}
                status={bus.status || 'ACTIVE'}
                occupancyPercent={bus.occupancyPercent || 60}
                speed={`${bus.speed} km/h`}
                isSelected={isSelected}
              />

              {/* Hover Quick Card Popup */}
              {(isHovered || isSelected) && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-56 p-3.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-2xl text-xs font-sans text-slate-900 dark:text-white z-40 pointer-events-auto">
                  <div className="flex items-center justify-between font-bold border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-1.5">
                    <span className="font-extrabold">{bus.busNumber || bus.id}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#0B3D91] text-white">
                      {bus.routeId}
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px] font-mono text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span>Speed:</span>
                      <strong className="text-slate-900 dark:text-white">{bus.speed} km/h</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Occupancy:</span>
                      <strong className="text-slate-900 dark:text-white">{bus.occupancyPercent}%</strong>
                    </div>
                    <div className="truncate">
                      <span className="text-slate-400">Next: </span>
                      <strong className="text-slate-900 dark:text-white">{bus.nextStop}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800 mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={(e) => handleOpenShare(e, bus)}
                      className="text-[10px] font-bold text-[#25D366] hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>WhatsApp Share</span>
                    </button>
                    <span className="text-[9px] text-emerald-600 font-mono font-bold">● Live GPS</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* TOP HEADER CONTROLS BAR (Map Mode Switcher, Status Filters, Share)  */}
      {/* =================================================================== */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-40 flex flex-wrap items-center justify-between gap-2 pointer-events-none max-w-full">
        {/* Left: Map Type Switcher */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-md text-xs font-mono pointer-events-auto">
          <button
            type="button"
            onClick={() => setMapMode('City')}
            className={cn(
              'px-2.5 sm:px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer',
              mapMode === 'City'
                ? 'bg-[#0B3D91] text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            City Light
          </button>
          <button
            type="button"
            onClick={() => setMapMode('Traffic')}
            className={cn(
              'px-2.5 sm:px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer',
              mapMode === 'Traffic'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            Traffic Layer
          </button>
          <button
            type="button"
            onClick={() => setMapMode('Satellite')}
            className={cn(
              'px-2.5 sm:px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer',
              mapMode === 'Satellite'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            Satellite
          </button>
        </div>

        {/* Center/Right: Status Filters & Share */}
        <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-md text-xs font-mono">
            <span className="text-[10px] text-slate-400 font-bold uppercase px-1.5 hidden sm:inline">Filter:</span>
            {['ALL', 'ACTIVE', 'DELAYED', 'HIGH_OCCUPANCY'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={cn(
                  'px-2 sm:px-2.5 py-1 rounded-lg transition-colors font-bold text-[11px] cursor-pointer',
                  statusFilter === st
                    ? 'bg-[#0B3D91] text-white'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                )}
              >
                {st === 'HIGH_OCCUPANCY' ? 'Occupancy' : st}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => handleOpenShare(e, selectedBus || fleet[0])}
            className="px-3 py-1.5 sm:py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold font-mono text-xs shadow-md inline-flex items-center space-x-1.5 border border-emerald-400 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Fleet</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* RIGHT FLOATING ZOOM & VIEW CONTROLS                                 */}
      {/* =================================================================== */}
      <div className="absolute top-24 sm:top-28 right-3 sm:right-4 z-40 flex flex-col space-y-1.5 pointer-events-auto">
        <div className="p-1 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-1 text-slate-700 dark:text-slate-200">
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-[#0B3D91]"
            title="Fit Fleet View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* BOTTOM STATUS BAR OVERLAY                                           */}
      {/* =================================================================== */}
      <div className="absolute bottom-3 left-3 sm:left-4 right-3 sm:right-4 z-30 flex items-center justify-between pointer-events-auto">
        <div className="px-3 py-1 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 shadow-xs flex items-center space-x-2">
          <span className="text-[#0B3D91] dark:text-sky-400 font-extrabold">SmartTransit Real-Time Map</span>
          <span className="hidden sm:inline">• Metropolitan Fleet Control</span>
        </div>
      </div>

      {/* SHARE / EXPORT LOCATION MODAL */}
      <LocationShareModal
        isOpen={shareModalOpen}
        bus={busToShare}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}

export default FleetMap;
