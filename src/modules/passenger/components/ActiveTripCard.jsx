import React from 'react';
import { Bus, Navigation, MapPin, CheckCircle2, Clock, X, AlertTriangle, ArrowRight } from 'lucide-react';
import { OccupancyIndicator } from './OccupancyIndicator.jsx';
import { ProgressBar } from '../../../components/dataviz/ProgressBar.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function ActiveTripCard({ trip, onCancelTrip, onOpenLiveMap, className = '' }) {
  if (!trip || !trip.isActive) return null;

  return (
    <div
      className={cn(
        'p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-xl text-left space-y-5 relative overflow-hidden transition-colors',
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#B83E12]/5 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Top Status Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 relative z-10">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold uppercase tracking-wider">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 telemetry-live" />
          <span>Active Journey in Motion</span>
        </div>

        <button
          type="button"
          onClick={onCancelTrip}
          className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center space-x-1 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit Trip</span>
        </button>
      </div>

      {/* Bus Line & Live Station Progress */}
      <div className="space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xl font-extrabold font-sans flex items-center space-x-2 text-slate-900 dark:text-white">
              <Bus className="w-5 h-5 text-[#B83E12] dark:text-amber-400" />
              <span>You are on {trip.busNumber}</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Line {trip.routeCode} • {trip.routeName}
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block font-bold">Estimated Arrival</span>
            <div className="text-xl font-mono font-extrabold text-[#B83E12] dark:text-amber-400">{trip.estimatedArrival}</div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-300 font-bold">
            <span>Progress: {trip.progressPercent}%</span>
            <span>Speed: {trip.speed}</span>
          </div>
          <ProgressBar progress={trip.progressPercent} color="#B83E12" height={8} />
        </div>
      </div>

      {/* Current Stop & Next Stop Split */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block font-bold">Current Station</span>
          <div className="font-bold text-slate-900 dark:text-white truncate">{trip.currentStop}</div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Boarded at {trip.startedAt}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-1">
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase block font-bold">Upcoming Stop (Next)</span>
          <div className="font-bold text-[#B83E12] dark:text-amber-400 truncate">{trip.nextStop}</div>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">ETA in {trip.etaToNextStop}</span>
        </div>
      </div>

      {/* Occupancy Indicator Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 relative z-10">
        <OccupancyIndicator percent={trip.occupancyPercent} status={trip.occupancyStatus} showBar={true} />
      </div>

      {/* Bottom CTA to Live Map */}
      <div className="pt-1 relative z-10">
        <Button
          variant="primary"
          size="md"
          fullWidth
          rightIcon={ArrowRight}
          onClick={onOpenLiveMap}
          className="bg-[#B83E12] hover:bg-[#96300c] text-white shadow-md font-bold"
        >
          Track This Journey on Live Map
        </Button>
      </div>
    </div>
  );
}

export default ActiveTripCard;
