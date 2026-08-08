import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Navigation, Compass, Radio, Users, Filter, RotateCcw, X, Clock } from 'lucide-react';
import { MOCK_PASSENGER_BUSES } from '../../../data/passenger/mockBuses.js';
import { MOCK_PASSENGER_STOPS } from '../../../data/passenger/mockStops.js';
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
  const [userLocation, setUserLocation] = useState({ x: 32, y: 52 });

  // Simulate vehicle motion on controlled interval
  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prev) =>
        prev.map((bus, idx) => {
          const deltaX = (Math.sin(Date.now() / 3500 + idx) * 1.5).toFixed(1);
          const deltaY = (Math.cos(Date.now() / 3500 + idx) * 1.5).toFixed(1);
          return {
            ...bus,
            dynamicCoords: {
              x: Math.max(12, Math.min(88, bus.coordinates.x + parseFloat(deltaX))),
              y: Math.max(15, Math.min(85, bus.coordinates.y + parseFloat(deltaY))),
            },
          };
        })
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const filteredBuses = buses.filter((b) => {
    if (selectedRouteFilter !== 'ALL' && b.routeId !== selectedRouteFilter) return false;
    if (selectedStatusFilter !== 'ALL' && b.operationalStatus !== selectedStatusFilter) return false;
    return true;
  });

  const activeBus = buses.find((b) => b.id === activeBusId) || buses[0];

  const handleBusClick = (b) => {
    setActiveBusId(b.id);
    if (onSelectBus) onSelectBus(b);
  };

  const handleRecenter = () => {
    setUserLocation({ x: 32, y: 52 });
  };

  return (
    <div
      className={cn(
        'relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden border shadow-2xl transition-all duration-300 text-left',
        'bg-slate-900 border-slate-700/80 dark:border-slate-800',
        className
      )}
    >
      {/* City Road Network Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none stroke-slate-500/40">
        <defs>
          <pattern id="passenger-map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#passenger-map-grid)" />
      </svg>

      {/* Transit Route Vectors */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* RT-108 Coastal Express Vector */}
        <path
          d="M 60 140 Q 180 180, 260 260 T 480 320 T 720 400"
          fill="none"
          stroke="#0c87eb"
          strokeWidth="4"
          strokeDasharray="6 6"
          className="opacity-70 animate-pulse"
        />
        {/* RT-204 Airport Link Vector */}
        <path
          d="M 120 420 Q 300 340, 440 220 T 680 140"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="3.5"
          className="opacity-70"
        />
        {/* RT-302 CBD Feeder Vector */}
        <path
          d="M 220 80 Q 360 200, 480 360 T 620 460"
          fill="none"
          stroke="#10b981"
          strokeWidth="3.5"
          className="opacity-60"
        />
      </svg>

      {/* Top Filter & Status Control Overlay */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-700 shadow-md text-xs font-mono">
          <span className="text-[10px] text-slate-400 px-2 font-bold uppercase">Route:</span>
          {['ALL', 'RT-108', 'RT-204', 'RT-302', 'RT-415'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRouteFilter(r)}
              className={cn(
                'px-2.5 py-1 rounded-xl transition-colors font-bold',
                selectedRouteFilter === r
                  ? 'bg-transit-500 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Right Live Stream Status Badge & Recenter */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleRecenter}
            className="p-2 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow flex items-center space-x-1 text-xs font-mono"
            title="Recenter Map on Your Location"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Recenter</span>
          </button>

          <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-slate-700 text-[11px] font-mono text-emerald-400 shadow">
            <span className="w-2 h-2 rounded-full bg-emerald-400 telemetry-live" />
            <span>Simulated Transit Stream Active</span>
          </div>
        </div>
      </div>

      {/* Bus Stop Markers */}
      {MOCK_PASSENGER_STOPS.map((stop) => (
        <div
          key={stop.id}
          className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
          style={{ left: `${stop.coordinates.x}%`, top: `${stop.coordinates.y}%` }}
        >
          <div className="w-6 h-6 rounded-full bg-slate-950 border-2 border-slate-400 flex items-center justify-center text-slate-200 shadow-md group-hover:scale-125 transition-transform">
            <MapPin className="w-3 h-3 text-transit-400" />
          </div>
          <div className="mt-1 px-2 py-0.5 rounded-md bg-slate-950/90 text-white text-[9px] font-mono font-semibold shadow opacity-75 group-hover:opacity-100 whitespace-nowrap border border-slate-800">
            {stop.name}
          </div>
        </div>
      ))}

      {/* Passenger Commuter Location Pin */}
      <div
        className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%` }}
      >
        <span className="absolute -inset-2 rounded-full bg-cyan-400/40 animate-ping pointer-events-none" />
        <div className="w-5 h-5 rounded-full bg-cyan-500 border-2 border-white flex items-center justify-center text-white shadow-lg">
          <Navigation className="w-2.5 h-2.5" />
        </div>
        <div className="mt-1 px-1.5 py-0.5 rounded bg-cyan-950/90 text-cyan-200 text-[8px] font-mono font-bold whitespace-nowrap shadow border border-cyan-700">
          You are here
        </div>
      </div>

      {/* Moving Live Bus Markers */}
      {filteredBuses.map((bus) => {
        const coords = bus.dynamicCoords || bus.coordinates;
        const isSelected = bus.id === activeBusId;

        return (
          <div
            key={bus.id}
            onClick={() => handleBusClick(bus)}
            className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-700 ease-out select-none"
            style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
          >
            {/* GPS Pulse */}
            <span className="absolute -inset-2 rounded-full bg-transit-500/40 animate-ping pointer-events-none" />

            <div
              className={cn(
                'w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold transition-transform shadow-2xl border',
                isSelected
                  ? 'bg-transit-500 border-white scale-125 ring-4 ring-transit-500/40'
                  : 'bg-transit-700 border-transit-400 hover:scale-110'
              )}
            >
              <Bus className="w-5 h-5" />
            </div>

            {/* Floating Live Badge */}
            <div className="mt-1.5 px-2 py-0.5 rounded-full bg-slate-950/95 border border-slate-700 text-white text-[10px] font-mono font-bold shadow-md flex items-center space-x-1 whitespace-nowrap">
              <span>{bus.busNumber}</span>
              <span className="text-emerald-400 font-normal">({bus.eta})</span>
            </div>
          </div>
        );
      })}

      {/* Floating Selected Bus Detail Card Overlay (Bottom Left) */}
      {activeBus && (
        <div className="absolute bottom-4 left-4 z-40 max-w-sm w-full pointer-events-auto">
          <BusDetailCard
            bus={activeBus}
            onClose={() => setActiveBusId(null)}
            onTrackOnMap={() => {
              console.log('Tracking bus:', activeBus.busNumber);
            }}
            onAddToFavorites={() => {
              if (onAddToFavorites) onAddToFavorites(activeBus);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default LiveTransitMap;
