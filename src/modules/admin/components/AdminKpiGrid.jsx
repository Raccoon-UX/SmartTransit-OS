import React from 'react';
import { Bus, Users, Clock, AlertTriangle, Radio, ShieldCheck } from 'lucide-react';
import { MetricCard } from '../../../components/cards/MetricCard.jsx';

export function AdminKpiGrid({ kpi }) {
  if (!kpi) return null;

  return (
    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 min-w-0 w-full">
      <MetricCard
        label="Active Fleet Buses"
        value={`${kpi.activeBusesCount} / ${kpi.totalFleetCount}`}
        trend="82% Utilization"
        trendDirection="up"
        icon={Bus}
      />

      <MetricCard
        label="Active Pilots / Drivers"
        value={kpi.activeDriversCount}
        trend="241 / 285 Shift Active"
        trendDirection="neutral"
        icon={Users}
      />

      <MetricCard
        label="Delayed Vehicles"
        value={kpi.delayedVehiclesCount}
        trend="Requires Dispatch Reroute"
        trendDirection="down"
        icon={AlertTriangle}
      />

      <MetricCard
        label="On-Time Performance"
        value={`${kpi.onTimePerformancePercent}%`}
        trend="+1.4% Target Surpassed"
        trendDirection="up"
        icon={ShieldCheck}
      />

      <MetricCard
        label="Average ETA Window"
        value={kpi.avgEtaMinutes}
        trend="Sub-Minute Precision"
        trendDirection="up"
        icon={Clock}
      />

      <MetricCard
        label="Active Transit Alerts"
        value={kpi.activeAlertsCount}
        trend="Public Kiosks Broadcasted"
        trendDirection="neutral"
        icon={Radio}
      />
    </div>
  );
}

export default AdminKpiGrid;
