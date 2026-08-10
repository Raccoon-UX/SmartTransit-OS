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
  Navigation
} from 'lucide-react';
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

  return (
    <div className={cn('p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 text-left font-sans', className)}>
      
      {/* Header Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-mono font-bold">
              {plan.badge || 'OPTIMAL ROUTE'}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {plan.transfersCount === 0 ? 'Zero Transfers' : `${plan.transfersCount} Transfer Point`}
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-sans mt-1">
            {plan.title}
          </h3>
        </div>

        <div className="flex items-center space-x-4 font-mono text-xs text-right">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Total Duration</span>
            <strong className="text-base text-slate-900 dark:text-white font-bold">{plan.totalDuration}</strong>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Walking Distance</span>
            <strong className="text-base text-slate-900 dark:text-white font-bold">{plan.walkingDistanceMeters || 650}m</strong>
          </div>
        </div>
      </div>

      {/* Feasibility Alert Warning (If walking time exceeds Bus ETA) */}
      {plan.feasibility?.isTight && (
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-mono flex items-start space-x-2.5">
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
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5 font-mono text-xs">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#B83E12] dark:text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="uppercase text-[11px] tracking-wider">Smart Routing Insight (Prototype)</span>
          </div>
          <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300 font-sans">
            {plan.whyRecommend.map((reason, i) => (
              <li key={i}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Vertical Step-by-Step Itinerary */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
        {segments.map((seg, idx) => {
          const isExpanded = expandedSegments[idx];

          if (seg.type === 'WALK') {
            return (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
                  <Footprints className="w-3 h-3" />
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase">
                        🚶 WALK
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

          if (seg.type === 'TRANSFER') {
            return (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-500 flex items-center justify-center text-amber-600 dark:text-amber-400 shadow-xs">
                  <Repeat className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-mono font-bold uppercase">
                        🔄 TRANSFER INTERCHANGE
                      </span>
                      <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200 font-sans">
                        {seg.title}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                      ~{seg.duration} Transfer Buffer
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/40 text-xs font-mono flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Alight From</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{seg.alightBus}</strong>
                    </div>
                    <div className="text-amber-600 dark:text-amber-400 text-xs font-bold">
                      ➔ {seg.distance} Walk ➔
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block">Board Next</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{seg.boardBus}</strong>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans">
                    {seg.guidance}
                  </p>
                </div>
              </div>
            );
          }

          if (seg.type === 'BUS') {
            const occ = seg.occupancyPercent || 50;
            return (
              <div key={idx} className="relative group">
                {/* Timeline Node */}
                <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/80 border-2 border-blue-600 flex items-center justify-center text-blue-600 dark:text-sky-400 shadow-xs">
                  <Bus className="w-3 h-3" />
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-sky-400 text-[10px] font-mono font-bold uppercase">
                        🚌 TRANSIT BUS
                      </span>
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white font-sans">
                        {seg.busNumber} • {seg.routeCode}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {seg.status || 'ON TIME'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Boarding Stop</span>
                      <strong className="text-slate-900 dark:text-white truncate block text-[11px]">{seg.originStop}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Alighting Stop</span>
                      <strong className="text-slate-900 dark:text-white truncate block text-[11px]">{seg.alightStop}</strong>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] text-slate-500 block uppercase">Assigned Pilot</span>
                      <strong className="text-slate-900 dark:text-white truncate block text-[11px]">{seg.driverName || 'Verified Pilot'}</strong>
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

          return null;
        })}

        {/* Destination Arrival Node */}
        <div className="relative group pt-1">
          <div className="absolute -left-6 top-1 w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-950/80 border-2 border-rose-500 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-xs">
            <MapPin className="w-3 h-3" />
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 text-xs font-mono flex items-center justify-between">
            <span className="font-bold text-emerald-900 dark:text-emerald-300 font-sans">
              🏁 Arrive at Final Destination ({plan.arrivalTime})
            </span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">
              Journey Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JourneyTimeline;
