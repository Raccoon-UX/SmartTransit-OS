import React from 'react';
import { Bus, Activity, Users, Clock, CheckCircle2 } from 'lucide-react';
import { MetricCard } from '../../../components/cards/MetricCard.jsx';
import { Sparkline } from '../../../components/dataviz/Sparkline.jsx';
import { LANDING_METRICS } from '../../../data/landing/transitMetrics.js';
import { cn } from '../../../utils/index.js';

export function LiveFleetWidget({ className = '' }) {
  const p = LANDING_METRICS.preview;

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left', className)}>
      <MetricCard
        title="Active Fleet Buses"
        value={p.activeFleet.toString()}
        trend="+12 buses"
        trendDirection="up"
        icon={Bus}
        sparklineSlot={<Sparkline data={[210, 225, 240, 250, 256]} color="#10b981" />}
      />

      <MetricCard
        title="Live Passenger Trips"
        value={p.liveTrips.toString()}
        trend="In motion"
        trendDirection="up"
        icon={Activity}
        sparklineSlot={<Sparkline data={[140, 155, 168, 175, 184]} color="#0c87eb" />}
      />

      <MetricCard
        title="Average Citywide ETA"
        value={p.averageEta}
        trend="-1.4m vs target"
        trendDirection="down"
        icon={Clock}
        sparklineSlot={<Sparkline data={[9, 8, 7.2, 6.5, 6]} color="#f59e0b" />}
      />

      <MetricCard
        title="On-Time Dispatch Rate"
        value={p.onTimeRate}
        trend="+1.2%"
        trendDirection="up"
        icon={CheckCircle2}
        sparklineSlot={<Sparkline data={[92.4, 93.1, 94.0, 94.7]} color="#10b981" />}
      />
    </div>
  );
}

export default LiveFleetWidget;
