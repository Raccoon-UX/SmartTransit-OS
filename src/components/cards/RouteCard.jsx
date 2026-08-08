import React from 'react';
import { Route as RouteIcon, MapPin, Clock, Calendar, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge.jsx';
import { cn } from '../../utils/index.js';

export function RouteCard({
  routeCode = 'RT-302',
  routeName = 'Metro Coastal Express',
  stopsCount = 18,
  frequency = 'Every 8 mins',
  firstBus = '05:30 AM',
  lastBus = '11:45 PM',
  activeBuses = 12,
  status = 'ACTIVE',
  onClick,
  className = '',
}) {
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
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-md bg-transit-500 text-white font-mono font-bold text-xs tracking-wider">
            {routeCode}
          </span>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{routeName}</h4>
        </div>
        <Badge variant={status === 'ACTIVE' ? 'success' : 'warning'} size="sm">
          {status}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <MapPin className="w-3.5 h-3.5 text-transit-500" />
          <span>{stopsCount} Bus Stops</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <Clock className="w-3.5 h-3.5 text-emerald-500" />
          <span>{frequency}</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{firstBus} – {lastBus}</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 font-semibold text-transit-600 dark:text-transit-400">
          <RouteIcon className="w-3.5 h-3.5" />
          <span>{activeBuses} Live Buses</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 text-xs text-transit-600 dark:text-transit-400 font-semibold">
        <span>View Full Waypoint Schedule</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}

export default RouteCard;
