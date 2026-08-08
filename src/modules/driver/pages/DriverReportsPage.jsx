import React, { useState, useEffect } from 'react';
import { FileText, Clock, Navigation, CheckCircle2, ShieldCheck, Bus } from 'lucide-react';
import { tripService } from '../../../services/driver/tripService.js';
import { MOCK_SHIFT_SUMMARY } from '../../../data/driver/driverTrips.js';
import { StatusBadge } from '../../../components/ui/Badge.jsx';

export function DriverReportsPage() {
  const [shiftData, setShiftData] = useState(tripService.getShiftReports());

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <FileText className="w-3.5 h-3.5" />
            <span>OPERATIONAL SHIFT AUDIT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Shift Driving Reports & Trip History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Audit your daily driving hours, distance covered, station completions, and on-time performance metrics.
          </p>
        </div>
      </div>

      {/* Shift Metrics Cards (4 Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Shift Driving Time</span>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">{MOCK_SHIFT_SUMMARY.totalDrivingTime}</div>
          <span className="text-[10px] text-emerald-500 font-bold">{MOCK_SHIFT_SUMMARY.totalTripsCount} Trips Executed</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Distance Driven</span>
          <div className="text-lg font-extrabold text-cyan-600 dark:text-cyan-400 mt-1">{MOCK_SHIFT_SUMMARY.totalDistanceDriven}</div>
          <span className="text-[10px] text-slate-400">{MOCK_SHIFT_SUMMARY.fuelEfficiency}</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">On-Time Accuracy</span>
          <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{MOCK_SHIFT_SUMMARY.onTimePerformancePercent}%</div>
          <span className="text-[10px] text-slate-400">SOC Schedule Verified</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Stops Completed</span>
          <div className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">{MOCK_SHIFT_SUMMARY.totalStopsCompleted} Waypoints</div>
          <span className="text-[10px] text-slate-400">Avg Occupancy: {MOCK_SHIFT_SUMMARY.averageOccupancyPercent}%</span>
        </div>
      </div>

      {/* Completed Trips Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Shift Trip Execution Logs ({shiftData.trips.length} Completed)
          </h3>
          <span className="text-xs font-mono text-slate-400">Pilot ID: PLT-042</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2.5 px-3">Vehicle</th>
                <th className="py-2.5 px-3">Route Line</th>
                <th className="py-2.5 px-3">Time Window</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3">Distance</th>
                <th className="py-2.5 px-3">Stops</th>
                <th className="py-2.5 px-3">Occupancy</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {shiftData.trips.map((trp) => (
                <tr key={trp.id} className="hover:bg-slate-50 dark:hover:bg-navy-850 transition-colors">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{trp.busNumber}</td>
                  <td className="py-3 px-3 text-transit-500 font-bold">{trp.routeCode}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{trp.startTime} – {trp.endTime}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{trp.duration}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{trp.distance}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{trp.completedStops}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{trp.finalOccupancy}</td>
                  <td className="py-3 px-3 text-right">
                    <StatusBadge status="ONLINE" label={trp.onTimeStatus} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DriverReportsPage;
