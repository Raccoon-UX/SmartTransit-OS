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
  const [selectedFilter, setSelectedFilter] = useState('ALL'); // 'ALL' | 'ON TIME' | 'APPROACHING' | 'DELAYED'
  const [sortBy, setSortBy] = useState('ETA'); // 'ETA' | 'OCCUPANCY' | 'NUMBER'

  useEffect(() => {
    transitService.getLiveBuses().then(setBuses);
  }, []);

  const safeBuses = Array.isArray(buses) ? buses : [];
  const filteredBuses = safeBuses
    .filter((bus) => {
      if (!bus) return false;
      const q = query.trim().toLowerCase();
      const matchesSearch =
        !q ||
        bus.busNumber?.toLowerCase().includes(q) ||
        bus.routeId?.toLowerCase().includes(q) ||
        bus.routeName?.toLowerCase().includes(q) ||
        bus.origin?.toLowerCase().includes(q) ||
        bus.destination?.toLowerCase().includes(q) ||
        bus.nextStop?.toLowerCase().includes(q);

      if (!matchesSearch) return false;
      if (selectedFilter !== 'ALL' && bus.operationalStatus !== selectedFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'ETA') return (parseInt(a.eta, 10) || 0) - (parseInt(b.eta, 10) || 0);
      if (sortBy === 'OCCUPANCY') return (a.occupancyPercent || 0) - (b.occupancyPercent || 0);
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
            Find active city buses by vehicle number, line code, or target destination.
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
            placeholder="Search e.g. '245', 'RT-108', 'Andheri', 'Borivali'..."
            className={cn(
              'w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2',
              'bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-transit-500'
            )}
            autoFocus
          />
        </div>

        {/* Filter & Sort Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Status:</span>
            {['ALL', 'ON TIME', 'APPROACHING', 'DELAYED'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setSelectedFilter(st)}
                className={cn(
                  'px-2.5 py-1 rounded-xl transition-colors font-bold',
                  selectedFilter === st
                    ? 'bg-transit-500 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-white'
                )}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-navy-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              <option value="ETA">Fastest ETA</option>
              <option value="OCCUPANCY">Least Crowded</option>
              <option value="NUMBER">Bus Number</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
        Found <strong className="text-slate-900 dark:text-white">{filteredBuses.length}</strong> matching transit vehicles
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
                eta={bus.eta}
                occupancyPercent={bus.occupancyPercent}
                occupancyStatus={bus.occupancyStatus}
                status={bus.operationalStatus}
                nextStop={bus.nextStop}
              />
              <div className="flex items-center justify-between text-xs px-2 font-mono">
                <span className="text-slate-400">Speed: {bus.speed}</span>
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
          description="We couldn't find any active buses matching your search term. Try checking the line code or view all routes."
          actionLabel="View All Routes"
          onAction={() => onNavigate && onNavigate('/passenger/routes')}
        />
      )}
    </div>
  );
}

export default BusSearchPage;
