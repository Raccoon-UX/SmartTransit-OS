import React from 'react';
import { Database, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function BackupStatusCard({ backupData, onSimulateRestore, className = '' }) {
  if (!backupData) return null;

  return (
    <div className={cn('p-6 sm:p-7 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-5 font-mono text-xs', className)}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">Disaster Recovery & Backup Readiness</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">Encrypted cold storage backup snapshots and DR objectives.</p>
        </div>
        <span className="text-xs font-bold text-emerald-500">● {backupData.status}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">DR Readiness</span>
          <span className="text-xl font-extrabold text-emerald-500 mt-1 block">{backupData.drReadinessPercent}%</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">RPO Target</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">{backupData.rpoMinutes} min</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">RTO Target</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-1 block">{backupData.rtoMinutes} min</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Last Restore Test</span>
          <span className="text-xs font-extrabold text-emerald-500 mt-1 block">{backupData.lastRestoreTest}</span>
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <Button variant="outline" size="sm" leftIcon={ShieldCheck} onClick={onSimulateRestore}>
          Simulate Restore Test
        </Button>
      </div>
    </div>
  );
}

export default BackupStatusCard;
