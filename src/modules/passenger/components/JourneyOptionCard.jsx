import React from 'react';
import { Bus, Navigation, Clock, Users, ArrowRight, Footprints, ShieldCheck } from 'lucide-react';
import { OccupancyIndicator } from './OccupancyIndicator.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { Badge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function JourneyOptionCard({
  plan,
  onSelectOption,
  isSelected = false,
  className = '',
}) {
  if (!plan) return null;

  return (
    <div
      className={cn(
        'p-5 sm:p-6 rounded-3xl border transition-all duration-200 text-left space-y-4 cursor-pointer',
        isSelected
          ? 'bg-white dark:bg-navy-900 border-transit-500 ring-2 ring-transit-500/30 shadow-glow-sm'
          : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm'
      )}
      onClick={onSelectOption}
    >
      {/* Top Title & Badge */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-transit-500 block">
            {plan.badge}
          </span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans">{plan.title}</h4>
        </div>

        <div className="text-right">
          <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">{plan.totalDuration}</span>
          <span className="text-[11px] font-mono text-slate-400 block">Fare: {plan.fare}</span>
        </div>
      </div>

      {/* Transit Breakdown Strip */}
      <div className="flex items-center space-x-4 text-xs font-mono text-slate-600 dark:text-slate-300">
        <div className="flex items-center space-x-1">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{plan.departureTime} → {plan.arrivalTime}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Footprints className="w-3.5 h-3.5 text-slate-400" />
          <span>{plan.walkingDuration} walk</span>
        </div>
        <div className="flex items-center space-x-1">
          <Bus className="w-3.5 h-3.5 text-transit-500" />
          <span>{plan.transfersCount === 0 ? 'Direct Bus' : `${plan.transfersCount} Transfer`}</span>
        </div>
      </div>

      {/* Step Breakdown */}
      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-slate-800/80 space-y-2">
        {plan.segments.map((seg, sIdx) => (
          <div key={sIdx} className="flex items-center space-x-2.5 text-xs text-slate-700 dark:text-slate-300">
            {seg.type === 'BUS' ? (
              <span className="px-2 py-0.5 rounded bg-transit-500 text-white font-mono text-[10px] font-bold">
                {seg.busNumber}
              </span>
            ) : (
              <Footprints className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            )}
            <span className="truncate flex-1">{seg.instruction}</span>
            <span className="text-[10px] font-mono text-slate-400">{seg.duration}</span>
          </div>
        ))}
      </div>

      {/* Crowd Density & Select Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <OccupancyIndicator percent={plan.occupancyPercent} status={plan.occupancyStatus} size="sm" />

        <Button
          variant={isSelected ? 'primary' : 'outline'}
          size="sm"
          rightIcon={ArrowRight}
          onClick={(e) => {
            e.stopPropagation();
            if (onSelectOption) onSelectOption();
          }}
          className={cn(isSelected && 'shadow-glow')}
        >
          {isSelected ? 'Start Journey' : 'Select Plan'}
        </Button>
      </div>
    </div>
  );
}

export default JourneyOptionCard;
