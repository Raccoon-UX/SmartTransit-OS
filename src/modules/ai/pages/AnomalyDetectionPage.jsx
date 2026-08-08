import React, { useState, useEffect } from 'react';
import { AlertTriangle, Filter, ShieldAlert, Cpu, Activity } from 'lucide-react';
import { anomalyService } from '../../../services/ai/anomalyService.js';
import { AnomalyCard } from '../components/AnomalyCard.jsx';
import { cn } from '../../../utils/index.js';

export function AnomalyDetectionPage() {
  const [anomalies, setAnomalies] = useState([]);
  const [domainFilter, setDomainFilter] = useState('ALL');

  useEffect(() => {
    const unsub = anomalyService.subscribe((data) => setAnomalies(data.anomalies));
    return () => unsub();
  }, []);

  const filtered = domainFilter === 'ALL' ? anomalies : anomalies.filter((a) => a.domain === domainFilter);

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold mb-1 border border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>ANOMALY DETECTION ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Multi-Domain Anomaly Detection Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Simulated real-time anomaly detection across Fleet, GPS, API, Database, Occupancy, and Routes.
          </p>
        </div>

        {/* Domain Filters */}
        <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold overflow-x-auto">
          {['ALL', 'FLEET', 'GPS', 'OCCUPANCY', 'API', 'DATABASE'].map((d) => (
            <button
              key={d}
              onClick={() => setDomainFilter(d)}
              className={cn(
                'px-3 py-1.5 rounded-lg transition-all shrink-0',
                domainFilter === d ? 'bg-white dark:bg-navy-800 text-transit-500 shadow-sm' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Detected Anomaly Events ({filtered.length})
          </h3>
          <span className="text-xs font-mono text-slate-400">DEMO ANOMALY SIMULATION</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((anomaly) => (
            <AnomalyCard key={anomaly.id} anomaly={anomaly} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnomalyDetectionPage;
