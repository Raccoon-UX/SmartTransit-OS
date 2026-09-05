import React, { useState } from 'react';
import { Route, ArrowLeft, MapPin, Activity } from 'lucide-react';
import { adminRouteService } from '../../../services/admin/adminRouteService.js';
import { RouteTimeline } from '../../passenger/components/RouteTimeline.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';

export function RouteDetailPage({ routeId, onNavigate }) {
  const [route] = useState(() => adminRouteService.getRouteById(routeId));
  const routeEndpoints = [
    { name: route.origin, time: 'Origin Endpoint' },
    { name: route.destination, time: 'Destination Endpoint' },
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <Button variant="outline" size="sm" leftIcon={ArrowLeft} onClick={() => onNavigate('/admin/routes')} className="mb-2">Back to Routes</Button>
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">{route.routeCode} — {route.routeName}</h1>
          <StatusBadge status={route.operationalStatus} size="md" />
        </div>
        <p className="text-xs font-mono text-slate-400">{route.origin} → {route.destination} • Regional Route Service</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Route Overview</h3>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            {[
              ['Route Code', route.routeCode], ['Operator', route.operator || 'Regional'],
              ['Operating Area', route.area || 'Maharashtra'], ['Region / District', route.region || 'Regional'],
              ['Origin', route.origin], ['Destination', route.destination],
              ['Operating Hours', route.operatingHours], ['Data Source', 'Regional Transit Dataset'],
            ].map(([l, v]) => (
              <div key={l} className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">{l}</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">{v}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Route Performance Analytics</h3>
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"><span className="text-[10px] text-slate-400 uppercase font-bold block">On-Time %</span><div className="text-2xl font-extrabold text-emerald-500 mt-1">{route.onTimeRate}</div></div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-center"><span className="text-[10px] text-slate-400 uppercase font-bold block">Avg Delay</span><div className="text-2xl font-extrabold text-amber-500 mt-1">{route.avgDelayMinutes}</div></div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-center"><span className="text-[10px] text-slate-400 uppercase font-bold block">Operating Mode</span><div className="text-2xl font-extrabold text-transit-500 mt-1">Regional</div></div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-center"><span className="text-[10px] text-slate-400 uppercase font-bold block">Load Factor</span><div className="text-2xl font-extrabold text-cyan-500 mt-1">{route.loadFactorPercent}%</div></div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans pb-2 border-b border-slate-100 dark:border-slate-800">Route Service Endpoints (Origin ➔ Destination)</h3>
        <RouteTimeline stops={routeEndpoints} activeIndex={0} />
      </div>
    </div>
  );
}
export default RouteDetailPage;
