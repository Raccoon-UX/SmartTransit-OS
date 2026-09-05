import React, { useState, useEffect } from 'react';
import { Route, MapPin, Bus, Star, ArrowRight, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { routeService } from '../../../services/passenger/routeService.js';
import { favoriteService } from '../../../services/passenger/favoriteService.js';
import { RouteTimeline } from '../components/RouteTimeline.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function RouteDetailPage({ routeId = 'RT-108', onNavigate }) {
  const [route, setRoute] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    routeService.getRouteById(routeId).then((data) => {
      setRoute(data);
      if (data) {
        setIsSaved(favoriteService.isRouteSaved(data.routeCode || data.id));
      }
    });
  }, [routeId]);

  if (!route) {
    return (
      <div className="p-8 text-center text-slate-500 font-mono text-xs">
        Loading route telemetry...
      </div>
    );
  }

  const handleToggleFavorite = () => {
    if (isSaved) {
      favoriteService.removeFavoriteRoute(route.routeCode || route.id);
      setIsSaved(false);
      setToast('Route removed from favorites.');
    } else {
      favoriteService.addFavoriteRoute({
        id: route.id,
        routeCode: route.routeCode,
        busNumber: route.assignedBus || route.busNumber || route.routeCode,
        origin: route.origin,
        destination: route.destination,
        eta: 'Scheduled',
        occupancy: 50,
      });
      setIsSaved(true);
      setToast('Route saved to favorites!');
    }
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('/passenger/routes')}
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Routes</span>
        </button>

        <StatusBadge status={route.operationalStatus} size="sm" />
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
          ✓ {toast}
        </div>
      )}

      {/* Hero Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 rounded-xl bg-transit-500 text-white font-mono font-bold text-sm shadow-sm">
                {route.routeCode}
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white font-sans">
                {route.routeName}
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              {route.description}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={Star}
              onClick={handleToggleFavorite}
              className={cn(isSaved && 'text-amber-500 border-amber-500')}
            >
              {isSaved ? 'Saved in Favorites' : 'Add to Favorites'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              rightIcon={ArrowRight}
              onClick={() => onNavigate && onNavigate('/passenger/live-map')}
            >
              Track on Live Map
            </Button>
          </div>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Frequency</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{route.frequency}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Operator / Type</span>
            <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{route.operator || 'Regional'}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Operating Region</span>
            <div className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 truncate">{route.region || 'Maharashtra'}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Fare Range</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{route.fareRange}</div>
          </div>
        </div>
      </div>

      {/* Stop Sequence Timeline */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Route Service Endpoints ({route.stopsCount} Endpoints)
          </h3>
          <span className="text-xs font-mono text-slate-500 font-bold">Regional Dataset</span>
        </div>

        <RouteTimeline stops={route.stops} activeIndex={0} />
      </div>
    </div>
  );
}

export default RouteDetailPage;
