import React from 'react';
import { Bus, Users, Navigation, Clock, ShieldAlert } from 'lucide-react';
import { StatusBadge } from '../ui/Badge.jsx';
import { cn } from '../../utils/index.js';

export function BusCard({
  busNumber = 'Bus 245',
  routeCode = 'RT-108',
  origin = 'Borivali Central',
  destination = 'Andheri West Hub',
  eta = '4 mins',
  occupancyPercent = 58,
  occupancyStatus = 'MODERATE',
  status = 'LIVE',
  speed = '38 km/h',
  nextStop = 'Goregaon East',
  onClick,
  className = '',
}) {
  const getOccupancyColor = (level) => {
    switch (level) {
      case 'LOW':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'MODERATE':
        return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'HIGH':
      case 'FULL':
        return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default:
        return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'p-5 rounded-2xl border transition-all duration-200 text-left relative overflow-hidden',
        'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
        'shadow-sm dark:shadow-card hover:border-transit-500/40 hover:shadow-glow-sm cursor-pointer',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-transit-500/10 text-transit-500 dark:text-transit-400 flex items-center justify-center border border-transit-500/20">
            <Bus className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans flex items-center gap-1.5">
              <span>{busNumber}</span>
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 rounded bg-slate-100 dark:bg-navy-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                {routeCode}
              </span>
            </h4>
          </div>
        </div>
        <StatusBadge status={status} size="sm" />
      </div>

      {/* Origin -> Destination Route Path */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-800 dark:text-slate-200">
          <span>{origin}</span>
          <span className="text-transit-500 font-bold">→</span>
          <span>{destination}</span>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
          <Navigation className="w-3 h-3 text-transit-400" />
          <span>Next Stop: <strong className="text-slate-700 dark:text-slate-300">{nextStop}</strong></span>
        </p>
      </div>

      {/* Footer Metrics: ETA & Occupancy Meter */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 text-transit-600 dark:text-transit-400 font-mono font-bold">
          <Clock className="w-3.5 h-3.5" />
          <span>ETA {eta}</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className={cn('flex items-center space-x-1 px-2 py-0.5 rounded-full border text-[11px] font-medium', getOccupancyColor(occupancyStatus))}>
            <Users className="w-3 h-3" />
            <span>{occupancyPercent}% ({occupancyStatus})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusCard;
