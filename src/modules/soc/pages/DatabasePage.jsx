import React, { useState } from 'react';
import { Database } from 'lucide-react';
import { databaseService } from '../../../services/soc/databaseService.js';
import { DatabaseHealthCard } from '../components/DatabaseHealthCard.jsx';

export function DatabasePage() {
  const [dbData] = useState(() => databaseService.getDatabaseMetrics());

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-1 border border-emerald-500/20">
          <Database className="w-3.5 h-3.5" />
          <span>DATA STORAGE & CACHE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Database & Cache Cluster
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          PostgreSQL connection pool latency, replication sync, and Redis cache hit rates.
        </p>
      </div>

      <DatabaseHealthCard databaseMetrics={dbData} />
    </div>
  );
}

export default DatabasePage;
