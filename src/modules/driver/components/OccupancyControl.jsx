import React from 'react';
import { Plus, Minus, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function OccupancyControl({
  occupancy,
  onIncrement,
  onDecrement,
  onSetPreset,
  className = '',
}) {
  if (!occupancy) return null;

  const { totalPassengers, totalCapacity, occupancyPercent, occupancyStatus } = occupancy;

  const isHigh = occupancyStatus === 'HIGH';
  const isFull = occupancyStatus === 'FULL';

  return (
    <div
      className={cn(
        'p-6 sm:p-7 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-6',
        className
      )}
    >
      {/* Top Title & Warnings */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            Passenger Density & Capacity Control
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Touch-friendly occupancy logging for real-time passenger broadcasts.
          </p>
        </div>

        {isFull ? (
          <span className="px-3 py-1 rounded-xl bg-rose-500 text-white font-mono font-extrabold text-xs animate-pulse">
            BUS FULL
          </span>
        ) : isHigh ? (
          <span className="px-3 py-1 rounded-xl bg-amber-500 text-white font-mono font-extrabold text-xs">
            HIGH OCCUPANCY
          </span>
        ) : (
          <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-extrabold text-xs border border-emerald-500/20">
            SEATS AVAILABLE
          </span>
        )}
      </div>

      {/* Large Passenger Count Display */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono uppercase font-bold text-slate-400 block">Passenger Count</span>
          <div className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">
            {totalPassengers} <span className="text-lg font-normal text-slate-400">/ {totalCapacity}</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-mono uppercase font-bold text-slate-400 block">Crowding Level</span>
          <div
            className={cn(
              'text-2xl sm:text-4xl font-extrabold font-mono mt-1',
              isFull ? 'text-rose-500' : isHigh ? 'text-amber-500' : 'text-emerald-500'
            )}
          >
            {occupancyPercent}% ({occupancyStatus})
          </div>
        </div>
      </div>

      {/* Large Touch Controls (+ / -) */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={onDecrement}
          disabled={totalPassengers <= 0}
          className="py-6 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-750 text-slate-900 dark:text-white font-bold text-lg flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <Minus className="w-6 h-6 text-rose-500" />
          <span>Alighted (-1)</span>
        </button>

        <button
          type="button"
          onClick={onIncrement}
          disabled={totalPassengers >= totalCapacity}
          className="py-6 rounded-2xl bg-transit-500 hover:bg-transit-600 text-white font-bold text-lg flex items-center justify-center space-x-2 transition-all active:scale-95 shadow-glow disabled:opacity-50"
        >
          <Plus className="w-6 h-6" />
          <span>Boarded (+1)</span>
        </button>
      </div>

      {/* Quick One-Tap Presets */}
      <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <label className="text-xs font-mono font-bold uppercase text-slate-400">Quick Density Presets</label>
        <div className="grid grid-cols-4 gap-2 text-xs font-mono">
          {[
            { id: 'LOW', label: 'Low (25%)', color: 'hover:border-emerald-500' },
            { id: 'MEDIUM', label: 'Med (50%)', color: 'hover:border-cyan-500' },
            { id: 'HIGH', label: 'High (78%)', color: 'hover:border-amber-500' },
            { id: 'FULL', label: 'Full (100%)', color: 'hover:border-rose-500' },
          ].map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSetPreset(preset.id)}
              className={cn(
                'py-3 rounded-xl border text-center font-bold transition-all',
                occupancyStatus === preset.id
                  ? 'bg-slate-900 text-white border-slate-700 dark:bg-white dark:text-slate-900 shadow'
                  : 'bg-slate-50 dark:bg-navy-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300',
                preset.color
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OccupancyControl;
