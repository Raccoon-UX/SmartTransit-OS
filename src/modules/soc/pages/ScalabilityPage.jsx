import React, { useState, useEffect } from 'react';
import { Zap, Server, Activity } from 'lucide-react';
import { telemetryEngine } from '../../../services/soc/telemetryEngine.js';
import { scalabilityService } from '../../../services/soc/scalabilityService.js';
import { TrafficSurgeSimulator } from '../components/TrafficSurgeSimulator.jsx';
import { SystemCorrelationFlow } from '../components/SystemCorrelationFlow.jsx';

export function ScalabilityPage() {
  const [telemetry, setTelemetry] = useState(() => telemetryEngine.getSnapshot());

  useEffect(() => {
    const unsub = telemetryEngine.subscribe(setTelemetry);
    return () => unsub();
  }, []);

  const handleTriggerSurge = () => {
    scalabilityService.triggerTrafficSurge();
  };

  const handleTriggerScaleOut = () => {
    scalabilityService.triggerScaleOut();
  };

  const handleReset = () => {
    scalabilityService.resetSimulation();
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold mb-1 border border-amber-500/20">
          <Zap className="w-3.5 h-3.5" />
          <span>CAPACITY & LOAD MANAGEMENT</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
          Scalability Center & Surge Simulator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Capacity headroom meter, load threshold watchers, and interactive Traffic Surge simulation.
        </p>
      </div>

      {/* Traffic Surge Simulator Interactive Control Panel */}
      <TrafficSurgeSimulator
        isSurgeActive={telemetry.isSurgeActive}
        isScaledOut={telemetry.isScaledOut}
        onTriggerSurge={handleTriggerSurge}
        onTriggerScaleOut={handleTriggerScaleOut}
        onReset={handleReset}
      />

      {/* Dependency Correlation Pipeline */}
      <SystemCorrelationFlow
        isSurgeActive={telemetry.isSurgeActive}
        isScaledOut={telemetry.isScaledOut}
      />
    </div>
  );
}

export default ScalabilityPage;
