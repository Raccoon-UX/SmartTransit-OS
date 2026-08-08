import React, { useState } from 'react';
import { MapPin, Search, Eye } from 'lucide-react';
import { stopService } from '../../../services/admin/stopService.js';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function StopsPage({ onNavigate }) {
  const [stops] = useState(stopService.getStops());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = stops.filter((s) => {
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
    if (!matchesSearch) return false;
    if (statusFilter !== 'ALL' && s.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-1 border border-emerald-500/20"><MapPin className="w-3.5 h-3.5" /><span>STATION OPERATIONS</span></div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">Bus Stop Management</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Station kiosks, passenger throughput, accessibility, and operational status.</p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md"><Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search stops..." className="w-full pl-10 pr-4 py-2 rounded-2xl border text-xs bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-transit-500" /></div>
          <div className="flex flex-wrap items-center gap-1 text-xs font-mono">
            {['ALL', 'ACTIVE', 'CLOSED', 'MAINTENANCE', 'LIMITED'].map((st) => (<button key={st} type="button" onClick={() => setStatusFilter(st)} className={cn('px-2.5 py-1 rounded-xl font-bold transition-colors', statusFilter === st ? 'bg-transit-500 text-white shadow-sm' : 'bg-slate-100 dark:bg-navy-850 text-slate-600 dark:text-slate-400')}>{st}</button>))}
          </div>
        </div>

        <div className="overflow-x-auto min-w-0 w-full rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs font-mono">
            <thead><tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] bg-slate-50/50 dark:bg-navy-950/50">
              <th className="py-3 px-3 whitespace-nowrap">Code</th>
              <th className="py-3 px-3 whitespace-nowrap">Stop Name</th>
              <th className="py-3 px-3 whitespace-nowrap">Zone</th>
              <th className="py-3 px-3 whitespace-nowrap">Routes</th>
              <th className="py-3 px-3 whitespace-nowrap">Volume</th>
              <th className="py-3 px-3 whitespace-nowrap">Kiosk</th>
              <th className="py-3 px-3 text-right whitespace-nowrap">Status</th>
              <th className="py-3 px-3 text-right whitespace-nowrap">Actions</th>
            </tr></thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((s) => (<tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-navy-850 transition-colors">
                <td className="py-3 px-3 font-bold text-transit-500">{s.code}</td>
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white font-sans">{s.name}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{s.zone}</td>
                <td className="py-3 px-3">{s.routesCount}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 truncate max-w-[120px]">{s.passengerVolume}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 truncate max-w-[140px]">{s.kioskStatus}</td>
                <td className="py-3 px-3 text-right"><StatusBadge status={s.status} size="sm" /></td>
                <td className="py-3 px-3 text-right"><button type="button" onClick={() => onNavigate(`/admin/stops/${s.id}`)} className="p-1.5 rounded-lg text-slate-400 hover:text-transit-500 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors inline-flex items-center space-x-1"><Eye className="w-3.5 h-3.5" /><span>Details</span></button></td>
              </tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default StopsPage;
