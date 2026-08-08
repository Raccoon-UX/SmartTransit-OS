import React from 'react';
import { Bus, MapPin, Navigation, Radio } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Live Transit Bus Marker for Leaflet / Canvas / Map overlays
 */
export function BusMapMarker({
  busNumber = '245',
  heading = 45, // Degrees 0 - 360
  status = 'LIVE',
  occupancyPercent = 60,
  isSelected = false,
  onClick,
  className = '',
}) {
  return (
    <div
      onClick={onClick}
      className={cn('relative inline-flex flex-col items-center cursor-pointer select-none group', className)}
    >
      {/* Dynamic expanding pulse around live bus marker */}
      <span className="absolute -inset-2 rounded-full bg-transit-500/30 animate-ping pointer-events-none" />
      
      {/* Bus Bubble */}
      <div
        className={cn(
          'w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200 border shadow-lg relative z-10',
          'bg-transit-600 text-white border-white dark:border-navy-900',
          isSelected && 'ring-4 ring-transit-400 scale-110'
        )}
      >
        <Bus className="w-5 h-5" />
        {/* Heading Indicator Arrow */}
        <div
          className="absolute -top-1.5 w-3 h-3 bg-white dark:bg-navy-950 text-transit-500 rounded-full flex items-center justify-center shadow"
          style={{ transform: `rotate(${heading}deg)` }}
        >
          <div className="w-1.5 h-1.5 border-l-2 border-t-2 border-transit-600 rotate-45 transform -translate-y-0.5" />
        </div>
      </div>

      {/* Floating Tag */}
      <div className="mt-1 px-1.5 py-0.5 rounded bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-mono font-bold shadow whitespace-nowrap">
        Bus {busNumber}
      </div>
    </div>
  );
}

/**
 * Bus Stop Marker with LED Kiosk Indicator
 */
export function StopMapMarker({
  stopCode = 'BST-104',
  stopName = 'Central Station',
  eta = '3m',
  hasKiosk = true,
  onClick,
  className = '',
}) {
  return (
    <div
      onClick={onClick}
      className={cn('relative inline-flex flex-col items-center cursor-pointer select-none', className)}
    >
      <div className="w-8 h-8 rounded-full bg-white dark:bg-navy-900 border-2 border-slate-700 dark:border-slate-300 flex items-center justify-center text-slate-800 dark:text-white shadow-md">
        <MapPin className="w-4 h-4 text-transit-500" />
      </div>
      {eta && (
        <div className="mt-0.5 px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[9px] font-mono font-bold shadow">
          {eta}
        </div>
      )}
    </div>
  );
}

/**
 * User Geolocation Pin
 */
export function UserLocationMarker({ className = '' }) {
  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <span className="absolute w-8 h-8 rounded-full bg-transit-500/20 animate-ping" />
      <span className="w-4 h-4 rounded-full bg-transit-500 border-2 border-white dark:border-navy-950 shadow-md" />
    </div>
  );
}
