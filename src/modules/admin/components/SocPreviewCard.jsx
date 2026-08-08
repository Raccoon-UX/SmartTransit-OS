import React from 'react';
import { Server, Activity, Shield, Database, ArrowRight, Radio } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function SocPreviewCard({ socData, onOpenSoc, className = '' }) {
  if (!socData) return null;

  const metrics = [
    { label: 'System Health', value: `${socData.systemHealthPercent}%`, color: 'text-emerald-500' },
    { label: 'API Latency', value: `${socData.apiLatencyMs}ms`, color: 'text-cyan-500' },
    { label: 'Active WebSockets', value: socData.activeWebsocketConnections.toLocaleString(), color: 'text-transit-500' },
    { label: 'Database Cluster', value: socData.databaseStatus, color: 'text-emerald-500' },
    { label: 'Redis Cache', value: socData.redisCacheStatus, color: 'text-cyan-400' },
    { label: 'Backup Status', value: socData.backupStatus, color: 'text-emerald-400' },
    { label: 'Security Threat Level', value: socData.securityThreatLevel, color: 'text-emerald-500' },
    { label: 'Active Incidents', value: socData.activeIncidentsCount, color: 'text-emerald-500' },
  ];

  return (
    <div className={cn('p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-6', className)}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Server className="w-5 h-5 text-transit-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">System Operations Center — Preview</h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-transit-500/10 text-transit-600 dark:text-transit-400 border border-transit-500/20">
          SIMULATED SYSTEM PREVIEW
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        {metrics.map((m) => (
          <div key={m.label} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">{m.label}</span>
            <div className={cn('text-sm font-extrabold truncate', m.color)}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-500 dark:text-slate-400">
        ℹ️ Full SOC infrastructure monitoring (server clusters, real-time database health, Redis cache visualization, security firewalls, and cloud autoscaling) will be available in <strong>ST-60</strong>.
      </div>

      <Button variant="primary" size="lg" fullWidth rightIcon={ArrowRight} onClick={onOpenSoc} className="shadow-glow font-bold">
        Open System Operations Center
      </Button>
    </div>
  );
}

export default SocPreviewCard;
