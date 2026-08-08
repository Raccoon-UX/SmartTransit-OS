import React, { useState } from 'react';
import { Bus, MapPin, Navigation, Clock, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { BusCard } from '../../../components/cards/BusCard.jsx';
import { RouteCard } from '../../../components/cards/RouteCard.jsx';
import { WaypointNode } from '../../../components/maps/RoutePathPrimitives.jsx';
import { GaugeDonut } from '../../../components/dataviz/GaugeDonut.jsx';
import { cn } from '../../../utils/index.js';

export function InteractiveMapDemo({ className = '' }) {
  const [selectedRoute, setSelectedRoute] = useState('RT-108');

  return (
    <div
      className={cn(
        'p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl text-left text-white space-y-6',
        className
      )}
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 telemetry-live" />
            <h3 className="text-lg font-bold font-sans">Simulated Metropolitan Fleet Telemetry</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive demonstration of live GPS updates, vehicle motion, and occupancy gauge.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {['RT-108', 'RT-204', 'RT-302'].map((routeId) => (
            <button
              key={routeId}
              type="button"
              onClick={() => setSelectedRoute(routeId)}
              className={cn(
                'text-xs font-mono font-bold px-3 py-1.5 rounded-xl transition-all',
                selectedRoute === routeId
                  ? 'bg-transit-500 text-white shadow-glow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              )}
            >
              {routeId}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Demo Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Simulated Transit Canvas / Waypoint Progression */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-transit-400">
              Active Transit Corridor • {selectedRoute}
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">
              Live Stream Active (2s Sync)
            </span>
          </div>

          {/* Timeline Waypoint Progression */}
          <div className="space-y-3 pt-2">
            <WaypointNode stopName="Borivali Central Hub (BST-001)" stopCode="BST-001" isPassed={true} />
            <WaypointNode stopName="Kandivali Flyover Express (BST-024)" stopCode="BST-024" isPassed={true} />
            <WaypointNode stopName="Western Highway Exchange (BST-104)" stopCode="BST-104" isCurrent={true} eta="Arriving (2 min)" />
            <WaypointNode stopName="Andheri West Metro Terminal (BST-208)" stopCode="BST-208" isDestination={true} eta="In 14 mins" />
          </div>
        </div>

        {/* Right 1 Col: Floating Live Bus 245 Card & Occupancy Meter */}
        <div className="space-y-4">
          <BusCard
            busNumber="Bus 245"
            routeCode={selectedRoute}
            origin="Borivali Central"
            destination="Andheri West Hub"
            eta="2 mins"
            occupancyPercent={78}
            occupancyStatus="HIGH"
            status="LIVE"
            nextStop="Western Highway Exchange"
          />

          <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                Crowd Density Gauge
              </span>
              <div className="text-sm font-bold text-white mt-0.5">42 / 54 Seats Occupied</div>
              <span className="text-xs text-amber-400 font-mono">Moderate Crowding</span>
            </div>
            <GaugeDonut value={78} size={65} color="#f59e0b" label="78%" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveMapDemo;
