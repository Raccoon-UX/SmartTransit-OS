import React from 'react';
import { ShieldCheck, AlertTriangle, Activity, CheckCircle2, Server } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function SystemHealthBanner({ overview, className = '' }) {
  if (!overview) return null;

  const isOperational = overview.globalStatus === 'OPERATIONAL';
  const isWarning = overview.globalStatus === 'WARNING';

  return (
    <div
      className={cn(
        'p-6 sm:p-7 rounded-3xl border shadow-xl text-left transition-all space-y-4 relative overflow-hidden',
        isOperational
          ? 'bg-gradient-to-br from-emerald-950 via-slate-950 to-navy-950 border-emerald-500/80 text-white'
          : 'bg-gradient-to-br from-amber-950 via-slate-950 to-navy-950 border-amber-500/80 text-white',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div
            className={cn(
              'w-10 h-10 rounded-2xl flex items-center justify-center font-bold shadow-glow-sm',
              isOperational ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-900'
            )}
          >
            {isOperational ? <ShieldCheck className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 telemetry-live" />
              <h2 className="text-xl sm:text-2xl font-extrabold font-sans tracking-tight">
                {isOperational ? '🟢 SYSTEM OPERATIONAL' : '🟡 CAPACITY WARNING DETECTED'}
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-300 mt-0.5">
              {isOperational
                ? 'All 12 platform core services operating within normal SLA thresholds.'
                : 'High traffic load detected. TelemetryWatcher recommends capacity scale-out.'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-300">
          <span className="px-3 py-1 rounded-xl bg-slate-900/80 border border-slate-700">
            Healthy: <strong className="text-emerald-400">{overview.healthyServicesCount} / 12</strong>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-center">
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Uptime</span>
          <span className="text-lg font-extrabold text-emerald-400 mt-0.5 block">{overview.systemUptimePercent}%</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">API Latency</span>
          <span className="text-lg font-extrabold text-cyan-400 mt-0.5 block">{overview.apiLatencyMs} ms</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Active Sockets</span>
          <span className="text-lg font-extrabold text-transit-400 mt-0.5 block">{overview.activeWebsockets.toLocaleString()}</span>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Connected Users</span>
          <span className="text-lg font-extrabold text-white mt-0.5 block">{overview.connectedUsers.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default SystemHealthBanner;
