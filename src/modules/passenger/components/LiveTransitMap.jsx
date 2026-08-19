import React, { useState, useEffect, useRef } from 'react';
import {
  Bus,
  MapPin,
  Navigation,
  Compass,
  Radio,
  Users,
  Filter,
  RotateCcw,
  X,
  Clock,
  Share2,
  ZoomIn,
  ZoomOut,
  Layers,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { MOCK_PASSENGER_BUSES } from '../../../data/passenger/mockBuses.js';
import { MOCK_PASSENGER_STOPS } from '../../../data/passenger/mockStops.js';
import { LocationShareModal } from '../../../components/maps/LocationShareModal.jsx';
import { RealisticCityCanvas } from '../../../components/maps/RealisticCityCanvas.jsx';
import { BusMapMarker, StopMapMarker } from '../../../components/maps/MapMarkerPrimitives.jsx';
import { BusDetailCard } from './BusDetailCard.jsx';
import { cn } from '../../../utils/index.js';

export function LiveTransitMap({
  selectedBusId = 'b-245',
  onSelectBus,
  onAddToFavorites,
  className = '',
}) {
  const [buses, setBuses] = useState(MOCK_PASSENGER_BUSES);
  const [stops] = useState(MOCK_PASSENGER_STOPS);
  const [selectedRouteFilter, setSelectedRouteFilter] = useState('ALL');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('ALL');
  const [activeBusId, setActiveBusId] = useState(selectedBusId);
  const [selectedStop, setSelectedStop] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [busToShare, setBusToShare] = useState(null);

  // Map View Mode & Layers
  const [mapMode, setMapMode] = useState('City'); // 'City', 'Traffic', 'Routes', 'Satellite'
  const [showStops, setShowStops] = useState(true);
  const [showTraffic, setShowTraffic] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  // Zoom & Pan State
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialPanX: 0, initialPanY: 0 });
  const mapContainerRef = useRef(null);

  // Simulate vehicle motion along organic city paths
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        (Array.isArray(prev) ? prev : []).map((bus, idx) => {
          const deltaX = (Math.sin(Date.now() / 3500 + idx * 1.2) * 1.6).toFixed(1);
          const deltaY = (Math.cos(Date.now() / 3500 + idx * 1.2) * 1.6).toFixed(1);
          const baseCoords = bus.coordinates || { x: 50, y: 50 };
          return {
            ...bus,
            dynamicCoords: {
              x: Math.max(15, Math.min(88, (baseCoords.x || 50) + parseFloat(deltaX))),
              y: Math.max(18, Math.min(85, (baseCoords.y || 50) + parseFloat(deltaY))),
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

  const activeBus = safeBuses.find((b) => b.id === activeBusId) || safeBuses[0] || null;

  const handleBusClick = (b) => {
    setActiveBusId(b.id);
    setSelectedStop(null);
    if (onSelectBus) onSelectBus(b);
  };

  const handleStopClick = (stop) => {
    setSelectedStop(stop);
  };

  const handleOpenShare = (e, bus) => {
    e.stopPropagation();
    setBusToShare(bus || activeBus || safeBuses[0]);
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

  // Mouse pan handlers for desktop
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
      ref={mapContainerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={cn(
        'relative w-full h-[540px] sm:h-[640px] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-xl transition-all duration-300 text-left font-sans select-none',
        mapMode === 'Satellite' ? 'bg-[#0F172A]' : 'bg-[#F4F7FB]',
        isDragging ? 'cursor-grabbing' : 'cursor-grab',
        className
      )}
    >
      {/* MAP VIEWPORT (Pan & Zoom Transformation Layer) */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-100 ease-out origin-center"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
        }}
      >
        {/* REALISTIC HIGH-FIDELITY VECTOR CITY CANVAS */}
        <RealisticCityCanvas
          isSatellite={mapMode === 'Satellite'}
          showTraffic={showTraffic || mapMode === 'Traffic'}
          showRoutes={showRoutes || mapMode === 'Routes'}
          showLabels={showLabels}
          activeRouteId={selectedRouteFilter !== 'ALL' ? selectedRouteFilter : (activeBus?.routeId || null)}
        />

        {/* BUS STOP PINS LAYER */}
        {showStops &&
          stops.map((stop) => {
            const isSelected = selectedStop?.id === stop.id;
            return (
              <div
                key={stop.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStopClick(stop);
                }}
                className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer no-pan"
                style={{ left: `${stop.coordinates.x}%`, top: `${stop.coordinates.y}%` }}
              >
                <StopMapMarker
                  stopCode={stop.code}
                  stopName={stop.name}
                  eta={stop.incomingBuses?.[0]?.eta || ''}
                  hasKiosk={stop.hasKiosk}
                  isSelected={isSelected}
                />
              </div>
            );
          })}

        {/* DYNAMIC MOVING REALISTIC VEHICLE MARKERS */}
        {filteredBuses.map((bus) => {
          const coords = bus.dynamicCoords || bus.coordinates || { x: 50, y: 50 };
          const isActive = bus.id === activeBusId;

          return (
            <div
              key={bus.id}
              onClick={(e) => {
                e.stopPropagation();
                handleBusClick(bus);
              }}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-700 ease-out no-pan"
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
            >
              <BusMapMarker
                busNumber={bus.busNumber}
                routeCode={bus.routeId}
                heading={bus.heading || 45}
                status={bus.operationalStatus || 'LIVE'}
                occupancyPercent={bus.occupancyPercent || 60}
                speed={bus.speed || '38 km/h'}
                isSelected={isActive}
              />
            </div>
          );
        })}
      </div>

      {/* =================================================================== */}
      {/* FLOATING TOP HUD BAR (Map Mode Switcher, Telemetry Pulse, Share)    */}
      {/* =================================================================== */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-40 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left: View Mode Pills */}
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
            onClick={() => {
              setMapMode('Traffic');
              setShowTraffic(true);
            }}
            className={cn(
              'px-2.5 sm:px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer',
              mapMode === 'Traffic'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            Traffic
          </button>
          <button
            type="button"
            onClick={() => {
              setMapMode('Routes');
              setShowRoutes(true);
            }}
            className={cn(
              'px-2.5 sm:px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer',
              mapMode === 'Routes'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            )}
          >
            Corridors
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

        {/* Right: GPS Telemetry Badge & WhatsApp Share */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 shadow-md">
            <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Telemetry: {filteredBuses.length} Vehicles Active</span>
          </div>

          <button
            type="button"
            onClick={(e) => handleOpenShare(e, activeBus)}
            className="px-3 py-1.5 sm:py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold font-mono text-xs shadow-md inline-flex items-center space-x-1.5 border border-emerald-400 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share Location</span>
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SECONDARY CORRIDOR ROUTE FILTERS                                    */}
      {/* =================================================================== */}
      <div className="absolute top-16 sm:top-18 left-3 sm:left-4 z-40 flex flex-wrap items-center gap-1.5 pointer-events-auto">
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-md text-xs font-mono">
          <span className="px-2 text-[10px] text-slate-400 uppercase font-bold hidden sm:inline">Line:</span>
          {['ALL', 'RT-108', 'RT-204', 'RT-302', 'RT-415'].map((route) => (
            <button
              key={route}
              type="button"
              onClick={() => setSelectedRouteFilter(route)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer',
                selectedRouteFilter === route
                  ? 'bg-[#0B3D91] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              )}
            >
              {route}
            </button>
          ))}
        </div>
      </div>

      {/* =================================================================== */}
      {/* RIGHT FLOATING ZOOM & PAN NAVIGATION CONTROLS                      */}
      {/* =================================================================== */}
      <div className="absolute top-28 sm:top-32 right-3 sm:right-4 z-40 flex flex-col space-y-1.5 pointer-events-auto">
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

        {/* Layer Toggles Popup/Pill */}
        <div className="p-1.5 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-md flex flex-col space-y-1 text-[11px] font-mono text-slate-700 dark:text-slate-300">
          <label className="flex items-center space-x-1.5 cursor-pointer px-1">
            <input
              type="checkbox"
              checked={showStops}
              onChange={(e) => setShowStops(e.target.checked)}
              className="rounded text-[#0B3D91] w-3 h-3"
            />
            <span>Stops</span>
          </label>
          <label className="flex items-center space-x-1.5 cursor-pointer px-1">
            <input
              type="checkbox"
              checked={showTraffic}
              onChange={(e) => setShowTraffic(e.target.checked)}
              className="rounded text-[#0B3D91] w-3 h-3"
            />
            <span>Traffic</span>
          </label>
          <label className="flex items-center space-x-1.5 cursor-pointer px-1">
            <input
              type="checkbox"
              checked={showRoutes}
              onChange={(e) => setShowRoutes(e.target.checked)}
              className="rounded text-[#0B3D91] w-3 h-3"
            />
            <span>Routes</span>
          </label>
        </div>
      </div>

      {/* =================================================================== */}
      {/* SELECTED BUS DETAIL CARD (BOTTOM OVERLAY)                           */}
      {/* =================================================================== */}
      {activeBus && (
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 sm:left-auto sm:right-4 sm:w-96 z-40 pointer-events-auto">
          <BusDetailCard
            bus={activeBus}
            onAddToFavorites={onAddToFavorites}
            onClose={() => setActiveBusId(null)}
          />
        </div>
      )}

      {/* =================================================================== */}
      {/* SELECTED BUS STOP POPOVER (BOTTOM LEFT OVERLAY)                     */}
      {/* =================================================================== */}
      {selectedStop && !activeBus && (
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 sm:w-88 z-40 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-300 dark:border-slate-700 shadow-xl pointer-events-auto text-left space-y-2.5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#0B3D91] text-white">
                  {selectedStop.code}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{selectedStop.zone}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans mt-0.5">
                {selectedStop.name}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setSelectedStop(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 pt-1 border-t border-slate-200 dark:border-slate-800">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Incoming Buses</span>
            {selectedStop.incomingBuses?.map((bus, idx) => (
              <div
                key={idx}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-xs font-mono"
              >
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{bus.busNumber}</span>
                  <span className="text-slate-500 ml-1.5 text-[11px]">&rarr; {bus.destination}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 font-bold">
                  {bus.eta}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WHATSAPP LOCATION SHARE MODAL */}
      <LocationShareModal
        isOpen={shareModalOpen}
        bus={busToShare}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
}

export default LiveTransitMap;
