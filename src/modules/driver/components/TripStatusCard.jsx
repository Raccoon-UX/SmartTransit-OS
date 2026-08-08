import React from 'react';
import { Bus, Navigation, Clock, CheckCircle2, Route, AlertCircle } from 'lucide-react';
import { ProgressBar } from '../../../components/dataviz/ProgressBar.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function TripStatusCard({
  trip,
  className = '',
}) {
  if (!trip) return null;

  const isActive = trip.status === 'ACTIVE';

  return (
    <div
      className={cn(
        'p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-4 relative',
        className
      )}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-transit-500 text-white flex items-center justify-center font-bold shadow-sm">
            <Bus className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">{trip.busNumber}</h3>
              <StatusBadge status={isActive ? 'ONLINE' : 'SCHEDULED'} label={trip.status} size="sm" />
            </div>
            <span className="text-xs font-mono text-slate-400">Line {trip.routeCode} • {trip.routeName}</span>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Status</span>
          <span className="text-xs font-bold text-emerald-500">
            {isActive ? 'TRIP IN PROGRESS' : 'READY TO DEPART'}
          </span>
        </div>
      </div>

      {/* Progress & Stops Completed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500 dark:text-slate-400">Stops: {trip.completedStopsCount} / {trip.totalStopsCount}</span>
          <span className="font-extrabold text-transit-500">{trip.progressPercent}% Completed</span>
        </div>
        <ProgressBar progress={trip.progressPercent} color="#0c87eb" height={8} />
      </div>

      {/* Current Stop & Next Stop Split */}
      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Stop</span>
          <span className="font-bold text-slate-900 dark:text-white truncate block">{trip.currentStop}</span>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-0.5">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Next Stop</span>
          <span className="font-bold text-transit-500 truncate block">{trip.nextStop}</span>
        </div>
      </div>
    </div>
  );
}

export default TripStatusCard;
