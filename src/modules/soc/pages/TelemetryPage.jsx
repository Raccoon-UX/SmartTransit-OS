import React, { useState } from 'react';
import { Activity, BarChart3 } from 'lucide-react';
import { telemetryService } from '../../../services/soc/telemetryService.js';
import { TelemetryChart } from '../components/TelemetryChart.jsx';
import { cn } from '../../../utils/index.js';

export function TelemetryPage() {
  const [range, setRange] = useState('m15');
  const [data, setData] = useState(() => telemetryService.getTelemetrySeries('m15'));

  const handleRangeChange = (r) => {
    setRange(r);
    setData(telemetryService.getTelemetrySeries(r));
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-mono font-bold mb-1 border border-purple-500/20">
          <Activity className="w-3.5 h-3.5" />
          <span>DEEP OBSERVABILITY</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          System Telemetry Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Time-series observability metrics for CPU load and API gateway latency across time windows.
        </p>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="text-[10px] text-slate-400 font-bold uppercase">Time Range:</span>
        {[
          ['m15', '15 Minutes'],
          ['h1', '1 Hour'],
          ['h6', '6 Hours'],
          ['h24', '24 Hours'],
        ].map(([r, label]) => (
          <button
            key={r}
            type="button"
            onClick={() => handleRangeChange(r)}
            className={cn(
              'px-3 py-1.5 rounded-xl font-bold transition-colors',
              range === r
                ? 'bg-transit-500 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-navy-850 text-slate-600 dark:text-slate-400'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TelemetryChart title={`CPU Load Utilization (% - ${data.timeframe})`} series={data.cpuPercentSeries} color="#0c87eb" />
        <TelemetryChart title={`API Gateway Latency (ms - ${data.timeframe})`} series={data.apiLatencySeries} color="#06b6d4" />
      </div>
    </div>
  );
}

export default TelemetryPage;
