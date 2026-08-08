import React, { useEffect, useState } from 'react';
import { Bus, MapPin, Radio, ShieldCheck, Sparkles, Wifi, Users, Clock } from 'lucide-react';
import { cn } from '../../../utils/index.js';

// SVG Stylized Modern Municipal Public Bus Component
function StylizedModernBus({ number, routeCode, destination, color = '#0c87eb', isSelected = false, isHovered = false }) {
  return (
    <div
      className={cn(
        'relative transition-all duration-300 transform',
        isSelected || isHovered ? 'scale-115 z-40 drop-shadow-2xl' : 'scale-100 drop-shadow-lg'
      )}
    >
      <svg width="120" height="64" viewBox="0 0 120 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`bus-body-${number}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id={`glass-grad-${number}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Shadow under bus */}
        <ellipse cx="60" cy="56" rx="52" ry="6" fill="#0f172a" fillOpacity="0.25" />

        {/* Bus Main Chassis Body (Isometric 3D shape) */}
        <path
          d="M 12 18 C 12 14, 20 12, 28 12 L 96 12 C 104 12, 110 16, 110 20 L 110 44 C 110 48, 104 50, 96 50 L 24 50 C 16 50, 12 46, 12 40 Z"
          fill={`url(#bus-body-${number})`}
          stroke="#ffffff"
          strokeWidth="2"
        />

        {/* Bus White Roof Top */}
        <path d="M 24 12 L 96 12 L 92 18 L 28 18 Z" fill="#ffffff" fillOpacity="0.9" />

        {/* LED Digital Destination Display Bar */}
        <rect x="34" y="15" width="48" height="5" rx="1.5" fill="#0f172a" />
        <text x="58" y="19" fill="#fef08a" fontSize="4.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          {routeCode} {destination}
        </text>

        {/* Front Windshield Glass */}
        <path d="M 94 18 L 108 22 L 108 34 L 94 34 Z" fill={`url(#glass-grad-${number})`} stroke="#ffffff" strokeWidth="0.8" />

        {/* Side Passenger Windows */}
        <rect x="24" y="22" width="14" height="12" rx="2" fill={`url(#glass-grad-${number})`} stroke="#ffffff" strokeWidth="0.8" />
        <rect x="42" y="22" width="14" height="12" rx="2" fill={`url(#glass-grad-${number})`} stroke="#ffffff" strokeWidth="0.8" />
        <rect x="60" y="22" width="14" height="12" rx="2" fill={`url(#glass-grad-${number})`} stroke="#ffffff" strokeWidth="0.8" />
        <rect x="76" y="22" width="14" height="12" rx="2" fill={`url(#glass-grad-${number})`} stroke="#ffffff" strokeWidth="0.8" />

        {/* Front Headlights Yellow Glow */}
        <circle cx="108" cy="38" r="2.5" fill="#fef08a" className="animate-pulse" />
        <path d="M 108 38 L 118 34 L 118 42 Z" fill="#fef08a" fillOpacity="0.3" />

        {/* Rear Taillights Red */}
        <rect x="12" y="36" width="2" height="6" rx="1" fill="#ef4444" />

        {/* Wheels with Silver Hubcaps */}
        <circle cx="34" cy="50" r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="34" cy="50" r="3" fill="#94a3b8" />

        <circle cx="86" cy="50" r="7" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="86" cy="50" r="3" fill="#94a3b8" />
      </svg>
    </div>
  );
}

export function CityTransitVisual({ className = '' }) {
  const [activeBusId, setActiveBusId] = useState('b-245');
  const [hoveredBusId, setHoveredBusId] = useState(null);
  const [hoveredStopId, setHoveredStopId] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Animated bus position coordinates along isometric roads
  const [busPositions, setBusPositions] = useState({
    'b-245': { x: 28, y: 36 },
    'b-118': { x: 58, y: 52 },
    'b-504': { x: 74, y: 72 },
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    // Smooth subtle movement along realistic city corridors
    const interval = setInterval(() => {
      const time = Date.now() / 2400;
      setBusPositions({
        'b-245': {
          x: 28 + Math.sin(time) * 3,
          y: 36 + Math.cos(time) * 2,
        },
        'b-118': {
          x: 58 + Math.cos(time + 1) * 2.5,
          y: 52 + Math.sin(time + 1) * 2,
        },
        'b-504': {
          x: 74 + Math.sin(time + 2) * 2,
          y: 72 + Math.cos(time + 2) * 2.5,
        },
      });
    }, 100);

    return () => clearInterval(interval);
  }, [reducedMotion]);

  const busesData = [
    {
      id: 'b-245',
      number: 'BUS 245',
      route: 'Route RT-108',
      routeId: 'RT-108',
      origin: 'Borivali',
      destination: 'Andheri',
      eta: '3 min',
      occupancy: 78,
      status: 'LIVE',
      color: '#0c87eb',
      pos: busPositions['b-245'],
      nextStop: 'Magathane Junction',
    },
    {
      id: 'b-118',
      number: 'BUS 118',
      route: 'Route RT-302',
      routeId: 'RT-302',
      origin: 'Thane',
      destination: 'Vashi',
      eta: '6 min',
      occupancy: 65,
      status: 'LIVE',
      color: '#06b6d4',
      pos: busPositions['b-118'],
      nextStop: 'Magathane Junction',
    },
    {
      id: 'b-504',
      number: 'BUS 504',
      route: 'Route RT-415',
      routeId: 'RT-415',
      origin: 'Nerul',
      destination: 'Borivali',
      eta: '4 min',
      occupancy: 82,
      status: 'LIVE',
      color: '#8b5cf6',
      pos: busPositions['b-504'],
      nextStop: 'Vashi Sector 17',
    },
  ];

  const stopsData = [
    {
      id: 'BST-048',
      name: 'Magathane Junction',
      code: 'BST-048',
      x: 44,
      y: 44,
      waiting: 18,
      arrivals: [
        { bus: '245', eta: '3 min' },
        { bus: '118', eta: '8 min' },
      ],
    },
    {
      id: 'BST-310',
      name: 'Vashi Sector 17',
      code: 'BST-310',
      x: 78,
      y: 66,
      waiting: 24,
      arrivals: [
        { bus: '504', eta: '2 min' },
      ],
    },
  ];

  const activeHoverRoute = hoveredBusId
    ? busesData.find((b) => b.id === hoveredBusId)?.routeId
    : null;

  return (
    <div className="space-y-4 text-left select-none min-w-0 w-full box-border">
      {/* Main Isometric Smart City Scene Container */}
      <div
        className={cn(
          'relative w-full h-[480px] sm:h-[520px] lg:h-[550px] rounded-3xl overflow-hidden border shadow-xl transition-all duration-300',
          'bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF] dark:from-slate-950 dark:to-navy-950 border-slate-200/90 dark:border-slate-800'
        )}
      >
        {/* Soft 3D Isometric City Environment Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Subtle City Roads & Intersections Layer */}
          <g stroke="#CBD5E1" strokeWidth="32" fill="none" strokeLinecap="round" opacity="0.6">
            <path d="M 0 160 C 200 180, 350 280, 800 520" />
            <path d="M 120 440 C 300 360, 460 240, 720 140" />
            <path d="M 160 100 C 340 240, 520 380, 820 380" />
          </g>

          {/* Road Markings Dash Overlay */}
          <g stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 8" fill="none" opacity="0.8">
            <path d="M 0 160 C 200 180, 350 280, 800 520" />
            <path d="M 120 440 C 300 360, 460 240, 720 140" />
            <path d="M 160 100 C 340 240, 520 380, 820 380" />
          </g>

          {/* Thin Transit Intelligence Overlays */}
          <g opacity="0.9">
            {/* RT-108 Blue Route */}
            <path
              d="M 0 160 C 200 180, 350 280, 800 520"
              fill="none"
              stroke="#0c87eb"
              strokeWidth={activeHoverRoute === 'RT-108' ? '6' : '3.5'}
              strokeDasharray="6 4"
              className={cn('transition-all duration-300', activeHoverRoute && activeHoverRoute !== 'RT-108' ? 'opacity-20' : 'opacity-90 animate-pulse')}
            />
            {/* RT-302 Cyan Route */}
            <path
              d="M 120 440 C 300 360, 460 240, 720 140"
              fill="none"
              stroke="#06b6d4"
              strokeWidth={activeHoverRoute === 'RT-302' ? '6' : '3.5'}
              strokeDasharray="6 6"
              className={cn('transition-all duration-300', activeHoverRoute && activeHoverRoute !== 'RT-302' ? 'opacity-20' : 'opacity-90')}
            />
            {/* RT-415 Purple Route */}
            <path
              d="M 160 100 C 340 240, 520 380, 820 380"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth={activeHoverRoute === 'RT-415' ? '6' : '3.5'}
              className={cn('transition-all duration-300', activeHoverRoute && activeHoverRoute !== 'RT-415' ? 'opacity-20' : 'opacity-90')}
            />
          </g>

          {/* Soft Isometric City Buildings Layer */}
          <g opacity="0.65">
            {/* Building 1 (Top Center Glass Tower) */}
            <polygon points="360,70 420,40 480,70 420,100" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            <polygon points="360,70 420,100 420,170 360,140" fill="#BFDBFE" stroke="#94A3B8" strokeWidth="1" />
            <polygon points="420,100 480,70 480,140 420,170" fill="#93C5FD" stroke="#64748B" strokeWidth="1" />

            {/* Building 2 (Right Commercial Complex) */}
            <polygon points="580,110 640,80 700,110 640,140" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="580,110 640,140 640,210 580,180" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
            <polygon points="640,140 700,110 700,180 640,210" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />

            {/* Building 3 (Left Civic Hub) */}
            <polygon points="60,240 120,210 180,240 120,270" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
            <polygon points="60,240 120,270 120,330 60,300" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
            <polygon points="120,270 180,240 180,300 120,330" fill="#94A3B8" stroke="#64748B" strokeWidth="1" />

            {/* Urban Trees Greenery Badges */}
            <circle cx="240" cy="190" r="14" fill="#86EFAC" />
            <circle cx="265" cy="205" r="11" fill="#4ADE80" />
            <circle cx="540" cy="290" r="16" fill="#86EFAC" />
            <circle cx="570" cy="305" r="12" fill="#4ADE80" />
          </g>
        </svg>

        {/* Smart Bus Stop Shelters */}
        {stopsData.map((stop) => (
          <div
            key={stop.id}
            onMouseEnter={() => setHoveredStopId(stop.id)}
            onMouseLeave={() => setHoveredStopId(null)}
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
          >
            {/* Bus Stop Physical Shelter Structure Pin */}
            <div className="w-8 h-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-transit-500 flex items-center justify-center text-transit-500 shadow-xl group-hover:scale-125 transition-all">
              <MapPin className="w-4.5 h-4.5 text-transit-500" />
            </div>

            {/* Stop Label */}
            <div className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-white text-[9px] font-mono font-bold shadow whitespace-nowrap hidden sm:block">
              🚏 {stop.name}
            </div>

            {/* Hover Next Arrivals Card */}
            {hoveredStopId === stop.id && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-2xl z-40 text-xs font-mono space-y-1.5 pointer-events-none animate-fade-in text-left">
                <div className="flex items-center justify-between font-bold border-b border-slate-100 dark:border-slate-800 pb-1 text-transit-600 dark:text-transit-400">
                  <span className="font-sans text-sm font-extrabold">{stop.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{stop.code}</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  <div className="font-bold text-[10px] uppercase text-slate-400">Next Arrivals</div>
                  {stop.arrivals.map((arr, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Bus {arr.bus}</span>
                      <span className="font-extrabold text-emerald-500 font-mono">{arr.eta}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-1">
                  <Users className="w-3 h-3 inline" />
                  <span>{stop.waiting} Passengers Waiting</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* 3 Prominent Modern Public Buses & Subtle Floating AR Telemetry Badges */}
        {busesData.map((bus) => {
          const isSelected = activeBusId === bus.id;
          const isHovered = hoveredBusId === bus.id;

          return (
            <div
              key={bus.id}
              onClick={() => setActiveBusId(bus.id)}
              onMouseEnter={() => setHoveredBusId(bus.id)}
              onMouseLeave={() => setHoveredBusId(null)}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 ease-out select-none"
              style={{ left: `${bus.pos.x}%`, top: `${bus.pos.y}%` }}
            >
              {/* GPS Radial Pulse Ring */}
              <span className="absolute inset-0 rounded-full bg-transit-500/30 animate-ping pointer-events-none" />

              {/* Realistic Stylized Modern Bus Graphic */}
              <StylizedModernBus
                number={bus.number}
                routeCode={bus.routeId}
                destination={bus.destination}
                color={bus.color}
                isSelected={isSelected}
                isHovered={isHovered}
              />

              {/* Compact Floating AR Telemetry Pill near Bus */}
              <div className="mt-1 px-3 py-1 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl text-slate-900 dark:text-white text-[10px] font-mono font-bold flex items-center space-x-2 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
                <span>{bus.number}</span>
                <span className="text-transit-600 dark:text-transit-400">{bus.routeId}</span>
                <span className="text-slate-400">ETA {bus.eta}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Live-System Information Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
        <div className="p-3 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-mono">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">METROPOLITAN TRANSIT MESH</span>
          <strong className="text-slate-900 dark:text-white font-bold text-xs sm:text-sm">3 Live Corridors</strong>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-mono">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">REAL-TIME GPS</span>
          <strong className="text-transit-600 dark:text-transit-400 font-bold text-xs sm:text-sm">2.1s Ping</strong>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-mono">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">AI NETWORK HEALTH</span>
          <strong className="text-purple-600 dark:text-purple-400 font-bold text-xs sm:text-sm">Excellent</strong>
        </div>

        <div className="p-3 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-mono">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">SYSTEM STATUS</span>
          <strong className="text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-sm">All Operational</strong>
        </div>
      </div>
    </div>
  );
}

export default CityTransitVisual;
