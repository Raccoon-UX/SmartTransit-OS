import React, { useState } from 'react';
import { Calendar, Clock, Plus, Trash2, Bus, CheckCircle2 } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function ScheduleBoard({
  schedules = [],
  onOpenCreateModal,
  onCancelSchedule,
  currentDay = 'TODAY',
  onSelectDay,
}) {
  return (
    <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 text-left">
      {/* Day Selector Tabs & Add CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Timetable View:</span>
          {['TODAY', 'TOMORROW', 'WEEK'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onSelectDay(d)}
              className={cn(
                'px-3 py-1.5 rounded-xl font-bold transition-colors',
                currentDay === d
                  ? 'bg-transit-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-navy-850 text-slate-600 dark:text-slate-400 hover:text-white'
              )}
            >
              {d}
            </button>
          ))}
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={Plus}
          onClick={onOpenCreateModal}
          className="shadow-glow"
        >
          Create Scheduled Trip
        </Button>
      </div>

      {/* Schedules Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
              <th className="py-3 px-3">Route Corridor</th>
              <th className="py-3 px-3">Departure / Arrival Window</th>
              <th className="py-3 px-3">Assigned Vehicle</th>
              <th className="py-3 px-3">Assigned Pilot</th>
              <th className="py-3 px-3 text-right">Status</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {schedules.map((sch) => (
              <tr key={sch.id} className="hover:bg-slate-50 dark:hover:bg-navy-850 transition-colors">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  <div className="text-transit-500">{sch.routeCode}</div>
                  <span className="text-[10px] text-slate-400 font-normal font-sans block">{sch.routeName}</span>
                </td>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                  {sch.scheduledDeparture} → {sch.scheduledArrival}
                </td>
                <td className="py-3 px-3 text-slate-700 dark:text-slate-300">{sch.assignedBus}</td>
                <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-sans font-bold">{sch.assignedDriver}</td>
                <td className="py-3 px-3 text-right">
                  <StatusBadge status={sch.status === 'EN ROUTE' ? 'ONLINE' : sch.status} label={sch.status} size="sm" />
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    type="button"
                    onClick={() => onCancelSchedule(sch.id)}
                    className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Cancel schedule item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleBoard;
