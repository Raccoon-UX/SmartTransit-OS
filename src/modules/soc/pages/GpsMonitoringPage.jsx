import React, { useState } from 'react';
import { Radio } from 'lucide-react';
import { gpsMonitoringService } from '../../../services/soc/gpsMonitoringService.js';
import { GpsHealthCard } from '../components/GpsHealthCard.jsx';

export function GpsMonitoringPage() {
  const [gpsData] = useState(() => gpsMonitoringService.getGpsTelemetry());

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-1 border border-emerald-500/20">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>GPS PIPELINE</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          GPS Telemetry Stream Monitoring
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Active vehicle feeds, coordinate event throughput rates, latency, and packet drop analysis.
        </p>
      </div>

      <GpsHealthCard gpsData={gpsData} />
    </div>
  );
}

export default GpsMonitoringPage;
