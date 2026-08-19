import React from 'react';
import { Bus, MapPin, Navigation, Radio, Compass, Users } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Live Transit Bus Marker
 * Realistic vehicle silhouette marker with directional heading arrow,
 * route badge, status LED indicator, and interactive hover elevation.
 */
export function BusMapMarker({
  busNumber = '245',
  routeCode = 'RT-108',
  heading = 45, // Degrees 0 - 360 or direction string
  status = 'LIVE', // LIVE, DELAYED, APPROACHING, OFFLINE
  occupancyPercent = 60,
  speed = '38 km/h',
  isSelected = false,
  onClick,
  className = '',
}) {
  // Convert heading string or number to numeric angle
  let rotationDeg = 45;
  if (typeof heading === 'number') {
    rotationDeg = heading;
  } else if (typeof heading === 'string') {
    const headingMap = {
      'North': 0,
      'North-East': 45,
      'East': 90,
      'East-South': 135,
      'South-East': 135,
      'South': 180,
      'South-West': 225,
      'West': 270,
      'North-West': 315,
    };
    rotationDeg = headingMap[heading] ?? 45;
  }

  const isDelayed = status === 'DELAYED';
  const isApproaching = status === 'APPROACHING';

  return (
    <div
      onClick={onClick}
      className={cn('relative inline-flex flex-col items-center cursor-pointer select-none group', className)}
    >
      {/* Live Active Pulse Ripple */}
      {status !== 'OFFLINE' && (
        <span
          className={cn(
            'absolute -inset-2 rounded-full pointer-events-none animate-ping opacity-75',
            isDelayed ? 'bg-amber-500/40' : 'bg-emerald-500/30'
          )}
        />
      )}

      {/* Realistic Vehicle Capsule Container */}
      <div
        className={cn(
          'relative flex items-center space-x-1.5 px-2.5 py-1 rounded-full border shadow-md transition-all duration-200',
          isSelected
            ? 'bg-[#0B3D91] dark:bg-sky-600 text-white border-amber-400 ring-4 ring-sky-500/30 scale-110 shadow-xl'
            : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 hover:border-[#0B3D91] dark:hover:border-sky-400 hover:shadow-lg hover:scale-105'
        )}
      >
        {/* Status Indicator LED */}
        <span
          className={cn(
            'w-2 h-2 rounded-full shrink-0',
            isDelayed
              ? 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.8)]'
              : 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.8)]'
          )}
        />

        {/* Bus Icon */}
        <Bus className={cn('w-3.5 h-3.5 shrink-0', isSelected ? 'text-amber-300' : 'text-[#0B3D91] dark:text-sky-400')} />

        {/* Bus Number Label */}
        <span className="text-[11px] font-mono font-bold tracking-tight">
          {busNumber.replace('Bus ', '')}
        </span>

        {/* Direction Heading Pointer */}
        <div
          className={cn(
            'w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 shadow-xs transition-transform duration-300',
            isSelected
              ? 'bg-white/20 text-white'
              : 'bg-slate-100 dark:bg-slate-800 text-[#0B3D91] dark:text-sky-400'
          )}
          style={{ transform: `rotate(${rotationDeg}deg)` }}
          title={`Heading: ${heading}`}
        >
          <Navigation className="w-2.5 h-2.5 fill-current" />
        </div>
      </div>

      {/* Route Badge Sub-Tag */}
      <div
        className={cn(
          'mt-0.5 px-1.5 py-0.2 rounded text-[9px] font-mono font-bold tracking-wider uppercase shadow-xs transition-opacity',
          isSelected
            ? 'bg-amber-400 text-slate-950 font-black'
            : 'bg-slate-800 dark:bg-slate-800 text-slate-100 dark:text-slate-200 border border-transparent dark:border-slate-700'
        )}
      >
        {routeCode}
      </div>
    </div>
  );
}

/**
 * Realistic Bus Stop Marker with Shelter Symbol & ETA Badge
 */
export function StopMapMarker({
  stopCode = 'BST-104',
  stopName = 'Central Station',
  eta = '3m',
  hasKiosk = true,
  isSelected = false,
  onClick,
  className = '',
}) {
  return (
    <div
      onClick={onClick}
      className={cn('relative inline-flex flex-col items-center cursor-pointer select-none group', className)}
    >
      {/* Outer Stop Pin Shield */}
      <div
        className={cn(
          'w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md transition-all duration-200 border-2',
          isSelected
            ? 'bg-[#0B3D91] dark:bg-sky-600 text-white border-amber-400 ring-4 ring-sky-500/30 scale-110'
            : 'bg-white dark:bg-slate-900 text-[#0B3D91] dark:text-sky-400 border-[#0B3D91] dark:border-sky-400 hover:scale-105 shadow-sm'
        )}
      >
        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
      </div>

      {/* Stop Code Pill */}
      <div className="mt-0.5 px-1.5 py-0.2 rounded bg-slate-900/90 dark:bg-slate-950/90 border border-transparent dark:border-slate-700 backdrop-blur-xs text-white text-[8px] sm:text-[9px] font-mono font-bold shadow-xs whitespace-nowrap">
        {stopCode}
      </div>

      {/* ETA Badge */}
      {eta && (
        <div className="mt-0.5 px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[8px] font-mono font-bold shadow-xs">
          {eta}
        </div>
      )}
    </div>
  );
}

/**
 * User Geolocation Pulse Marker
 */
export function UserLocationMarker({ className = '' }) {
  return (
    <div className={cn('relative inline-flex items-center justify-center pointer-events-none', className)}>
      <span className="absolute w-8 h-8 rounded-full bg-sky-500/30 animate-ping" />
      <span className="w-4 h-4 rounded-full bg-sky-500 border-2 border-white shadow-md" />
    </div>
  );
}

export default BusMapMarker;
