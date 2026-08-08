import React, { useState, useEffect } from 'react';
import { Radio, Sparkles } from 'lucide-react';
import { telemetryEngine } from '../../../services/soc/telemetryEngine.js';
import { healthService } from '../../../services/soc/healthService.js';
import { socActivityService } from '../../../services/soc/socActivityService.js';
import { SystemHealthBanner } from '../components/SystemHealthBanner.jsx';
import { ServiceHealthMatrix } from '../components/ServiceHealthMatrix.jsx';
import { SocActivityFeed } from '../components/SocActivityFeed.jsx';
import { SystemHealthDrilldownModal } from '../components/SystemHealthDrilldownModal.jsx';

export function SocOverviewPage() {
  const [telemetry, setTelemetry] = useState(telemetryEngine.getSnapshot());
  const [services] = useState(healthService.getServiceMatrix());
  const [activities, setActivities] = useState([]);
  const [selectedSubsystem, setSelectedSubsystem] = useState(null);

  useEffect(() => {
    const unsubTelemetry = telemetryEngine.subscribe(setTelemetry);
    const unsubActivity = socActivityService.subscribe(setActivities);
    return () => {
      unsubTelemetry();
      unsubActivity();
    };
  }, []);

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
            <span>ENTERPRISE NOC / SRE COMMAND</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            System Operations Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time infrastructure health, service reliability, and platform operational status.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">SmartTransit OS v2.0 • SOC Engine</span>
      </div>

      {/* Prominent System Health Banner */}
      <SystemHealthBanner overview={telemetry.overview} />

      {/* AI Capacity Risk Prediction Banner */}
      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 animate-pulse" />
          <span className="text-slate-700 dark:text-slate-200">
            <strong>AI CAPACITY PREDICTOR:</strong> Cluster load projected to reach <strong>91%</strong> in 15 mins. Prepare application node scaling.
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-[10px] shrink-0">
          HEALTH SCORE: 94/100
        </span>
      </div>

      {/* 12-Service Health Matrix Grid */}
      <ServiceHealthMatrix services={services} onSelectService={(srv) => setSelectedSubsystem(srv)} />

      {/* Central SOC Audit Stream */}
      <SocActivityFeed activities={activities.slice(0, 5)} />

      {/* System Health Subsystem Drilldown Modal */}
      <SystemHealthDrilldownModal
        isOpen={Boolean(selectedSubsystem)}
        onClose={() => setSelectedSubsystem(null)}
        subsystem={selectedSubsystem}
      />
    </div>
  );
}

export default SocOverviewPage;

