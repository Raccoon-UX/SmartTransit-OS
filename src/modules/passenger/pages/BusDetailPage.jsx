import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Navigation, Star, ArrowRight, ShieldCheck, Clock, Radio, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { transitService } from '../../../services/passenger/transitService.js';
import { favoriteService } from '../../../services/passenger/favoriteService.js';
import { OccupancyIndicator } from '../components/OccupancyIndicator.jsx';
import { EtaDisplay } from '../components/EtaDisplay.jsx';
import { RouteTimeline } from '../components/RouteTimeline.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function BusDetailPage({ busId = 'b-245', onNavigate }) {
  const [bus, setBus] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [saveToast, setSaveToast] = useState(null);

  useEffect(() => {
    transitService.getBusById(busId).then((data) => {
      setBus(data);
      if (data) {
        setIsSaved(favoriteService.isRouteSaved(data.routeId));
      }
    });
  }, [busId]);

  if (!bus) {
    return (
      <div className="p-8 text-center text-slate-500 font-mono text-xs">
        Loading transit vehicle telemetry...
      </div>
    );
  }

  const handleToggleFavorite = () => {
    if (isSaved) {
      favoriteService.removeFavoriteRoute(bus.routeId);
      setIsSaved(false);
      setSaveToast('Removed from favorites.');
    } else {
      favoriteService.addFavoriteRoute({
        id: bus.routeId,
        routeCode: bus.routeId,
        busNumber: bus.busNumber,
        origin: bus.origin,
        destination: bus.destination,
        eta: bus.eta,
        occupancy: bus.occupancyPercent,
      });
      setIsSaved(true);
      setSaveToast('Saved to favorite routes!');
    }
    setTimeout(() => setSaveToast(null), 2500);
  };

  const timelineStops = [
    { id: 'st-1', name: bus.origin, code: 'BST-001', eta: 'Passed', isPassed: true },
    { id: 'st-2', name: bus.currentLocation, code: 'BST-024', eta: 'Current Stop', isCurrent: true },
    { id: 'st-3', name: bus.nextStop, code: 'BST-104', eta: `In ${bus.eta}`, isUpcoming: true },
    { id: 'st-4', name: bus.destination, code: 'BST-208', eta: 'Terminal Stop', isDestination: true },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Top Bar with Back Action */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('/passenger/search')}
          className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search</span>
        </button>

        <div className="flex items-center space-x-2">
          <StatusBadge status={bus.operationalStatus} size="sm" />
          <span className="text-xs font-mono text-slate-400">GPS Ping: {bus.lastPing}</span>
        </div>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
          ✓ {saveToast}
        </div>
      )}

      {/* Main Bus Detail Hero */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-transit-500 to-transit-700 text-white flex items-center justify-center shadow-glow-sm">
              <Bus className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
                {bus.busNumber}
              </h1>
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                Line {bus.routeId} • {bus.routeName}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={Star}
              onClick={handleToggleFavorite}
              className={cn(isSaved && 'text-amber-500 border-amber-500')}
            >
              {isSaved ? 'Favorited' : 'Save Route'}
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

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Estimated Arrival</span>
            <EtaDisplay eta={bus.eta} size="sm" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Live Occupancy</span>
            <OccupancyIndicator percent={bus.occupancyPercent} status={bus.occupancyStatus} showBar={true} />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cruising Speed</span>
            <div className="text-sm font-extrabold text-slate-900 dark:text-white mt-1">{bus.speed}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Pilot</span>
            <div className="text-xs font-bold text-slate-900 dark:text-white truncate mt-1">{bus.driverName}</div>
          </div>
        </div>
      </div>

      {/* Stop Progression Timeline */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
          Route Stop Sequence & Live Transit Waypoints
        </h3>
        <RouteTimeline stops={timelineStops} activeIndex={1} />
      </div>
    </div>
  );
}

export default BusDetailPage;
