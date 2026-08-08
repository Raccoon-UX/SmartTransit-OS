import React, { useState } from 'react';
import { Activity, BarChart3 } from 'lucide-react';
import { apiMonitoringService } from '../../../services/soc/apiMonitoringService.js';
import { ApiMetricCard } from '../components/ApiMetricCard.jsx';

export function ApiMonitoringPage() {
  const [endpoints] = useState(() => apiMonitoringService.getApiEndpoints());

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
          <Activity className="w-3.5 h-3.5" />
          <span>API GATEWAY TELEMETRY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          API Endpoint Monitoring
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Request rates, average response latency, P95 latency, and error rates per endpoint.
        </p>
      </div>

      <ApiMetricCard endpoints={endpoints} />
    </div>
  );
}

export default ApiMonitoringPage;
