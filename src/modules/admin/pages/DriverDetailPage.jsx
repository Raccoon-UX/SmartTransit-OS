import React, { useState } from 'react';
import { User, ArrowLeft, ShieldCheck, Bus } from 'lucide-react';
import { adminDriverService } from '../../../services/admin/adminDriverService.js';
import { DriverAssignmentModal } from '../components/DriverAssignmentModal.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';

export function DriverDetailPage({ driverId, onNavigate }) {
  const [driver] = useState(() => adminDriverService.getDriverById(driverId));
  const [showAssign, setShowAssign] = useState(false);
  const [toast, setToast] = useState(null);

  const mockTrips = [
    { id: 't1', routeCode: 'RT-108', time: '05:30 AM – 06:44 AM', duration: '1h 14m', status: 'COMPLETED' },
    { id: 't2', routeCode: 'RT-108', time: '07:15 AM – 08:28 AM', duration: '1h 13m', status: 'COMPLETED' },
    { id: 't3', routeCode: 'RT-108', time: '10:15 AM – Present', duration: '42m (Active)', status: 'EN ROUTE' },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <Button variant="outline" size="sm" leftIcon={ArrowLeft} onClick={() => onNavigate('/admin/drivers')} className="mb-2">Back to Drivers</Button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">{driver.name} — Pilot Audit</h1>
        <p className="text-xs font-mono text-slate-400">Pilot ID: {driver.id} • License: {driver.licenseNumber}</p>
      </div>

      {toast && <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">✓ {toast}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center space-x-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-transit-500 to-transit-700 text-white font-extrabold text-xl font-mono flex items-center justify-center shadow-glow-sm">
              {driver.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white font-sans">{driver.name}</h2>
              <p className="text-xs font-mono text-slate-400">Senior Transit Pilot</p>
              <StatusBadge status={driver.status} size="sm" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {[['Pilot ID', driver.id], ['License', driver.licenseNumber], ['Assigned Bus', driver.assignedBus], ['Assigned Route', driver.assignedRoute], ['Depot', driver.depot], ['Shift', driver.shift]].map(([l, v]) => (
              <div key={l} className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">{l}</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm truncate block">{v}</span>
              </div>
            ))}
          </div>

          <Button variant="primary" size="sm" leftIcon={ShieldCheck} onClick={() => setShowAssign(true)} fullWidth>Reassign Vehicle / Route</Button>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Performance & Safety Metrics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"><span className="text-[10px] text-slate-400 uppercase font-bold block">Safety Score</span><div className="text-2xl font-extrabold text-emerald-500 mt-1">{driver.safetyScore}%</div></div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-center"><span className="text-[10px] text-slate-400 uppercase font-bold block">On-Time Rate</span><div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">{driver.onTimeRate}</div></div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-center"><span className="text-[10px] text-slate-400 uppercase font-bold block">Trips Today</span><div className="text-2xl font-extrabold text-transit-500 mt-1">{driver.tripsToday}</div></div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-center"><span className="text-[10px] text-slate-400 uppercase font-bold block">Distance</span><div className="text-2xl font-extrabold text-cyan-500 mt-1">{driver.totalDistanceToday}</div></div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Recent Trip Execution Logs</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead><tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]"><th className="py-2 px-3">Route</th><th className="py-2 px-3">Time Window</th><th className="py-2 px-3">Duration</th><th className="py-2 px-3 text-right">Status</th></tr></thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {mockTrips.map((t) => (<tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-navy-850"><td className="py-2.5 px-3 font-bold text-transit-500">{t.routeCode}</td><td className="py-2.5 px-3 text-slate-700 dark:text-slate-300">{t.time}</td><td className="py-2.5 px-3">{t.duration}</td><td className="py-2.5 px-3 text-right"><StatusBadge status={t.status === 'EN ROUTE' ? 'ONLINE' : t.status} label={t.status} size="sm" /></td></tr>))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Incident Audit History</h3>
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold text-center">✓ No safety incidents recorded. Exemplary driving record (6.5 years).</div>
          </div>
        </div>
      </div>

      <DriverAssignmentModal isOpen={showAssign} onClose={() => setShowAssign(false)} driver={driver} onAssigned={() => { setToast('Driver reassignment updated.'); setTimeout(() => setToast(null), 3000); }} />
    </div>
  );
}
export default DriverDetailPage;
