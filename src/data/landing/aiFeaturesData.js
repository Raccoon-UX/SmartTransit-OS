import { Clock, Users, BarChart3, AlertOctagon } from 'lucide-react';

export const AI_FEATURES_DATA = [
  {
    id: 'eta-prediction',
    title: 'Predictive ETA Engine',
    tag: 'AI-Powered',
    description: 'Evaluates historical transit patterns, road weather factors, and live vehicle telemetry to calculate accurate arrival windows.',
    icon: Clock,
    metric: '94.7% accuracy',
    color: 'text-transit-500 bg-transit-500/10 border-transit-500/30',
  },
  {
    id: 'occupancy-forecasting',
    title: 'Occupancy Forecasting',
    tag: 'Intelligence Layer',
    description: 'Anticipates passenger overcrowding at high-demand stations before buses arrive, enabling smarter fleet dispatch.',
    icon: Users,
    metric: 'Real-time classification',
    color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30',
  },
  {
    id: 'demand-forecasting',
    title: 'Dynamic Demand Modeling',
    tag: 'Predictive',
    description: 'Identifies surge commute periods, festival peaks, and urban congestion bottlenecks for data-informed route scheduling.',
    icon: BarChart3,
    metric: 'Multi-route modeling',
    color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30',
  },
  {
    id: 'anomaly-detection',
    title: 'Transit Anomaly Detection',
    tag: 'Automated Safety',
    description: 'Instantly flags unexpected vehicle halts, route deviations, telemetry dropouts, or sudden speed anomalies.',
    icon: AlertOctagon,
    metric: '< 2s alert latency',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  },
];
