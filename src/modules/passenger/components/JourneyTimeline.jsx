import React, { useState } from 'react';
import { 
  Footprints, 
  Bus, 
  Repeat, 
  MapPin, 
  Clock, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Navigation,
  CheckCircle2,
  Flag,
  Train,
  Ship,
  Car,
  Database,
  Info
} from 'lucide-react';
import { ROUTING_PATTERNS, ROUTING_PATTERN_META, TRANSIT_MODES, DATA_PROVENANCE } from '../../../data/passenger/mockJourneys.js';
import { cn } from '../../../utils/index.js';

export function JourneyTimeline({ plan, className = '' }) {
  const [expandedSegments, setExpandedSegments] = useState({});

  if (!plan) return null;

  const toggleSegment = (idx) => {
    setExpandedSegments((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const segments = plan.segments || [];
  const patternMeta = ROUTING_PATTERN_META[plan.routingPatternType] || {
    label: plan.transfersCount === 0 ? 'Direct Trunk Route' : 'Multimodal Route',
    description: 'Transit route computed for optimal commuter transfer and speed.',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-sky-400 border-blue-200 dark:border-blue-800',
  };

  const isCanonical = plan.dataProvenance?.isCanonical ?? (plan.dataProvenance?.code === 'CANONICAL_REGIONAL');

  return (
    <div className={cn('p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-left font-sans', className)}>
      
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-3">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {/* Pattern Badge */}
            <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase border', patternMeta.badgeBg)}>
              {patternMeta.label || plan.badge}
            </span>

            {/* Provenance Badge */}
            <span className={cn(
              'px-2.5 py-0.5 rounded-full text-xs font-mono font-bold uppercase border flex items-center space-x-1',
              isCanonical
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
            )}>
              <Database className="w-3 h-3" />
              <span>{isCanonical ? 'Regional Transit Dataset (CSV)' : 'Demo Scenario (20-Route Ref)'}</span>
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white font-sans leading-snug">
            {plan.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
            {patternMeta.description}
          </p>
        </div>

        <div className="flex items-center space-x-4 font-mono text-xs text-right shrink-0">
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-500 uppercase block">Total Duration</span>
            <strong className="text-base text-slate-900 dark:text-white font-bold">{plan.totalDuration}</strong>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] text-slate-500 uppercase block">Total Fare</span>
            <strong className="text-base text-emerald-600 dark:text-emerald-400 font-bold">{plan.fare}</strong>
          </div>
        </div>
      </div>

      {/* Feasibility Alert Warning (If walking time exceeds Bus ETA) */}
      {plan.feasibility?.isTight && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-mono flex items-start space-x-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong>{plan.feasibility.warning}</strong>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
              SmartTransit has adjusted your plan to board the next available bus at <strong>{plan.feasibility.recommendedBusTime}</strong>.
            </p>
          </div>
        </div>
      )}

      {/* Why We Recommend This Route (Dynamic Comparative Insights) */}
      {plan.whyRecommend && plan.whyRecommend.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2 font-mono text-xs">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#B83E12] dark:text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase text-[11px] tracking-wider">Smart Routing Insight</span>
          </div>
          <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300 font-sans">
            {plan.whyRecommend.map((reason, i) => (
              <li key={i} className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{reason.replace(/^✓\s*/, '')}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Vertical Step-by-Step Itinerary */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
        {segments.map((seg, idx) => {
          const mode = seg.mode || seg.type;

          // 1. WALK LEG
          if (mode === 'WALK') {
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
                  <Footprints className="w-3 h-3" />
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase border border-emerald-500/20">
                        <Footprints className="w-2.5 h-2.5" />
                        <span>WALK</span>
                      </span>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white font-sans">
                        {seg.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      {seg.distance} • {seg.duration}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                    {seg.guidance}
                  </p>
                </div>
              </div>
            );
          }

          // 2. TRANSFER BUFFER INTERCHANGE
          if (mode === 'TRANSFER' || mode === 'TRANSFER_BUFFER') {
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-500 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-xs">
                  <Repeat className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-900 dark:text-amber-300 text-[10px] font-mono font-bold uppercase border border-amber-500/30">
                        <Repeat className="w-2.5 h-2.5" />
                        <span>INTERCHANGE BUFFER</span>
                      </span>
                      <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200 font-sans">
                        {seg.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                      ~{seg.duration} Buffer ({seg.distance})
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/40 text-xs font-mono flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Alight From</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{seg.alightBus || seg.alightOperator || 'First Provider'}</strong>
                    </div>
                    <div className="text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center space-x-1">
                      <span>➔</span>
                      <span>{seg.distance} Walk</span>
                      <span>➔</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Board Next</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{seg.boardBus || seg.boardOperator || 'Second Provider'}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
                    {seg.guidance}
                  </p>
                </div>
              </div>
            );
          }

          // 3. BUS TRANSIT LEG
          if (mode === 'BUS') {
            const occ = seg.occupancyPercent || 50;
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/80 border-2 border-blue-600 flex items-center justify-center text-blue-600 dark:text-sky-400 shadow-xs">
                  <Bus className="w-3 h-3" />
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-sky-400 text-[10px] font-mono font-bold uppercase border border-blue-500/20">
                        <Bus className="w-2.5 h-2.5" />
                        <span>{seg.operator || 'BUS TRANSIT'}</span>
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-sans">
                        {seg.busNumber || seg.lineNumber} • {seg.routeCode}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {seg.status || 'ON TIME'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Boarding Stop</span>
                      <strong className="text-slate-900 dark:text-white truncate block text-[11px]">{seg.originStop || seg.fromName}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Alighting Stop</span>
                      <strong className="text-slate-900 dark:text-white truncate block text-[11px]">{seg.alightStop || seg.toName}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Assigned Pilot</span>
                      <strong className="text-slate-900 dark:text-white truncate block text-[11px]">{seg.driverName || 'Duty Pilot'}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase">
                        <span>Crowding</span>
                        <span>{occ}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                        <div
                          className={cn(
                            'h-full rounded-full',
                            occ > 80 ? 'bg-rose-500' : occ > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                          )}
                          style={{ width: `${occ}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          // 4. METRO TRANSIT LEG
          if (mode === 'METRO') {
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950/80 border-2 border-purple-600 flex items-center justify-center text-purple-600 dark:text-purple-400 shadow-xs">
                  <Train className="w-3 h-3" />
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-purple-200 dark:border-purple-800/60 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400 text-[10px] font-mono font-bold uppercase border border-purple-500/20">
                        <Train className="w-2.5 h-2.5" />
                        <span>{seg.operator || 'METRO'}</span>
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-sans">
                        {seg.lineNumber || 'Metro Line'} • {seg.fromName} ➔ {seg.toName}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                      {seg.status || 'EVERY 4 MINS'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
                    {seg.guidance}
                  </p>
                </div>
              </div>
            );
          }

          // 5. SUBURBAN RAIL LEG
          if (mode === 'TRAIN') {
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-600 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-xs">
                  <Train className="w-3 h-3" />
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-amber-200 dark:border-amber-800/60 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 dark:text-amber-400 text-[10px] font-mono font-bold uppercase border border-amber-500/20">
                        <Train className="w-2.5 h-2.5" />
                        <span>{seg.operator || 'SUBURBAN RAIL'}</span>
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-sans">
                        {seg.lineNumber || 'Suburban Fast Line'} • {seg.fromName} ➔ {seg.toName}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400">
                      {seg.duration}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
                    {seg.guidance}
                  </p>
                </div>
              </div>
            );
          }

          // 6. WATER FERRY LEG
          if (mode === 'FERRY') {
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/80 border-2 border-sky-600 flex items-center justify-center text-sky-600 dark:text-sky-400 shadow-xs">
                  <Ship className="w-3 h-3" />
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-sky-200 dark:border-sky-800/60 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-sky-500/10 text-sky-700 dark:text-sky-400 text-[10px] font-mono font-bold uppercase border border-sky-500/20">
                        <Ship className="w-2.5 h-2.5" />
                        <span>{seg.operator || 'WATER FERRY'}</span>
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-sans">
                        {seg.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400">
                      {seg.duration}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
                    {seg.guidance}
                  </p>
                </div>
              </div>
            );
          }

          // 7. MONORAIL LEG
          if (mode === 'MONORAIL') {
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-950/80 border-2 border-teal-600 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-xs">
                  <Navigation className="w-3 h-3" />
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-teal-200 dark:border-teal-800/60 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-teal-500/10 text-teal-700 dark:text-teal-400 text-[10px] font-mono font-bold uppercase border border-teal-500/20">
                        <Navigation className="w-2.5 h-2.5" />
                        <span>{seg.operator || 'MONORAIL'}</span>
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-sans">
                        {seg.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-teal-600 dark:text-teal-400">
                      {seg.duration}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
                    {seg.guidance}
                  </p>
                </div>
              </div>
            );
          }

          // 8. AUTO-RICKSHAW FIRST-MILE
          if (mode === 'AUTO_RICKSHAW') {
            return (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-950/80 border-2 border-orange-600 flex items-center justify-center text-orange-600 dark:text-orange-400 shadow-xs">
                  <Car className="w-3 h-3" />
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-orange-200 dark:border-orange-800/60 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-orange-500/10 text-orange-700 dark:text-orange-400 text-[10px] font-mono font-bold uppercase border border-orange-500/20">
                        <Car className="w-2.5 h-2.5" />
                        <span>FIRST-MILE AUTO</span>
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-sans">
                        {seg.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-orange-600 dark:text-orange-400">
                      {seg.distance} • {seg.duration}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
                    {seg.guidance}
                  </p>
                </div>
              </div>
            );
          }

          return null;
        })}

        {/* Destination Arrival Node */}
        <div className="relative group pt-1">
          <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/80 border-2 border-rose-500 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-xs">
            <MapPin className="w-3 h-3" />
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs font-mono flex items-center justify-between">
            <span className="font-bold text-emerald-900 dark:text-emerald-300 font-sans flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Arrive at Destination ({plan.arrivalTime || 'On Schedule'})</span>
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
              Journey Completed
            </span>
          </div>
        </div>
      </div>

      {/* Provenance Disclosure Footer */}
      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>
            {isCanonical 
              ? 'Canonical Regional Transit Data: Origin & Destination endpoints sourced directly from maharashtra_transit_analysis.csv' 
              : 'Structural Reference Scenario: Provided for Journey Planner UX evaluation and pattern validation.'}
          </span>
        </div>
        <span className="font-bold shrink-0">{isCanonical ? 'STATIC DATASET' : 'DEMO SPEC'}</span>
      </div>
    </div>
  );
}

export default JourneyTimeline;
