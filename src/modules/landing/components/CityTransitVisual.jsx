import React, { useState } from 'react';
import { Bus, MapPin, Shield, Radio } from 'lucide-react';
import { cn } from '../../../utils/index.js';

// Flat 2D Bus Marker Component (Zero 3D, zero perspective)
function Flat2DBusMarker({ number, routeCode, eta, color = '#0B3D91', isSelected = false }) {
  return (
    <div
      className={cn(
        'p-2 rounded bg-white dark:bg-slate-900 border text-left transition-colors font-mono text-xs shadow-subtle',
        isSelected ? 'border-[#0B3D91] ring-2 ring-[#0B3D91]/20' : 'border-slate-300 dark:border-slate-700'
      )}
    >
      <div className="flex items-center space-x-1.5 font-bold">
        <Bus className="w-4 h-4 shrink-0" style={{ color }} />
        <span className="text-slate-900 dark:text-white font-sans">{number}</span>
        <span className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
          {routeCode}
        </span>
      </div>
      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-sans mt-0.5">
        ETA: <strong className="text-[#0B3D91] dark:text-sky-400 font-mono font-bold">{eta}</strong>
      </div>
    </div>
  );
}

export function CityTransitVisual({ className = '' }) {
  const [activeBusId, setActiveBusId] = useState('b-245');

  const buses = [
    { id: 'b-245', number: 'BUS 245', routeCode: 'RT-108', eta: '3 min', color: '#0B3D91', stop: 'Central Station Terminal' },
    { id: 'b-118', number: 'BUS 118', routeCode: 'RT-302', eta: '6 min', color: '#15803D', stop: 'Municipal Square' },
    { id: 'b-504', number: 'BUS 504', routeCode: 'RT-415', eta: '4 min', color: '#B45309', stop: 'Metro Junction' },
  ];

  return (
    <div
      className={cn(
        'w-full p-4 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-left space-y-4 shadow-subtle',
        className
      )}
    >
      {/* Network Header */}
      <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-[#0B3D91]" />
          <span className="font-mono text-xs font-bold uppercase text-slate-900 dark:text-white">
            METROPOLITAN TRANSIT NETWORK DIAGRAM (2D)
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 telemetry-live" />
          <span>● GPS LIVE</span>
        </div>
      </div>

      {/* Flat 2D Transit Map Canvas (Thin clean vector lines, zero 3D) */}
      <div className="relative w-full h-64 bg-slate-50 dark:bg-slate-950 rounded border border-slate-300 dark:border-slate-800 overflow-hidden p-4">
        <svg className="absolute inset-0 w-full h-full stroke-slate-300 dark:stroke-slate-700" fill="none">
          {/* Grid lines */}
          <line x1="0" y1="33%" x2="100%" y2="33%" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="0" y1="66%" x2="100%" y2="66%" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="33%" y1="0" x2="33%" y2="100%" strokeDasharray="4 4" strokeWidth="1" />
          <line x1="66%" y1="0" x2="66%" y2="100%" strokeDasharray="4 4" strokeWidth="1" />

          {/* Route 1 Line (Blue) */}
          <path d="M 20 50 L 140 50 L 260 120 L 380 120" stroke="#0B3D91" strokeWidth="3" strokeLinecap="round" />
          
          {/* Route 2 Line (Green) */}
          <path d="M 20 180 L 160 180 L 280 90 L 380 90" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />

          {/* Route 3 Line (Amber) */}
          <path d="M 60 20 L 60 220 L 320 220" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
        </svg>

        {/* Bus 245 Flat 2D Overlay */}
        <div
          className="absolute top-8 left-12 cursor-pointer"
          onClick={() => setActiveBusId('b-245')}
        >
          <Flat2DBusMarker
            number="BUS 245"
            routeCode="RT-108"
            eta="3 min"
            color="#0B3D91"
            isSelected={activeBusId === 'b-245'}
          />
        </div>

        {/* Bus 118 Flat 2D Overlay */}
        <div
          className="absolute top-28 left-48 cursor-pointer"
          onClick={() => setActiveBusId('b-118')}
        >
          <Flat2DBusMarker
            number="BUS 118"
            routeCode="RT-302"
            eta="6 min"
            color="#15803D"
            isSelected={activeBusId === 'b-118'}
          />
        </div>

        {/* Bus 504 Flat 2D Overlay */}
        <div
          className="absolute bottom-6 right-16 cursor-pointer"
          onClick={() => setActiveBusId('b-504')}
        >
          <Flat2DBusMarker
            number="BUS 504"
            routeCode="RT-415"
            eta="4 min"
            color="#B45309"
            isSelected={activeBusId === 'b-504'}
          />
        </div>
      </div>

      {/* Structured Bus Telemetry Strip */}
      <div className="grid grid-cols-3 gap-2 text-xs font-mono">
        {buses.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setActiveBusId(b.id)}
            className={cn(
              'p-2 rounded border text-left transition-colors',
              activeBusId === b.id
                ? 'bg-slate-100 dark:bg-slate-800 border-[#0B3D91] dark:border-sky-400 font-bold'
                : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            )}
          >
            <div className="flex items-center space-x-1.5">
              <Bus className="w-3.5 h-3.5 shrink-0" style={{ color: b.color }} />
              <span>{b.number}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-sans mt-0.5 truncate">{b.stop}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CityTransitVisual;
