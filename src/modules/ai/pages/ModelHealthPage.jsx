import React, { useState, useEffect } from 'react';
import { Cpu, Activity, ShieldCheck, Zap } from 'lucide-react';
import { aiEngine } from '../../../services/ai/aiEngine.js';
import { ModelHealthCard } from '../components/ModelHealthCard.jsx';

export function ModelHealthPage() {
  const [snapshot, setSnapshot] = useState(aiEngine.getSnapshot());

  useEffect(() => {
    const unsub = aiEngine.subscribe(setSnapshot);
    return () => unsub();
  }, []);

  const models = [
    { name: 'ETA Intelligence Service', status: 'READY', latencyMs: snapshot.overview.avgInferenceLatencyMs, predictionsCount: 420, confidenceAvg: 91, lastInference: 'Just now' },
    { name: 'Occupancy Forecasting Model', status: 'READY', latencyMs: snapshot.overview.avgInferenceLatencyMs + 8, predictionsCount: 284, confidenceAvg: 89, lastInference: 'Just now' },
    { name: 'Passenger Demand Predictor', status: 'READY', latencyMs: snapshot.overview.avgInferenceLatencyMs + 4, predictionsCount: 196, confidenceAvg: 88, lastInference: '1m ago' },
    { name: 'Multi-Domain Anomaly Detector', status: 'READY', latencyMs: snapshot.overview.avgInferenceLatencyMs + 12, predictionsCount: 154, confidenceAvg: 86, lastInference: 'Just now' },
    { name: 'Recommendation Engine', status: 'READY', latencyMs: snapshot.overview.avgInferenceLatencyMs + 2, predictionsCount: 112, confidenceAvg: 85, lastInference: '2m ago' },
    { name: 'SOC Incident AI Assessment', status: 'DEGRADED', latencyMs: snapshot.overview.avgInferenceLatencyMs + 48, predictionsCount: 48, confidenceAvg: 78, lastInference: '5m ago' },
  ];

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI MODEL HEALTH MONITOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            AI Service & Model Health
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monitoring simulated inference latency, prediction counts, and service status across AI models.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
          SYSTEM ADMIN ACCESS ONLY
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((m, idx) => (
          <ModelHealthCard
            key={idx}
            name={m.name}
            status={m.status}
            latencyMs={m.latencyMs}
            predictionsCount={m.predictionsCount}
            confidenceAvg={m.confidenceAvg}
            lastInference={m.lastInference}
          />
        ))}
      </div>
    </div>
  );
}

export default ModelHealthPage;
