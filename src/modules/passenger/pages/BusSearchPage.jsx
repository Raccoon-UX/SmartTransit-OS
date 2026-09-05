import React, { useState, useEffect } from 'react';
import { Search, Filter, Bus, Route, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { transitService } from '../../../services/passenger/transitService.js';
import { BusCard } from '../../../components/cards/BusCard.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function BusSearchPage({ initialQuery = '', onNavigate }) {
  const [query, setQuery] = useState(initialQuery);
  const [buses, setBuses] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState('ALL'); // 'ALL' | 'BEST' | 'MBMT' | 'TMT' | 'NMMT' | 'VVMT' | 'KDMT' | 'MSRTC'
  const [sortBy, setSortBy] = useState('NUMBER'); // 'NUMBER' | 'AREA' | 'OPERATOR'

  useEffect(() => {
    transitService.getLiveBuses().then(setBuses);
  }, []);

  const safeBuses = Array.isArray(buses) && buses.length > 0 ? buses : [];
  const OPERATORS = ['ALL', 'BEST', 'MBMT', 'TMT', 'NMMT', 'VVMT', 'KDMT', 'MSRTC'];

  const filteredBuses = safeBuses
    .filter((bus) => {
      if (!bus) return false;
      const q = query.trim().toLowerCase();

      if (selectedOperator !== 'ALL' && bus.operator !== selectedOperator) {
        return false;
      }

      if (!q) return true;

      const cleanQ = q.replace(/[\s\-_]/g, '');
      const cleanBusNum = (bus.busNumber || '').toLowerCase().replace(/[\s\-_]/g, '');
      const cleanRawNum = (bus.rawBusNumber || '').toLowerCase().replace(/[\s\-_]/g, '');
      const cleanRouteId = (bus.routeId || '').toLowerCase().replace(/[\s\-_]/g, '');

      return (
        (bus.busNumber && bus.busNumber.toLowerCase().includes(q)) ||
        (bus.rawBusNumber && bus.rawBusNumber.toLowerCase().includes(q)) ||
        (cleanBusNum && cleanBusNum.includes(cleanQ)) ||
        (cleanRawNum && cleanRawNum.includes(cleanQ)) ||
        (cleanRouteId && cleanRouteId.includes(cleanQ)) ||
        (bus.routeId && bus.routeId.toLowerCase().includes(q)) ||
        (bus.routeName && bus.routeName.toLowerCase().includes(q)) ||
        (bus.origin && bus.origin.toLowerCase().includes(q)) ||
        (bus.destination && bus.destination.toLowerCase().includes(q)) ||
        (bus.area && bus.area.toLowerCase().includes(q)) ||
        (bus.region && bus.region.toLowerCase().includes(q)) ||
        (bus.operator && bus.operator.toLowerCase().includes(q)) ||
        (bus.operatorName && bus.operatorName.toLowerCase().includes(q)) ||
        (bus.nextStop && bus.nextStop.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'AREA') return (a.area || '').localeCompare(b.area || '');
      if (sortBy === 'OPERATOR') return (a.operator || '').localeCompare(b.operator || '');
      return (a.busNumber || '').localeCompare(b.busNumber || '');
    });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Search Transit & Buses
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Search all 29 Maharashtra regional buses across BEST, MBMT, TMT, NMMT, VVMT, KDMT & MSRTC.
          </p>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by bus number (e.g. '297', 'A-297', 'Shivneri'), area ('Borivali', 'Thane'), or origin/destination..."
            className={cn(
              'w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2',
              'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-transit-500'
            )}
            autoFocus
          />
        </div>

        {/* Filter & Sort Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold mr-1">Operator:</span>
            {OPERATORS.map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => setSelectedOperator(op)}
                className={cn(
                  'px-2.5 py-1 rounded-xl transition-colors font-bold text-[11px]',
                  selectedOperator === op
                    ? 'bg-transit-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-white'
                )}
              >
                {op}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none text-xs"
            >
              <option value="NUMBER">Bus Number</option>
              <option value="AREA">Area / Hub</option>
              <option value="OPERATOR">Operator Agency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count & Dataset Notice */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
        <div>
          Found <strong className="text-slate-900 dark:text-white">{filteredBuses.length}</strong> matching transit vehicles
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          Canonical Regional Transit Dataset
        </span>
      </div>

      {/* Bus Results List */}
      {filteredBuses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBuses.map((bus) => (
            <div key={bus.id} className="space-y-2">
              <BusCard
                busNumber={bus.busNumber}
                routeCode={bus.routeId}
                origin={bus.origin}
                destination={bus.destination}
                eta={bus.eta || 'Scheduled'}
                occupancyPercent={bus.occupancyPercent || 50}
                occupancyStatus={bus.occupancyStatus || 'MODERATE'}
                status={bus.operationalStatus || 'ON TIME'}
                nextStop={bus.destination}
              />
              <div className="flex items-center justify-between text-xs px-2 font-mono">
                <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 font-semibold">
                    {bus.area}
                  </span>
                  <span>{bus.region}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate(`/passenger/bus/${bus.id}`)}
                  className="text-transit-500 hover:text-transit-600 font-bold flex items-center space-x-1"
                >
                  <span>Vehicle Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bus}
          title="No Matching Transit Vehicles"
          description={`We couldn't find any regional buses matching "${query}". Try searching for bus numbers like 297, Shivneri, AC-65 or areas like Borivali, Thane, Pune.`}
          actionLabel="View All 29 Regional Routes"
          onAction={() => onNavigate && onNavigate('/passenger/routes')}
        />
      )}
    </div>
  );
}

export default BusSearchPage;
