import React from 'react';
import { Bus, MapPin, Navigation, Star, ArrowRight, ShieldCheck, Clock, Radio, X } from 'lucide-react';
import { OccupancyIndicator } from './OccupancyIndicator.jsx';
import { EtaDisplay } from './EtaDisplay.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function BusDetailCard({
  bus,
  onClose,
  onTrackOnMap,
  onAddToFavorites,
  onPlanFromHere,
  isFavorite = false,
  className = '',
}) {
  if (!bus) return null;

  return (
    <div
      className={cn(
        'p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-left space-y-5 relative',
        className
      )}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-transit-500 to-transit-700 text-white flex items-center justify-center shadow-glow-sm">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">{bus.busNumber}</h3>
              <StatusBadge status={bus.operationalStatus || 'ONLINE'} size="sm" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              Serial: {bus.serial} • Line {bus.routeId}
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Transit Route Origin & Destination */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Route Service</span>
          <span className="font-bold text-slate-900 dark:text-slate-100">{bus.routeName}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Live Speed</span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{bus.speed}</span>
        </div>
      </div>

      {/* Next Stop & ETA Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800/80 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Upcoming Station</span>
          <span className="text-xs font-bold text-slate-900 dark:text-white truncate block">{bus.nextStop}</span>
          <EtaDisplay eta={bus.eta} size="sm" className="mt-1" />
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800/80 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">Passenger Crowding</span>
          <OccupancyIndicator percent={bus.occupancyPercent} status={bus.occupancyStatus} showBar={true} />
        </div>
      </div>

      {/* Driver & Safety Indicator */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1">
        <span>Pilot: {bus.driverName}</span>
        <span className="text-emerald-500 font-bold flex items-center space-x-1">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>GPS Ingestion: {bus.lastPing}</span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <Button
          variant="outline"
          size="sm"
          leftIcon={Star}
          onClick={onAddToFavorites}
          className={cn(isFavorite && 'text-amber-500 border-amber-500')}
        >
          {isFavorite ? 'Saved in Favorites' : 'Add to Favorites'}
        </Button>

        <Button
          variant="primary"
          size="sm"
          rightIcon={ArrowRight}
          onClick={onTrackOnMap}
        >
          Track on Live Map
        </Button>
      </div>
    </div>
  );
}

export default BusDetailCard;
