import React, { useState } from 'react';
import { Bus, Search, Filter, ArrowRight, Eye, Wrench, ShieldCheck, Radio } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { OccupancyIndicator } from '../../passenger/components/OccupancyIndicator.jsx';
import { cn } from '../../../utils/index.js';

export function FleetTable({
  fleet = [],
  onSelectBus,
  onOpenMaintenance,
  className = '',
}) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredFleet = fleet.filter((bus) => {
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      bus.busNumber.toLowerCase().includes(q) ||
      bus.routeId.toLowerCase().includes(q) ||
      bus.driverName.toLowerCase().includes(q) ||
      bus.depot.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (statusFilter !== 'ALL' && bus.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className={cn('p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-left', className)}>
      {/* Table Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fleet by bus ID, route, pilot, or depot..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl border text-xs bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-transit-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
          <span className="text-[10px] text-slate-400 font-bold uppercase px-1">Status:</span>
          {['ALL', 'ACTIVE', 'DELAYED', 'IDLE', 'MAINTENANCE', 'OFFLINE'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-2.5 py-1 rounded-xl font-bold transition-colors',
                statusFilter === st
                  ? 'bg-transit-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-navy-850 text-slate-600 dark:text-slate-400 hover:text-white'
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Fleet Data Table */}
      <div className="overflow-x-auto min-w-0 w-full rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-50/50 dark:bg-navy-950/50">
              <th className="py-3 px-3 whitespace-nowrap">Vehicle</th>
              <th className="py-3 px-3 whitespace-nowrap">Route Line</th>
              <th className="py-3 px-3 whitespace-nowrap">Assigned Pilot</th>
              <th className="py-3 px-3 whitespace-nowrap">Occupancy</th>
              <th className="py-3 px-3 whitespace-nowrap">Cruising Speed</th>
              <th className="py-3 px-3 whitespace-nowrap">Location / Next Stop</th>
              <th className="py-3 px-3 whitespace-nowrap">GPS Sync</th>
              <th className="py-3 px-3 text-right whitespace-nowrap">Status</th>
              <th className="py-3 px-3 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {filteredFleet.map((bus) => (
              <tr key={bus.id} className="hover:bg-slate-50 dark:hover:bg-navy-850 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  <div className="flex items-center space-x-2">
                    <Bus className="w-4 h-4 text-transit-500" />
                    <span>{bus.busNumber}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-normal block">{bus.serial}</span>
                </td>
                <td className="py-3 px-3 text-transit-500 font-bold">{bus.routeId}</td>
                <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-sans font-bold">
                  {bus.driverName} ({bus.driverId})
                </td>
                <td className="py-3 px-3">
                  <OccupancyIndicator percent={bus.occupancyPercent} status={bus.occupancyStatus} size="sm" />
                </td>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{bus.speed}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  <div>{bus.currentLocation}</div>
                  <span className="text-[10px] text-transit-500 font-bold">Next: {bus.nextStop} ({bus.eta})</span>
                </td>
                <td className="py-3 px-3">
                  <span className={cn('text-[10px] font-bold', bus.gpsStatus === 'ONLINE' ? 'text-emerald-500' : 'text-slate-400')}>
                    ● {bus.gpsStatus} ({bus.lastUpdate})
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <StatusBadge status={bus.status} size="sm" />
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => onSelectBus(bus)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-transit-500 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors inline-flex items-center space-x-1"
                    title="View Telemetry Detail"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Details</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FleetTable;
