import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { BusCard } from '../../../components/cards/BusCard.jsx';
import { WaypointNode } from '../../../components/maps/RoutePathPrimitives.jsx';
import { GaugeDonut } from '../../../components/dataviz/GaugeDonut.jsx';
import { cn } from '../../../utils/index.js';

export function InteractiveMapDemo({ className = '' }) {
  const [selectedRoute, setSelectedRoute] = useState('RT-108');

  return (
    <div
      className={cn(
        'p-5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-left text-slate-900 dark:text-white space-y-4 shadow-subtle',
        className
      )}
    >
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-300 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-2 font-mono font-bold text-xs">
            <Shield className="w-4 h-4 text-[#0B3D91] dark:text-sky-400 shrink-0" />
            <h3 className="text-sm font-bold font-sans">Simulated Fleet Telemetry Stream</h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Demonstration of real-time GPS coordinates, vehicle progress, and passenger occupancy.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {['RT-108', 'RT-204', 'RT-302'].map((routeId) => (
            <button
              key={routeId}
              type="button"
              onClick={() => setSelectedRoute(routeId)}
              className={cn(
                'text-xs font-mono font-bold px-3 py-1 rounded transition-colors',
                selectedRoute === routeId
                  ? 'bg-[#0B3D91] text-white border border-[#07275f]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
              )}
            >
              {routeId}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Waypoint Progression */}
        <div className="lg:col-span-2 p-4 rounded bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-2">
            <span className="text-xs font-mono font-bold uppercase text-[#0B3D91] dark:text-sky-400">
              Active Corridor • {selectedRoute}
            </span>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
              ● Live Stream Active
            </span>
          </div>

          <div className="space-y-2 pt-1">
            <WaypointNode stopName="Borivali Central Hub (BST-001)" stopCode="BST-001" isPassed={true} />
            <WaypointNode stopName="Kandivali Flyover Express (BST-024)" stopCode="BST-024" isPassed={true} />
            <WaypointNode stopName="Western Highway Exchange (BST-104)" stopCode="BST-104" isCurrent={true} eta="Arriving (2 min)" />
            <WaypointNode stopName="Andheri West Metro Terminal (BST-208)" stopCode="BST-208" isDestination={true} eta="In 14 mins" />
          </div>
        </div>

        {/* Right 1 Col: Flat Live Bus Card & Occupancy Meter */}
        <div className="space-y-3">
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

          <div className="p-3 rounded bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                Occupancy Gauge
              </span>
              <div className="text-xs font-bold text-slate-900 dark:text-white">42 / 54 Seats Occupied</div>
              <span className="text-[11px] text-amber-700 dark:text-amber-400 font-mono font-bold">High Occupancy</span>
            </div>
            <GaugeDonut value={78} size={54} color="#b45309" label="78%" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InteractiveMapDemo;
