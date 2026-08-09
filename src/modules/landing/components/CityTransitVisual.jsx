import React, { useState } from 'react';
import { Bus, MapPin, Shield, Radio, CheckCircle2, Clock, Users } from 'lucide-react';
import { cn } from '../../../utils/index.js';
import busStationImg from '../../../assets/bus-station.jpg';

export function CityTransitVisual({ className = '' }) {
  const [activeBusId, setActiveBusId] = useState('b-504');

  const buses = [
    { 
      id: 'b-504', 
      number: 'BUS 504', 
      routeCode: 'RT-415', 
      driver: 'Anil P.',
      platform: 'Platform 1', 
      status: 'On Schedule • Boarding', 
      eta: '2 min', 
      occupancy: '68%',
      color: '#0B3D91' 
    },
    { 
      id: 'b-245', 
      number: 'BUS 245', 
      routeCode: 'RT-108', 
      driver: 'Rajesh K.',
      platform: 'Platform 3', 
      status: 'Approaching Terminal', 
      eta: '4 min', 
      occupancy: '82%',
      color: '#15803D' 
    },
    { 
      id: 'b-118', 
      number: 'BUS 118', 
      routeCode: 'RT-302', 
      driver: 'Sunil M.',
      platform: 'Platform 2', 
      status: 'In Transit to Junction', 
      eta: '7 min', 
      occupancy: '45%',
      color: '#B45309' 
    },
  ];

  const activeBus = buses.find((b) => b.id === activeBusId) || buses[0];

  return (
    <div
      className={cn(
        'w-full p-4 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-left space-y-4 shadow-panel',
        className
      )}
    >
      {/* Station Header */}
      <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4 text-[#0B3D91] shrink-0" />
          <span className="font-mono text-xs font-bold uppercase text-slate-900 dark:text-white tracking-wider">
            METROPOLITAN BUS STATION & TERMINAL CONTROL
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 telemetry-live" />
          <span>● SMART TERMINAL LIVE</span>
        </div>
      </div>

      {/* Hero Image Container displaying bus-station.jpg */}
      <div className="relative w-full h-72 sm:h-80 rounded border border-slate-300 dark:border-slate-800 overflow-hidden group">
        <img
          src={busStationImg}
          alt="Central Smart Bus Station Terminal"
          className="w-full h-full object-cover object-center"
        />

        {/* Gradient Overlay for Telemetry Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top-Left Live Telemetry Overlay Card */}
        <div className="absolute top-3 left-3 p-2.5 rounded bg-white/95 dark:bg-slate-900/95 border border-slate-300 dark:border-slate-700 shadow-subtle font-mono text-xs max-w-xs space-y-1">
          <div className="flex items-center justify-between space-x-2 border-b border-slate-200 dark:border-slate-800 pb-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
              <Bus className="w-3.5 h-3.5 text-[#0B3D91]" />
              <span>{activeBus.number}</span>
            </span>
            <span className="px-1.5 py-0.2 rounded bg-[#0B3D91] text-white text-[10px] font-bold">
              {activeBus.routeCode}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-300">
            <span>{activeBus.platform} • Driver: {activeBus.driver}</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">{activeBus.eta}</span>
          </div>
        </div>

        {/* Top-Right Station Status Pill */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-700 text-white font-mono text-[11px] flex items-center space-x-2">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
          <span>Central Terminal Kiosk #04</span>
        </div>

        {/* Bottom Floating Telemetry Overlay Bar */}
        <div className="absolute bottom-3 left-3 right-3 p-3 rounded bg-slate-900/90 backdrop-blur-md border border-slate-700 text-white font-mono text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Active Service:</strong> {activeBus.status}
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px] text-slate-300">
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>Next ETA: {activeBus.eta}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Occupancy: {activeBus.occupancy}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Platform Selector Cards */}
      <div className="grid grid-cols-3 gap-2.5 pt-1">
        {buses.map((b) => {
          const isSelected = b.id === activeBusId;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setActiveBusId(b.id)}
              className={cn(
                'p-2.5 rounded text-left transition-colors font-mono text-xs border',
                isSelected
                  ? 'bg-slate-100 dark:bg-slate-800 border-[#0B3D91] ring-1 ring-[#0B3D91]'
                  : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-800 hover:border-slate-400'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center space-x-1">
                  <Bus className="w-3.5 h-3.5" style={{ color: b.color }} />
                  <span>{b.number}</span>
                </span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-slate-200 dark:bg-slate-700 font-bold text-slate-700 dark:text-slate-300">
                  {b.routeCode}
                </span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 truncate">
                {b.platform} • <strong className="text-[#0B3D91] dark:text-sky-400">{b.eta}</strong>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CityTransitVisual;
