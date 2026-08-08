import React from 'react';
import { Bus, Clock, Users, ArrowRight, Pause, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function DispatchQueue({
  dispatchData,
  onAssignPending,
  onHoldTrip,
  onResumeTrip,
  className = '',
}) {
  if (!dispatchData) return null;

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6 text-left', className)}>
      {/* Pending Assignments Queue */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Pending Dispatch Queue ({dispatchData.pendingAssignments.length})
          </h3>
          <span className="text-xs font-mono text-amber-500 font-bold">Priority High</span>
        </div>

        <div className="space-y-3">
          {dispatchData.pendingAssignments.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-transit-500 text-white font-mono font-bold text-[10px]">
                    {p.routeCode}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">{p.routeName}</h4>
                </div>
                <span className="text-xs font-mono text-slate-400 block mt-1">
                  Departure: {p.departureTime} • Type: {p.requiredType}
                </span>
              </div>

              <Button
                variant="primary"
                size="sm"
                rightIcon={ArrowRight}
                onClick={() => onAssignPending(p.id)}
              >
                Dispatch Vehicle
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Unassigned Vehicles & Drivers Roster */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Available Depot Fleet & Standby Pilots
          </h3>
          <span className="text-xs font-mono text-emerald-500 font-bold">Ready for Assignment</span>
        </div>

        <div className="space-y-3 text-xs font-mono">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Standby Vehicles</span>
            {dispatchData.unassignedVehicles.map((v) => (
              <div key={v.busNumber} className="flex items-center justify-between font-bold">
                <span className="text-slate-900 dark:text-white">{v.busNumber} ({v.serial})</span>
                <span className="text-emerald-500">Batt: {v.battery} • {v.status}</span>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Standby Pilots</span>
            {dispatchData.unassignedDrivers.map((d) => (
              <div key={d.driverId} className="flex items-center justify-between font-bold">
                <span className="text-slate-900 dark:text-white">{d.name} ({d.driverId})</span>
                <span className="text-cyan-500">{d.shift}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DispatchQueue;
