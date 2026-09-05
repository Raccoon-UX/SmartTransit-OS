import React, { useState } from 'react';
import { Bus, Search, Filter, Eye, Database, MapPin } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function FleetTable({
  fleet = [],
  onSelectBus,
  onOpenMaintenance,
  className = '',
}) {
  const [search, setSearch] = useState('');
  const [operatorFilter, setOperatorFilter] = useState('ALL');
  const [regionFilter, setRegionFilter] = useState('ALL');

  const safeFleet = Array.isArray(fleet) ? fleet : [];

  // Extract distinct operators and regions for filters
  const availableOperators = ['ALL', ...Array.from(new Set(safeFleet.map((b) => b.operator || b.busType).filter(Boolean)))];
  const availableRegions = ['ALL', ...Array.from(new Set(safeFleet.map((b) => b.region).filter(Boolean)))];

  const filteredFleet = safeFleet.filter((bus) => {
    if (!bus) return false;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      bus.busNumber?.toLowerCase().includes(q) ||
      bus.rawBusNumber?.toLowerCase().includes(q) ||
      bus.operator?.toLowerCase().includes(q) ||
      bus.origin?.toLowerCase().includes(q) ||
      bus.destination?.toLowerCase().includes(q) ||
      bus.area?.toLowerCase().includes(q) ||
      bus.region?.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (operatorFilter !== 'ALL' && (bus.operator || bus.busType) !== operatorFilter) return false;
    if (regionFilter !== 'ALL' && bus.region !== regionFilter) return false;
    return true;
  });

  return (
    <div className={cn('p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 text-left', className)}>
      {/* Provenance Badge & Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-bold border border-emerald-200 dark:border-emerald-800">
            <Database className="w-3.5 h-3.5" />
            <span>Source: Regional Transit Dataset (maharashtra_transit_analysis.csv)</span>
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Showing {filteredFleet.length} of {safeFleet.length} buses
          </span>
        </div>
      </div>

      {/* Table Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by bus number, operator, origin, destination, area, or region..."
            className="w-full pl-10 pr-4 py-2 rounded-2xl border text-xs bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-transit-500"
          />
        </div>

        {/* Operator Filter Pills */}
        <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase px-1">Operator:</span>
          {availableOperators.map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => setOperatorFilter(op)}
              className={cn(
                'px-2.5 py-1 rounded-xl font-bold transition-colors cursor-pointer text-xs',
                operatorFilter === op
                  ? 'bg-transit-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              {op}
            </button>
          ))}
        </div>
      </div>

      {/* Region Dropdown Filter */}
      <div className="flex items-center space-x-2 text-xs font-mono">
        <MapPin className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-500 dark:text-slate-400 font-bold">Region/District:</span>
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="px-3 py-1 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-transit-500"
        >
          {availableRegions.map((reg) => (
            <option key={reg} value={reg}>
              {reg === 'ALL' ? 'All Regions & Districts' : reg}
            </option>
          ))}
        </select>
      </div>

      {/* Fleet Data Table */}
      <div className="overflow-x-auto min-w-0 w-full rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 uppercase text-[10px] bg-slate-50/80 dark:bg-slate-950/80">
              <th className="py-3 px-3 whitespace-nowrap">Bus Number</th>
              <th className="py-3 px-3 whitespace-nowrap">Operator / Type</th>
              <th className="py-3 px-3 whitespace-nowrap">Operating Area</th>
              <th className="py-3 px-3 whitespace-nowrap">Route (Origin ➔ Destination)</th>
              <th className="py-3 px-3 whitespace-nowrap">Region / District</th>
              <th className="py-3 px-3 whitespace-nowrap">Data Status</th>
              <th className="py-3 px-3 text-right whitespace-nowrap">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredFleet.map((bus) => (
              <tr key={bus.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  <div className="flex items-center space-x-2">
                    <Bus className="w-4 h-4 text-transit-500 dark:text-sky-400" />
                    <span>{bus.rawBusNumber || bus.busNumber}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal block">{bus.serial || bus.id}</span>
                </td>
                <td className="py-3 px-3 font-bold">
                  <span className={cn('px-2 py-0.5 rounded text-[11px] font-bold border', bus.operatorBadgeBg || 'bg-slate-100 text-slate-700 border-slate-200')}>
                    {bus.operator || bus.busType}
                  </span>
                </td>
                <td className="py-3 px-3 text-slate-800 dark:text-slate-200 font-medium">
                  {bus.area}
                </td>
                <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                  <div className="font-bold text-slate-900 dark:text-white">{bus.origin} ➔ {bus.destination}</div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Endpoints only (No intermediate stop data)</span>
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-700 dark:text-slate-300">
                    {bus.region}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                    ● Canonical Regional
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => onSelectBus?.(bus)}
                    className="p-1.5 rounded-lg text-slate-500 dark:text-slate-300 hover:text-transit-500 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors inline-flex items-center space-x-1 cursor-pointer"
                    title="View Bus Detail"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
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
