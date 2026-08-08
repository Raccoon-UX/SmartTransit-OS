import React from 'react';
import { MapPin, Navigation, Clock, Users, ArrowRight } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function NextStopCard({
  nextStopName = 'Magathane Junction',
  nextStopCode = 'BST-048',
  eta = '3 min',
  distance = '1.2 km',
  waitingPassengers = 18,
  className = '',
}) {
  return (
    <div
      className={cn(
        'p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 via-navy-900 to-navy-950 text-white border border-slate-700/80 shadow-2xl text-left space-y-4 relative overflow-hidden',
        className
      )}
    >
      {/* Top Header Label */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-transit-400 telemetry-live" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-transit-400">
            UPCOMING STATION (NEXT STOP)
          </span>
        </div>
        <span className="text-xs font-mono text-slate-400 font-bold">{nextStopCode}</span>
      </div>

      {/* Prominent Stop Title */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-sans tracking-tight">
          {nextStopName}
        </h2>
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
          <Navigation className="w-3.5 h-3.5 text-emerald-400" />
          <span>Vehicle En Route • Driver Guidance Active</span>
        </div>
      </div>

      {/* 3 Metric Pills */}
      <div className="grid grid-cols-3 gap-3 pt-2 text-center font-mono">
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">ETA</span>
          <div className="text-lg sm:text-2xl font-extrabold text-emerald-400 mt-0.5">{eta}</div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Distance</span>
          <div className="text-lg sm:text-2xl font-extrabold text-cyan-400 mt-0.5">{distance}</div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Waiting</span>
          <div className="text-lg sm:text-2xl font-extrabold text-amber-400 mt-0.5 flex items-center justify-center space-x-1">
            <Users className="w-4 h-4 hidden sm:inline" />
            <span>{waitingPassengers}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NextStopCard;
