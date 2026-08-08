import React, { useState } from 'react';
import { 
  Bus, 
  MapPin, 
  Users, 
  Radio, 
  Navigation, 
  Activity, 
  Server, 
  AlertTriangle, 
  Clock, 
  Send, 
  RefreshCw, 
  Compass, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AppShell } from '../../layouts/AppShell.jsx';
import { PageHeader } from '../navigation/PageHeader.jsx';
import { Button } from '../ui/Button.jsx';
import { Badge, StatusBadge } from '../ui/Badge.jsx';
import { MetricCard } from '../cards/MetricCard.jsx';
import { StatusCard } from '../cards/StatusCard.jsx';
import { BusCard } from '../cards/BusCard.jsx';
import { RouteCard } from '../cards/RouteCard.jsx';
import { AlertCard } from '../cards/AlertCard.jsx';
import { InfrastructureCard } from '../cards/InfrastructureCard.jsx';
import { Sparkline } from '../dataviz/Sparkline.jsx';
import { GaugeDonut } from '../dataviz/GaugeDonut.jsx';
import { ProgressBar } from '../dataviz/ProgressBar.jsx';
import { WaypointNode } from '../maps/RoutePathPrimitives.jsx';
import { BusMapMarker, StopMapMarker } from '../maps/MapMarkerPrimitives.jsx';
import { LiveStatusPulse, EtaCountdown } from '../effects/LiveStatusPulse.jsx';
import { useToast } from '../ui/Toast.jsx';

export function AppShellShowcase() {
  const [currentRole, setCurrentRole] = useState('admin');
  const [activeItemId, setActiveItemId] = useState('dashboard');
  const [fluidWorkspace, setFluidWorkspace] = useState(false);
  const { addToast } = useToast();

  const handleSelectItem = (item) => {
    setActiveItemId(item.id);
    addToast({
      title: 'Navigation Changed',
      message: `Navigated to ${item.label} (${item.path})`,
      type: 'info',
    });
  };

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    setActiveItemId('dashboard');
    addToast({
      title: 'Workspace Role Switched',
      message: `Active environment set to ${newRole.toUpperCase()}`,
      type: 'success',
    });
  };

  return (
    <AppShell
      currentRole={currentRole}
      onRoleChange={handleRoleChange}
      activeItemId={activeItemId}
      onSelectItem={handleSelectItem}
      fluidWorkspace={fluidWorkspace}
    >
      {/* Shell Testing Toolbar */}
      <div className="mb-6 p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-transit-500/10 text-transit-500 border border-transit-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>ST-02 Application Shell Workbench</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Validating responsive shell, role-aware sidebar, top header, search, and notification popovers.
            </p>
          </div>
        </div>

        {/* Quick Role Tester Pills */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-slate-400 hidden md:inline">Quick Switch:</span>
          {['passenger', 'driver', 'admin', 'systemAdmin'].map((roleKey) => (
            <button
              key={roleKey}
              type="button"
              onClick={() => handleRoleChange(roleKey)}
              className={`text-xs font-mono font-semibold px-2.5 py-1 rounded-lg transition-all capitalize ${
                currentRole === roleKey
                  ? 'bg-transit-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-navy-700'
              }`}
            >
              {roleKey.replace('Admin', ' Admin')}
            </button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFluidWorkspace(!fluidWorkspace)}
            className="text-xs font-mono"
          >
            {fluidWorkspace ? 'Constrained Max Width' : 'Fluid SOC Width'}
          </Button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. PASSENGER ROLE WORKSPACE PREVIEW */}
      {/* ========================================================================= */}
      {currentRole === 'passenger' && (
        <div className="space-y-6">
          <PageHeader
            title="Passenger Live Mobility Hub"
            subtitle="Search city bus routes, track incoming vehicles in real time, and inspect stop ETAs."
            tag="Passenger Portal"
            breadcrumbs={[
              { label: 'SmartTransit' },
              { label: 'Passenger Explorer' },
              { label: 'Live Mobility Hub' },
            ]}
            actionSlot={
              <Button variant="primary" size="sm" leftIcon={Compass}>
                Plan New Journey
              </Button>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Next Arrival at Nearest Stop"
              value="3 mins"
              trend="Bus 245"
              trendDirection="up"
              icon={Clock}
              sparklineSlot={<Sparkline data={[6, 5, 4, 3]} color="#10b981" />}
            />
            <MetricCard
              title="Active Line Status"
              value="Optimal"
              trend="18 Lines"
              trendDirection="up"
              icon={Route}
              sparklineSlot={<Sparkline data={[12, 14, 16, 18]} color="#0c87eb" />}
            />
            <MetricCard
              title="Saved Favorite Stops"
              value="4"
              trend="All Online"
              trendDirection="neutral"
              icon={MapPin}
            />
            <MetricCard
              title="City Transit Alerts"
              value="1 Notice"
              trend="Low Impact"
              trendDirection="neutral"
              icon={AlertTriangle}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BusCard
              busNumber="Bus 245"
              routeCode="RT-108"
              origin="Borivali Central"
              destination="Andheri West Hub"
              eta="3 mins"
              occupancyPercent={45}
              occupancyStatus="LOW"
              status="LIVE"
              nextStop="Central Station Terminal"
            />
            <BusCard
              busNumber="Bus 312"
              routeCode="RT-204"
              origin="Metro Exchange"
              destination="International Airport"
              eta="11 mins"
              occupancyPercent={78}
              occupancyStatus="HIGH"
              status="LIVE"
              nextStop="Airport Express Way"
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. DRIVER ROLE WORKSPACE PREVIEW */}
      {/* ========================================================================= */}
      {currentRole === 'driver' && (
        <div className="space-y-6">
          <PageHeader
            title="Vehicle Driver Cockpit — NY-TR-8042"
            subtitle="Real-time telemetry guidance, route waypoint checklist, and live passenger counter."
            tag="Driver Cockpit"
            breadcrumbs={[
              { label: 'SmartTransit' },
              { label: 'Driver Operations' },
              { label: 'Cockpit NY-TR-8042' },
            ]}
            actionSlot={
              <Button variant="destructive" size="sm" leftIcon={AlertTriangle}>
                Trigger Emergency SOS
              </Button>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Current Telemetry Speed"
              value="38.4 km/h"
              trend="Limit: 50"
              trendDirection="up"
              icon={Navigation}
            />
            <MetricCard
              title="Passenger Occupancy"
              value="32 / 54"
              trend="59% Capacity"
              trendDirection="neutral"
              icon={Users}
            />
            <MetricCard
              title="Next Scheduled Stop"
              value="2.4 km"
              trend="ETA 4m"
              trendDirection="up"
              icon={MapPin}
            />
            <MetricCard
              title="Shift Duration"
              value="3h 42m"
              trend="On Schedule"
              trendDirection="up"
              icon={Clock}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Route Waypoint Progress Checklist
              </h4>
              <div className="space-y-2 pt-2">
                <WaypointNode stopName="1. Borivali Central Depot" stopCode="BST-001" isPassed={true} />
                <WaypointNode stopName="2. Goregaon Interchange" stopCode="BST-042" isPassed={true} />
                <WaypointNode stopName="3. Western Express Highway Hub" stopCode="BST-104" isCurrent={true} eta="Next in 4 mins" />
                <WaypointNode stopName="4. Andheri West Terminal" stopCode="BST-208" isDestination={true} eta="In 18 mins" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center space-y-4 text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Vehicle Passenger Capacity Meter
              </h4>
              <GaugeDonut value={59} size={110} color="#0c87eb" label="32 Seats" sublabel="59% Full" />
              <div className="w-full max-w-xs space-y-2">
                <ProgressBar label="Floor Standees" value={8} max={20} variant="warning" />
                <ProgressBar label="Battery Reserve" value={84} max={100} variant="success" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. TRANSPORT ADMIN ROLE WORKSPACE PREVIEW */}
      {/* ========================================================================= */}
      {currentRole === 'admin' && (
        <div className="space-y-6">
          <PageHeader
            title="Metropolitan Fleet Command & Dispatch"
            subtitle="Orchestrate active city transit vehicles, monitor on-time arrivals, and broadcast service alerts."
            tag="Transport Admin"
            breadcrumbs={[
              { label: 'SmartTransit' },
              { label: 'Fleet Management' },
              { label: 'Dispatch Overview' },
            ]}
            actionSlot={
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" leftIcon={RefreshCw}>
                  Refresh Telemetry
                </Button>
                <Button variant="primary" size="sm" leftIcon={Send}>
                  Broadcast City Alert
                </Button>
              </div>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Active Fleet Vehicles"
              value="256"
              trend="+12 buses"
              trendDirection="up"
              icon={Bus}
              sparklineSlot={<Sparkline data={[230, 240, 245, 250, 256]} color="#10b981" />}
            />
            <MetricCard
              title="On-Time Dispatch %"
              value="98.4%"
              trend="+0.6%"
              trendDirection="up"
              icon={Activity}
              sparklineSlot={<Sparkline data={[97.2, 97.8, 98.0, 98.4]} color="#0c87eb" />}
            />
            <MetricCard
              title="Passenger Volume (Today)"
              value="142,800"
              trend="+8.4%"
              trendDirection="up"
              icon={Users}
              sparklineSlot={<Sparkline data={[98, 112, 125, 138, 142]} color="#06b6d4" />}
            />
            <MetricCard
              title="Active Route Delays"
              value="2"
              trend="Resolved 4"
              trendDirection="down"
              icon={AlertTriangle}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RouteCard
              routeCode="RT-108"
              routeName="Metro Coastal Express Line"
              stopsCount={18}
              frequency="Every 8 mins"
              firstBus="05:30 AM"
              lastBus="11:45 PM"
              activeBuses={12}
              status="ACTIVE"
            />
            <AlertCard
              severity="HIGH"
              title="North Expressway Congestion"
              message="Road repairs causing temporary 8-minute delays on Route RT-108 and RT-204."
              timestamp="5 mins ago"
              affectedRoute="RT-108, RT-204"
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. SYSTEM ADMIN ROLE WORKSPACE PREVIEW */}
      {/* ========================================================================= */}
      {currentRole === 'systemAdmin' && (
        <div className="space-y-6">
          <PageHeader
            title="System Operations Center (SOC) Health Wall"
            subtitle="Monitor real-time GPS telemetry ingestion streams, WebSocket clusters, database health, and server nodes."
            tag="System Administrator"
            breadcrumbs={[
              { label: 'SmartTransit' },
              { label: 'Infrastructure' },
              { label: 'SOC Health Wall' },
            ]}
            actionSlot={
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" leftIcon={RefreshCw}>
                  Sync Node Mesh
                </Button>
                <Button variant="success" size="sm" leftIcon={ShieldCheck}>
                  Run Diagnostic Audit
                </Button>
              </div>
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Telemetry Ingestion Rate"
              value="14.2k/s"
              trend="100% Packet Health"
              trendDirection="up"
              icon={Radio}
              sparklineSlot={<Sparkline data={[12.1, 13.4, 13.8, 14.2]} color="#10b981" />}
            />
            <MetricCard
              title="Average Gateway Latency"
              value="24ms"
              trend="-4ms"
              trendDirection="down"
              icon={Activity}
              sparklineSlot={<Sparkline data={[32, 28, 26, 24]} color="#0c87eb" />}
            />
            <MetricCard
              title="Connected WebSocket Clients"
              value="8,940"
              trend="+620 today"
              trendDirection="up"
              icon={Users}
            />
            <MetricCard
              title="Cluster Uptime (30d)"
              value="99.98%"
              trend="0 Critical Outages"
              trendDirection="up"
              icon={Server}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfrastructureCard
              resourceName="GPS Telemetry Ingestion Gateway"
              type="CPU"
              utilizationPercent={42}
              status="ONLINE"
              throughput="14.2k msgs/sec"
              allocated="4 / 8 vCPU (50%)"
            />
            <InfrastructureCard
              resourceName="Redis Real-Time Bus Coordinate Cache"
              type="DATABASE"
              utilizationPercent={58}
              status="ONLINE"
              throughput="38.5k ops/sec"
              allocated="16 GB Memory Buffer"
            />
            <InfrastructureCard
              resourceName="WebSocket Real-Time Broadcast Cluster"
              type="WEBSOCKET"
              utilizationPercent={64}
              status="ONLINE"
              throughput="8,940 Active Sockets"
              allocated="High-Availability Zone A+B"
            />
          </div>
        </div>
      )}
    </AppShell>
  );
}

export default AppShellShowcase;
