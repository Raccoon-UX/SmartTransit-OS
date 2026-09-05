import React from 'react';
import { 
  Bus, 
  Clock, 
  Users, 
  ArrowRight, 
  Footprints, 
  Repeat, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2,
  Train,
  Ship,
  Navigation,
  Car,
  Database
} from 'lucide-react';
import { OccupancyIndicator } from './OccupancyIndicator.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { ROUTING_PATTERNS, ROUTING_PATTERN_META, TRANSIT_MODES, DATA_PROVENANCE } from '../../../data/passenger/mockJourneys.js';
import { cn } from '../../../utils/index.js';

export function JourneyOptionCard({
  plan,
  onSelectOption,
  onViewDetails,
  isSelected = false,
  className = '',
}) {
  if (!plan) return null;

  const segments = plan.segments || [];
  const patternMeta = ROUTING_PATTERN_META[plan.routingPatternType] || {
    label: plan.transfersCount === 0 ? 'Direct Route' : 'Multimodal Route',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-sky-400 border-blue-200 dark:border-blue-800',
  };

  const isCanonical = plan.dataProvenance?.isCanonical ?? (plan.dataProvenance?.code === 'CANONICAL_REGIONAL');

  return (
    <div
      className={cn(
        'p-5 sm:p-6 rounded-3xl border transition-all duration-200 text-left space-y-4 cursor-pointer flex flex-col justify-between',
        isSelected
          ? 'bg-white dark:bg-slate-900 border-[#0B3D91] dark:border-blue-500 ring-2 ring-[#0B3D91]/20 shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm',
        className
      )}
      onClick={onSelectOption}
    >
      <div className="space-y-3.5">
        {/* Top Badges: Pattern Badge + Provenance Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Pattern Badge */}
            <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border', patternMeta.badgeBg)}>
              {patternMeta.label || plan.badge}
            </span>

            {/* Provenance Badge */}
            <span className={cn(
              'px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border flex items-center space-x-1',
              isCanonical
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800'
                : 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800'
            )}>
              <Database className="w-2.5 h-2.5" />
              <span>{isCanonical ? 'Regional Bus CSV' : 'Demo Scenario'}</span>
            </span>
          </div>

          <div className="text-right shrink-0">
            <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white block leading-tight">
              {plan.totalDuration}
            </span>
            <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
              Fare: {plan.fare}
            </span>
          </div>
        </div>

        {/* Title */}
        <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-sans leading-snug">
          {plan.title}
        </h4>

        {/* Multimodal Steps Pill Strip */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          {segments.map((seg, idx) => {
            const mode = seg.mode || seg.type;

            return (
              <React.Fragment key={idx}>
                {mode === 'WALK' && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20">
                    <Footprints className="w-3 h-3 text-emerald-600" />
                    <span>{seg.duration}</span>
                  </span>
                )}
                {mode === 'BUS' && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-sky-400 font-bold border border-blue-500/20">
                    <Bus className="w-3 h-3 text-blue-600" />
                    <span>{seg.busNumber || seg.lineNumber || seg.routeCode || 'Bus'}</span>
                  </span>
                )}
                {(mode === 'TRANSFER' || mode === 'TRANSFER_BUFFER') && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-900 dark:text-amber-300 font-bold border border-amber-500/30">
                    <Repeat className="w-3 h-3 text-amber-600" />
                    <span>Transfer</span>
                  </span>
                )}
                {mode === 'METRO' && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-400 font-bold border border-purple-500/20">
                    <Train className="w-3 h-3 text-purple-600" />
                    <span>{seg.lineNumber || 'Metro'}</span>
                  </span>
                )}
                {mode === 'TRAIN' && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-800 dark:text-amber-400 font-bold border border-amber-500/20">
                    <Train className="w-3 h-3 text-amber-600" />
                    <span>Suburban</span>
                  </span>
                )}
                {mode === 'FERRY' && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-700 dark:text-sky-400 font-bold border border-sky-500/20">
                    <Ship className="w-3 h-3 text-sky-600" />
                    <span>Ferry</span>
                  </span>
                )}
                {mode === 'MONORAIL' && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-700 dark:text-teal-400 font-bold border border-teal-500/20">
                    <Navigation className="w-3 h-3 text-teal-600" />
                    <span>Monorail</span>
                  </span>
                )}
                {mode === 'AUTO_RICKSHAW' && (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-700 dark:text-orange-400 font-bold border border-orange-500/20">
                    <Car className="w-3 h-3 text-orange-600" />
                    <span>Auto</span>
                  </span>
                )}
                {idx < segments.length - 1 && (
                  <span className="text-slate-400">➔</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Feasibility Alert Warning (If applicable) */}
        {plan.feasibility?.isTight && (
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] font-mono flex items-center space-x-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">{plan.feasibility.warning}</span>
          </div>
        )}
      </div>

      {/* Bottom Section */}
      <div className="space-y-3 pt-2">
        {/* Key Stats Strip */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="inline-flex items-center space-x-1">
              <Footprints className="w-3 h-3 text-slate-500" />
              <span>{plan.walkingDuration || '5 mins'} walk</span>
            </span>
            <span>•</span>
            <span>{plan.transfersCount === 0 ? '0 Transfers' : `${plan.transfersCount} Transfer`}</span>
          </div>

          <OccupancyIndicator percent={plan.occupancyPercent || 50} status={plan.occupancyStatus || 'MEDIUM'} size="sm" />
        </div>

        {/* Selection Action Button */}
        <Button
          variant={isSelected ? 'primary' : 'outline'}
          size="sm"
          rightIcon={ArrowRight}
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectOption) onSelectOption();
          }}
          className="w-full justify-center shadow-xs font-mono font-bold"
        >
          {isSelected ? (
            <span className="inline-flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Selected Route (View Details)</span>
            </span>
          ) : (
            'Select This Route'
          )}
        </Button>
      </div>
    </div>
  );
}

export default JourneyOptionCard;
