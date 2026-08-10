import React, { Fragment } from 'react';
import { Bus, Clock, Users, ArrowRight, Footprints, Repeat, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { OccupancyIndicator } from './OccupancyIndicator.jsx';
import { Button } from '../../../components/ui/Button.jsx';
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

  return (
    <div
      className={cn(
        'p-5 sm:p-6 rounded-3xl border transition-all duration-200 text-left space-y-4 cursor-pointer',
        isSelected
          ? 'bg-white dark:bg-slate-900 border-[#0B3D91] dark:border-blue-500 ring-2 ring-[#0B3D91]/20 shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
      )}
      onClick={onSelectOption}
    >
      {/* Top Title & Badge */}
      <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold uppercase inline-block mb-1">
            {plan.badge}
          </span>
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-sans leading-snug">
            {plan.title}
          </h4>
        </div>

        <div className="text-right shrink-0">
          <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white block">
            {plan.totalDuration}
          </span>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Fare: {plan.fare}
          </span>
        </div>
      </div>

      {/* Multimodal Steps Pill Strip */}
      <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
        {segments.map((seg, idx) => (
          <React.Fragment key={idx}>
            {seg.type === 'WALK' && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                <Footprints className="w-3 h-3 text-emerald-600" />
                <span>{seg.duration}</span>
              </span>
            )}
            {seg.type === 'BUS' && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-sky-400 font-bold">
                <Bus className="w-3 h-3 text-blue-600" />
                <span>{seg.busNumber}</span>
              </span>
            )}
            {seg.type === 'TRANSFER' && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-800 dark:text-amber-300 font-bold">
                <Repeat className="w-3 h-3 text-amber-600" />
                <span>Transfer</span>
              </span>
            )}
            {idx < segments.length - 1 && (
              <span className="text-slate-400">➔</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Feasibility Alert Warning (If applicable) */}
      {plan.feasibility?.isTight && (
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] font-mono flex items-center space-x-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span className="truncate">{plan.feasibility.warning}</span>
        </div>
      )}

      {/* Key Stats Strip */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3 text-[11px]">
          <span className="inline-flex items-center space-x-1">
            <Footprints className="w-3 h-3 text-slate-500" />
            <span>{plan.walkingDuration} walk</span>
          </span>
          <span>•</span>
          <span>{plan.transfersCount === 0 ? '0 Transfers' : `${plan.transfersCount} Transfer`}</span>
        </div>

        <OccupancyIndicator percent={plan.occupancyPercent} status={plan.occupancyStatus} size="sm" />
      </div>

      {/* Selection Action Button */}
      <div className="pt-2">
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
