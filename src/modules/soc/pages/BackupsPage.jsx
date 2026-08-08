import React, { useState } from 'react';
import { Database, ShieldCheck } from 'lucide-react';
import { backupService } from '../../../services/soc/backupService.js';
import { BackupStatusCard } from '../components/BackupStatusCard.jsx';

export function BackupsPage() {
  const [backupData] = useState(() => backupService.getBackupData());
  const [toast, setToast] = useState(null);

  const handleSimulateRestore = () => {
    const res = backupService.simulateRestoreTest();
    setToast(`${res.details} (${res.timestamp})`);
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-1 border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>DATA SAFETY & DR</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Backups & Disaster Recovery Readiness
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Automated cold snapshot history, RPO/RTO targets, and simulated restore test verification.
        </p>
      </div>

      {toast && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700 shadow-lg">
          ✓ {toast}
        </div>
      )}

      <BackupStatusCard backupData={backupData} onSimulateRestore={handleSimulateRestore} />
    </div>
  );
}

export default BackupsPage;
