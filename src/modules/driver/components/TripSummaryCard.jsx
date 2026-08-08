import React from 'react';
import { CheckCircle2, Clock, Navigation, Bus, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function TripSummaryCard({
  summary,
  onReturnToDashboard,
  onViewReports,
  className = '',
}) {
  if (!summary) return null;

  return (
    <div
      className={cn(
        'p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-xl text-left space-y-6',
        className
      )}
    >
      {/* Header Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-glow-sm">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs">
                TRIP COMPLETED SUCCESSFULLY
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-sans mt-0.5">
              {summary.busNumber} — {summary.routeCode}
            </h2>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Line {summary.routeName}
        </span>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Duration</span>
          <div className="text-sm font-extrabold text-slate-900 dark:text-white">{summary.duration}</div>
          <span className="text-[10px] text-slate-400">{summary.startTime} → {summary.endTime}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Distance Covered</span>
          <div className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400">{summary.distance}</div>
          <span className="text-[10px] text-slate-400">Full Route Corridor</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Stops Completed</span>
          <div className="text-sm font-extrabold text-slate-900 dark:text-white">{summary.stopsCompleted}</div>
          <span className="text-[10px] text-emerald-500 font-bold">100% Station Waypoints</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">On-Time Performance</span>
          <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{summary.onTime}</div>
          <span className="text-[10px] text-slate-400">Final Occupancy: {summary.finalOccupancy}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <Button
          variant="outline"
          size="md"
          leftIcon={RotateCcw}
          onClick={onViewReports}
          className="w-full sm:w-auto"
        >
          View Shift Reports
        </Button>

        <Button
          variant="primary"
          size="md"
          rightIcon={ArrowRight}
          onClick={onReturnToDashboard}
          className="w-full sm:w-auto shadow-glow font-bold"
        >
          Return to Cockpit Dashboard
        </Button>
      </div>
    </div>
  );
}

export default TripSummaryCard;
