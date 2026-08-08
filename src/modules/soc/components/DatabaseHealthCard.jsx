import React from 'react';
import { Database, Server, Activity, ShieldCheck } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function DatabaseHealthCard({ databaseMetrics, className = '' }) {
  if (!databaseMetrics) return null;

  const { postgres, redis } = databaseMetrics;

  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-6 text-left font-mono text-xs', className)}>
      {/* PostgreSQL Primary Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-emerald-500" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">PostgreSQL Primary DB Cluster</h4>
          </div>
          <span className="text-[10px] font-bold text-emerald-500">● {postgres.status}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Query Latency</span>
            <span className="font-bold text-emerald-500 text-sm">{postgres.queryLatencyMs} ms</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Connection Pool</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{postgres.activeConnections} / {postgres.maxConnections}</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Storage Usage</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{postgres.storagePercent}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Replication</span>
            <span className="font-bold text-emerald-500 text-xs truncate block">{postgres.replicationState}</span>
          </div>
        </div>
      </div>

      {/* Redis Cache Cluster Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-500" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-sans">Redis Sentinel Cache Cluster</h4>
          </div>
          <span className="text-[10px] font-bold text-emerald-500">● {redis.status}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cache Hit Rate</span>
            <span className="font-bold text-emerald-500 text-sm">{redis.hitRatePercent}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Cache Latency</span>
            <span className="font-bold text-cyan-500 text-sm">{redis.latencyMs} ms</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Memory Usage</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{redis.memoryPercent}%</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Command Rate</span>
            <span className="font-bold text-slate-900 dark:text-white text-xs block">{redis.commandsPerSec.toLocaleString()} ops/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DatabaseHealthCard;
