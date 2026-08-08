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
        'p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-navy-900 to-navy-950 text-white border border-slate-700/80 shadow-2xl text-left space-y-5 relative overflow-hidden',
        className
      )}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-transit-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      {/* Top Status Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 relative z-10">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 telemetry-live" />
          <span className="text-xs font-mono font-bold uppercase text-emerald-400 tracking-wider">
            Active Journey in Motion
          </span>
        </div>

        <button
          type="button"
          onClick={onCancelTrip}
          className="text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors flex items-center space-x-1"
        >
          <X className="w-3.5 h-3.5" />
          <span>Exit Trip</span>
        </button>
      </div>

      {/* Bus Line & Live Station Progress */}
      <div className="space-y-3 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xl font-extrabold font-sans flex items-center space-x-2">
              <Bus className="w-5 h-5 text-transit-400" />
              <span>You are on {trip.busNumber}</span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Line {trip.routeCode} • {trip.routeName}
            </span>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Estimated Arrival</span>
            <div className="text-lg font-mono font-bold text-transit-400">{trip.estimatedArrival}</div>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-1 pt-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
            <span>Progress: {trip.progressPercent}%</span>
            <span>Speed: {trip.speed}</span>
          </div>
          <ProgressBar progress={trip.progressPercent} color="#0c87eb" height={8} />
        </div>
      </div>

      {/* Current Stop & Next Stop Split */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10 text-xs">
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Current Station</span>
          <div className="font-bold text-white truncate">{trip.currentStop}</div>
          <span className="text-[10px] font-mono text-emerald-400">Boarded at {trip.startedAt}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Upcoming Stop (Next)</span>
          <div className="font-bold text-transit-300 truncate">{trip.nextStop}</div>
          <span className="text-[10px] font-mono text-transit-400">ETA in {trip.etaToNextStop}</span>
        </div>
      </div>

      {/* Occupancy Indicator Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 relative z-10">
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
          className="shadow-glow"
        >
          Track This Journey on Live Map
        </Button>
      </div>
    </div>
  );
}

export default ActiveTripCard;
