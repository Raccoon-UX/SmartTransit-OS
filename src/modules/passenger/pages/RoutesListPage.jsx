import React, { useState, useEffect } from 'react';
import { Route, Search, Filter, ArrowRight, Bus, Clock } from 'lucide-react';
import { routeService } from '../../../services/passenger/routeService.js';
import { RouteCard } from '../../../components/cards/RouteCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function RoutesListPage({ onNavigate }) {
  const [routes, setRoutes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    routeService.getAllRoutes().then(setRoutes);
  }, []);

  const filteredRoutes = routes.filter((r) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      r.routeCode.toLowerCase().includes(q) ||
      r.routeName.toLowerCase().includes(q) ||
      r.origin.toLowerCase().includes(q) ||
      r.destination.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold mb-1 border border-cyan-500/20">
            <Route className="w-3.5 h-3.5" />
            <span>METROPOLITAN TRANSIT LINES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            City Bus Routes & Timetables
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Explore active public transit corridors, stop counts, service frequencies, and operating timetables.
          </p>
        </div>
      </div>

      {/* Route Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter city routes by line code, origin, or destination..."
          className={cn(
            'w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2',
            'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-transit-500'
          )}
        />
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRoutes.map((route) => (
          <div key={route.id} className="space-y-2">
            <RouteCard
              routeCode={route.routeCode}
              routeName={route.routeName}
              stopsCount={route.stopsCount}
              frequency={route.frequency}
              firstBus={route.operatingHours.split('–')[0]}
              lastBus={route.operatingHours.split('–')[1] || 'Late'}
              activeBuses={route.activeBusesCount}
              status={route.operationalStatus}
            />
            <div className="flex items-center justify-between px-2 text-xs font-mono">
              <span className="text-slate-400">Fare: {route.fareRange}</span>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate(`/passenger/routes/${route.id}`)}
                className="text-transit-500 hover:text-transit-600 font-bold flex items-center space-x-1"
              >
                <span>View Route Timeline</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoutesListPage;
