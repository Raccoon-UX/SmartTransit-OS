import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Cpu, Radio, Activity, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { aiEngine } from '../../../services/ai/aiEngine.js';
import { MetricCard } from '../../../components/cards/MetricCard.jsx';
import { AIInsightCard } from '../components/AIInsightCard.jsx';
import { AIDemoControls } from '../components/AIDemoControls.jsx';
import { ModelHealthCard } from '../components/ModelHealthCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';

export function AiOverviewPage({ onNavigate }) {
  const [aiSnapshot, setAiSnapshot] = useState(aiEngine.getSnapshot());

  useEffect(() => {
    const unsub = aiEngine.subscribe(setAiSnapshot);
    return () => unsub();
  }, []);

  const { overview, isSimulationActive, activeSimulationType } = aiSnapshot;

  return (
    <div className="space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Brain className="w-3.5 h-3.5 animate-pulse text-transit-500" />
            <span>AI TRANSIT INTELLIGENCE COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            AI Overview & Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time predictive ETAs, crowding forecasts, demand heatmaps, and explainable AI insights.
          </p>
        </div>
        <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
          DEMO AI INTELLIGENCE
        </span>
      </div>

      {/* Demo Controls */}
      <AIDemoControls isSimulationActive={isSimulationActive} activeType={activeSimulationType} />

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Predictions Today"
          value={overview.predictionsToday.toLocaleString()}
          trend="+12%"
          trendDirection="up"
          trendLabel="vs yesterday"
          icon={Brain}
        />
        <MetricCard
          title="High Confidence %"
          value={`${overview.highConfidencePercent}%`}
          trend="+2.4%"
          trendDirection="up"
          trendLabel="confidence score"
          icon={ShieldCheck}
        />
        <MetricCard
          title="Active Insights"
          value={overview.activeInsights}
          trend={`${overview.anomaliesDetected} anomalies`}
          trendDirection="neutral"
          trendLabel="in network"
          icon={Activity}
        />
        <MetricCard
          title="Avg Inference Latency"
          value={`${overview.avgInferenceLatencyMs} ms`}
          trend="-4ms"
          trendDirection="up"
          trendLabel="inference speed"
          icon={Cpu}
        />
      </div>

      {/* Top AI Insights Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">Active AI Intelligence Stream</h3>
          <Button variant="outline" size="sm" rightIcon={ArrowRight} onClick={() => onNavigate && onNavigate('/ai/recommendations')}>
            View All Recommendations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {overview.topInsights.map((insight) => (
            <AIInsightCard
              key={insight.id}
              title={insight.title}
              summary={insight.summary}
              confidence={insight.confidence}
              confidenceLevel={insight.confidenceLevel}
              variant={insight.type.toLowerCase()}
              timestamp={insight.timestamp}
              actionLabel="Inspect Intelligence"
              onAction={() => {
                if (onNavigate) {
                  if (insight.type === 'PREDICTION') onNavigate('/ai/eta');
                  else if (insight.type === 'ANOMALY') onNavigate('/ai/anomalies');
                  else if (insight.type === 'RECOMMENDATION') onNavigate('/ai/recommendations');
                  else onNavigate('/ai/system');
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Quick Navigation Panel */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">AI Intelligence Modules</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono font-bold">
          <Button variant="outline" size="md" onClick={() => onNavigate && onNavigate('/ai/eta')}>Predictive ETA</Button>
          <Button variant="outline" size="md" onClick={() => onNavigate && onNavigate('/ai/occupancy')}>Occupancy Forecast</Button>
          <Button variant="outline" size="md" onClick={() => onNavigate && onNavigate('/ai/demand')}>Demand Heatmap</Button>
          <Button variant="outline" size="md" onClick={() => onNavigate && onNavigate('/ai/routes')}>Route Intelligence</Button>
          <Button variant="outline" size="md" onClick={() => onNavigate && onNavigate('/ai/anomalies')}>Anomaly Detection</Button>
          <Button variant="outline" size="md" onClick={() => onNavigate && onNavigate('/ai/drivers')}>Driver Intelligence</Button>
          <Button variant="outline" size="md" onClick={() => onNavigate && onNavigate('/ai/alerts')}>Intelligent Alerts</Button>
          <Button variant="outline" size="md" onClick={() => onNavigate && onNavigate('/ai/recommendations')}>Recommendations</Button>
        </div>
      </div>
    </div>
  );
}

export default AiOverviewPage;
