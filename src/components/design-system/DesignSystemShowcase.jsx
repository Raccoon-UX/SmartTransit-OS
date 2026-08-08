import React, { useState } from 'react';
import { 
  Sun, 
  Moon, 
  Layers, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Radio, 
  Bus, 
  Navigation, 
  Server, 
  Database, 
  Wifi, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  Sliders,
  Send,
  Eye
} from 'lucide-react';
import { useTheme } from '../../design-system/context/ThemeContext.jsx';
import { Button } from '../ui/Button.jsx';
import { TextInput, SearchInput, Select, MultiSelect, PasswordInput, NumberInput, Textarea } from '../ui/Input.jsx';
import { Toggle, Checkbox, Radio as RadioInput } from '../ui/FormControls.jsx';
import { Badge, StatusBadge } from '../ui/Badge.jsx';
import { StatusDot, StatusIndicator } from '../ui/StatusIndicator.jsx';
import { Modal, ConfirmationModal } from '../ui/Modal.jsx';
import { Drawer } from '../ui/Drawer.jsx';
import { Alert } from '../ui/Alert.jsx';
import { useToast } from '../ui/Toast.jsx';
import { MetricCardSkeleton, BusCardSkeleton, TableSkeleton, Spinner, PageLoading } from '../ui/LoadingStates.jsx';
import { EmptyState, ErrorState } from '../ui/EmptyState.jsx';
import { Breadcrumbs } from '../ui/Breadcrumbs.jsx';

// Cards
import { MetricCard } from '../cards/MetricCard.jsx';
import { StatusCard } from '../cards/StatusCard.jsx';
import { BusCard } from '../cards/BusCard.jsx';
import { RouteCard } from '../cards/RouteCard.jsx';
import { AlertCard } from '../cards/AlertCard.jsx';
import { AnalyticsCard } from '../cards/AnalyticsCard.jsx';
import { InfrastructureCard } from '../cards/InfrastructureCard.jsx';

// Navigation & DataViz
import { PageHeader } from '../navigation/PageHeader.jsx';
import { TabNavigation } from '../navigation/TabNavigation.jsx';
import { Sparkline } from '../dataviz/Sparkline.jsx';
import { GaugeDonut } from '../dataviz/GaugeDonut.jsx';
import { ProgressBar } from '../dataviz/ProgressBar.jsx';

// Maps & Special Effects
import { BusMapMarker, StopMapMarker, UserLocationMarker } from '../maps/MapMarkerPrimitives.jsx';
import { WaypointNode, TrafficSegment } from '../maps/RoutePathPrimitives.jsx';
import { LiveGpsPulse } from '../effects/LiveGpsPulse.jsx';
import { LiveStatusPulse, EtaCountdown } from '../effects/LiveStatusPulse.jsx';

export function DesignSystemShowcase() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { addToast } = useToast();

  // Interactive UI State
  const [activeTab, setActiveTab] = useState('tokens');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [toggleVal, setToggleVal] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState('standard');
  const [multiSelectVal, setMultiSelectVal] = useState(['gps', 'eta']);
  const [buttonLoading, setButtonLoading] = useState(false);

  const tabs = [
    { id: 'tokens', label: '1. Tokens & Color Palette' },
    { id: 'buttons', label: '2. Buttons & Inputs' },
    { id: 'badges', label: '3. Status Badges & Indicators' },
    { id: 'cards', label: '4. Card Family' },
    { id: 'dataviz', label: '5. DataViz & Map Primitives' },
    { id: 'dialogs', label: '6. Feedback, Modals & Drawers' },
    { id: 'loading', label: '7. Loading & Empty States' },
  ];

  const handleTestToast = (type) => {
    addToast({
      title: `${type.toUpperCase()} Notification`,
      message: `Simulated real-time SmartTransit OS ${type} event dispatched to telemetry mesh.`,
      type,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col justify-between">
      {/* Top System Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-navy-900/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-transit-500 to-transit-700 flex items-center justify-center shadow-glow-sm">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg tracking-tight font-sans text-slate-900 dark:text-white flex items-center gap-2">
                <span>SmartTransit</span>
                <span className="text-transit-500 font-semibold">OS</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-850 text-transit-600 dark:text-transit-300 border border-slate-200 dark:border-slate-700">
                  DESIGN SYSTEM ST-01
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Live Telemetry Pulse indicator */}
            <div className="hidden sm:flex items-center space-x-2 text-xs font-mono px-3 py-1 rounded-full bg-slate-100 dark:bg-navy-850 border border-slate-200 dark:border-slate-850 text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live"></span>
              <span>Tokens: Active</span>
            </div>

            {/* Theme Switcher Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              leftIcon={isDark ? Sun : Moon}
              className="text-xs font-mono font-semibold"
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8 text-left">
        {/* Banner Section */}
        <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-2 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ST-01 REUSABLE VISUAL SPECIFICATION ACTIVE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Enterprise Design Language & Component Catalog
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Centralized design tokens, semantic statuses, accessible inputs, KPI cards, and telemetry indicators 
                powering future modules (Passenger Portal, Driver Cockpit, Transport Admin, Digital Bus Stops, and SOC).
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                Inspect Modal
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsDrawerOpen(true)}
              >
                Inspect Side Drawer
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <TabNavigation
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* ========================================================================= */}
        {/* TAB 1: TOKENS & COLOR PALETTE */}
        {/* ========================================================================= */}
        {activeTab === 'tokens' && (
          <section className="space-y-6">
            <PageHeader
              title="Design Tokens & Semantic Palette"
              subtitle="Curated smart city color tokens conforming to WCAG AA contrast standards."
              tag="Tokens"
            />

            {/* Primary Brand Palette */}
            <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Primary Identity — Intelligent Transit Blue
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { code: '50', hex: '#f0f7ff', bg: 'bg-transit-50', text: 'text-slate-800' },
                  { code: '100', hex: '#e0effe', bg: 'bg-transit-100', text: 'text-slate-800' },
                  { code: '300', hex: '#7cc5fb', bg: 'bg-transit-300', text: 'text-slate-900' },
                  { code: '500 (Core)', hex: '#0c87eb', bg: 'bg-transit-500', text: 'text-white' },
                  { code: '700', hex: '#0355a3', bg: 'bg-transit-700', text: 'text-white' },
                  { code: '900', hex: '#0c3d70', bg: 'bg-transit-900', text: 'text-white' },
                  { code: '950', hex: '#08274a', bg: 'bg-transit-950', text: 'text-white' },
                ].map((shade) => (
                  <div key={shade.code} className={`p-3 rounded-xl ${shade.bg} ${shade.text} border border-black/5`}>
                    <div className="font-bold text-xs font-mono">{shade.code}</div>
                    <div className="text-[10px] opacity-80 font-mono">{shade.hex}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic Meaning Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 dark:bg-emerald-950/20 text-left">
                <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>SUCCESS / LIVE</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Online vehicles, normal route flow, available seating, resolved incidents.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-950/20 text-left">
                <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-400 font-bold text-xs mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>WARNING / DELAYED</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Traffic congestion, moderate passenger occupancy, high server utilization.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 dark:bg-rose-950/20 text-left">
                <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-bold text-xs mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>CRITICAL / EMERGENCY</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Driver SOS, hardware offline, extreme overcrowding, system outages.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-transit-500/30 bg-transit-500/5 dark:bg-transit-950/20 text-left">
                <div className="flex items-center space-x-2 text-transit-600 dark:text-transit-400 font-bold text-xs mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-transit-500" />
                  <span>INFO / TELEMETRY</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  GPS coordinates, route waypoint updates, public notices, ETA calculations.
                </p>
              </div>
            </div>

            {/* Typography Scale Demonstration */}
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Typography Hierarchy (Outfit & Inter & JetBrains Mono)
              </h3>
              <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800/80">
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Display (40px)</span>
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-slate-900 dark:text-white">
                    Smart City Intelligent Fleet
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">H1 / Module Header (32px)</span>
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Command & Dispatch Operations
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">H2 / Card Title (24px)</span>
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    Real-Time Bus Tracking & ETA
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">Technical Monospace Metric</span>
                  <div className="text-2xl font-bold font-mono text-transit-500">
                    LAT 19.0760° N, LNG 72.8777° E • 38.4 KM/H
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: BUTTONS & INPUTS */}
        {/* ========================================================================= */}
        {activeTab === 'buttons' && (
          <section className="space-y-6">
            <PageHeader
              title="Button & Form Input System"
              subtitle="Reusable action buttons, search fields, text controls, and validation indicators."
              tag="Forms"
            />

            {/* Buttons Matrix */}
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Button Variants & States
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" size="md" leftIcon={Send}>
                  Primary CTA
                </Button>
                <Button variant="secondary" size="md">
                  Secondary Action
                </Button>
                <Button variant="outline" size="md">
                  Outline
                </Button>
                <Button variant="ghost" size="md">
                  Ghost Button
                </Button>
                <Button variant="destructive" size="md">
                  Destructive
                </Button>
                <Button variant="success" size="md">
                  Success
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  isLoading={buttonLoading}
                  onClick={() => {
                    setButtonLoading(true);
                    setTimeout(() => setButtonLoading(false), 2000);
                  }}
                >
                  {buttonLoading ? 'Syncing...' : 'Click for Loading State'}
                </Button>
                <Button variant="primary" size="md" isDisabled={true}>
                  Disabled
                </Button>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center space-x-3">
                <span className="text-xs font-mono text-slate-500">Sizes:</span>
                <Button variant="primary" size="sm">Small</Button>
                <Button variant="primary" size="md">Medium</Button>
                <Button variant="primary" size="lg">Large</Button>
              </div>
            </div>

            {/* Inputs Matrix */}
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Form Inputs & Search
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Vehicle Serial ID"
                  placeholder="e.g. BUS-NY-8042"
                  helperText="Unique vehicle telematics hardware serial"
                />

                <SearchInput
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClear={() => setSearchValue('')}
                  placeholder="Search routes, bus numbers, stop IDs..."
                />

                <Select
                  label="Assigned Route Line"
                  options={[
                    { value: 'RT-108', label: 'Route RT-108: Borivali ⇄ Andheri' },
                    { value: 'RT-204', label: 'Route RT-204: Metro Station ⇄ Airport' },
                    { value: 'RT-302', label: 'Route RT-302: Coastal Express Highway' },
                  ]}
                />

                <MultiSelect
                  label="Enabled Telemetry Sensors"
                  options={[
                    { value: 'gps', label: 'GPS Broadcaster' },
                    { value: 'eta', label: 'AI ETA Predictor' },
                    { value: 'occupancy', label: 'Optical Passenger Counter' },
                    { value: 'sos', label: 'Emergency Beacon' },
                  ]}
                  selected={multiSelectVal}
                  onChange={setMultiSelectVal}
                />

                <PasswordInput
                  label="Driver Authorization PIN"
                  placeholder="Enter 6-digit access code"
                />

                <NumberInput
                  label="Maximum Seating Capacity"
                  defaultValue={54}
                  min={10}
                  max={120}
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Toggle
                  label="Real-Time GPS Broadcast"
                  description="Transmit coordinates every 2s"
                  checked={toggleVal}
                  onChange={setToggleVal}
                />

                <Checkbox
                  label="Enable Automatic Incident Escalation"
                  checked={checkboxVal}
                  onChange={setCheckboxVal}
                />

                <div className="space-y-1">
                  <span className="block text-xs font-semibold uppercase text-slate-600 dark:text-slate-300 mb-1">
                    Route Priority
                  </span>
                  <div className="flex space-x-3">
                    <RadioInput
                      label="Standard"
                      name="priority"
                      value="standard"
                      checked={radioVal === 'standard'}
                      onChange={setRadioVal}
                    />
                    <RadioInput
                      label="Express"
                      name="priority"
                      value="express"
                      checked={radioVal === 'express'}
                      onChange={setRadioVal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: STATUS BADGES & INDICATORS */}
        {/* ========================================================================= */}
        {activeTab === 'badges' && (
          <section className="space-y-6">
            <PageHeader
              title="Status System & Badges"
              subtitle="Dual text + icon + color status indicators ensuring full accessibility."
              tag="Status"
            />

            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                11 Semantic Status Badge States
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[
                  'LIVE',
                  'ONLINE',
                  'OFFLINE',
                  'DELAYED',
                  'APPROACHING',
                  'MAINTENANCE',
                  'WARNING',
                  'CRITICAL',
                  'RESOLVED',
                  'ACTIVE',
                  'INACTIVE',
                ].map((st) => (
                  <div key={st} className="p-3 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <StatusBadge status={st} size="sm" />
                    <span className="text-[10px] font-mono text-slate-400">status={st}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Telemetry Dots & Pulses
                </h4>
                <div className="flex flex-wrap gap-4 items-center">
                  <StatusIndicator status="LIVE" label="GPS Broadcaster (Live Pulse)" />
                  <StatusIndicator status="ONLINE" label="WebSocket Gateway" />
                  <StatusIndicator status="DELAYED" label="Traffic Anomaly" />
                  <StatusIndicator status="CRITICAL" label="Hardware Alert" />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: CARD FAMILY */}
        {/* ========================================================================= */}
        {activeTab === 'cards' && (
          <section className="space-y-6">
            <PageHeader
              title="SmartTransit OS Card Family"
              subtitle="Metric cards, vehicle telemetry cards, route information, alert notices, and server cards."
              tag="Cards"
            />

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Active Fleet Buses"
                value="256"
                trend="+12%"
                trendDirection="up"
                icon={Bus}
                sparklineSlot={<Sparkline data={[180, 195, 210, 230, 220, 256]} color="#10b981" />}
              />
              <MetricCard
                title="On-Time Dispatch %"
                value="98.4%"
                trend="+0.8%"
                trendDirection="up"
                icon={Activity}
                sparklineSlot={<Sparkline data={[96, 97, 96.5, 98, 97.8, 98.4]} color="#0c87eb" />}
              />
              <MetricCard
                title="Average Transit Delay"
                value="1.8 min"
                trend="-14%"
                trendDirection="down"
                icon={Radio}
                sparklineSlot={<Sparkline data={[3.2, 2.8, 2.5, 2.1, 1.8]} color="#f59e0b" />}
              />
              <MetricCard
                title="Active Incidents"
                value="2"
                trend="Stable"
                trendDirection="neutral"
                icon={AlertTriangle}
              />
            </div>

            {/* Bus Card & Route Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BusCard
                busNumber="Bus 245"
                routeCode="RT-108"
                origin="Borivali Central"
                destination="Andheri West Hub"
                eta="4 mins"
                occupancyPercent={58}
                occupancyStatus="MODERATE"
                status="LIVE"
                nextStop="Goregaon East"
              />

              <RouteCard
                routeCode="RT-302"
                routeName="Metro Coastal Express"
                stopsCount={18}
                frequency="Every 8 mins"
                firstBus="05:30 AM"
                lastBus="11:45 PM"
                activeBuses={12}
                status="ACTIVE"
              />
            </div>

            {/* Alert Cards & Infrastructure Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AlertCard
                severity="HIGH"
                title="Route RT-108 Delay Notice"
                message="Heavy roadworks near Western Expressway causing an estimated 12-minute delay."
                timestamp="3 mins ago"
                affectedRoute="RT-108"
              />

              <InfrastructureCard
                resourceName="Core Telemetry Ingestion Node"
                type="CPU"
                utilizationPercent={42}
                status="ONLINE"
                throughput="14.2k msgs/sec"
                allocated="4 / 8 vCPU (50%)"
              />
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: DATAVIZ & MAP PRIMITIVES */}
        {/* ========================================================================= */}
        {activeTab === 'dataviz' && (
          <section className="space-y-6">
            <PageHeader
              title="Data Visualization & Map Primitives"
              subtitle="SVG Sparklines, circular occupancy gauges, progress meters, and transit map pins."
              tag="DataViz"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Gauge Donut Card */}
              <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center flex flex-col items-center justify-center space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Fleet Occupancy Gauge
                </h4>
                <GaugeDonut value={68} size={90} color="#0c87eb" sublabel="Occupied" />
                <p className="text-xs text-slate-500">68% average passenger capacity across active route</p>
              </div>

              {/* Progress Meters */}
              <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Telemetry Resource Meters
                </h4>
                <ProgressBar label="Telemetry Ingestion" value={78} variant="transit" />
                <ProgressBar label="GPS Satellite Lock" value={95} variant="success" />
                <ProgressBar label="Memory Buffer" value={45} variant="warning" />
              </div>

              {/* Map Marker Primitives */}
              <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Map Marker Overlays
                </h4>
                <div className="flex items-center space-x-6">
                  <BusMapMarker busNumber="245" heading={60} isSelected={true} />
                  <StopMapMarker stopCode="BST-104" eta="3m" />
                  <UserLocationMarker />
                </div>
                <span className="text-[11px] font-mono text-slate-400">Bus pin • Stop pin • User GPS</span>
              </div>
            </div>

            {/* Route Waypoint Timeline */}
            <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Route Waypoint Progression Timeline
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <WaypointNode stopName="1. Central Railway Station" stopCode="BST-001" isPassed={true} />
                <WaypointNode stopName="2. Commercial Business District" stopCode="BST-042" isCurrent={true} eta="Arriving Now" />
                <WaypointNode stopName="3. Western Terminal Hub" stopCode="BST-108" isDestination={true} eta="In 14 mins" />
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: FEEDBACK, MODALS & DRAWERS */}
        {/* ========================================================================= */}
        {activeTab === 'dialogs' && (
          <section className="space-y-6">
            <PageHeader
              title="Feedback & Dialog Primitives"
              subtitle="Accessible modal dialogs, side-sheet drawers, alerts, and live toast notification stack."
              tag="Feedback"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Trigger Actions */}
              <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Interactive Modals & Drawers
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                    Open Detail Modal
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => setIsConfirmOpen(true)}>
                    Open Confirmation Modal
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => setIsDrawerOpen(true)}>
                    Open Side Drawer
                  </Button>
                </div>
              </div>

              {/* Toast Triggers */}
              <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Toast Notification Dispatcher
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleTestToast('info')}>
                    Dispatch Info Toast
                  </Button>
                  <Button variant="success" size="sm" onClick={() => handleTestToast('success')}>
                    Dispatch Success Toast
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleTestToast('warning')}>
                    Dispatch Warning Toast
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleTestToast('error')}>
                    Dispatch Error Toast
                  </Button>
                </div>
              </div>
            </div>

            {/* Alert Banners */}
            <div className="space-y-3">
              <Alert severity="info" title="System Synchronization Active">
                Real-time GTFS telemetry feeds synchronized with metropolitan transit mesh.
              </Alert>
              <Alert severity="warning" title="Moderate Weather Alert">
                Heavy rainfall predicted along Coastal Route RT-302. Drivers advised to maintain 40 km/h ceiling.
              </Alert>
              <Alert severity="critical" title="Emergency SOS Beacon Triggered">
                Vehicle NY-TR-8042 triggered hardware SOS beacon. Nearest response unit dispatched.
              </Alert>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* TAB 7: LOADING & EMPTY STATES */}
        {/* ========================================================================= */}
        {activeTab === 'loading' && (
          <section className="space-y-6">
            <PageHeader
              title="Loading & Empty State Handling"
              subtitle="Skeleton loaders, data stream spinners, zero-data views, and retry handlers."
              tag="Resilience"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Skeletons */}
              <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Card & Table Skeletons
                </h4>
                <MetricCardSkeleton />
                <BusCardSkeleton />
              </div>

              {/* Empty & Error State */}
              <div className="space-y-4">
                <EmptyState
                  title="No Active Buses on Route"
                  description="All scheduled fleet buses for Route RT-900 have concluded their operating window."
                  actionLabel="View Alternate Routes"
                  onAction={() => alert('Viewing alternative transit schedules')}
                />
                <ErrorState
                  title="GPS Stream Timeout"
                  message="Vehicle hardware beacon failed to acknowledge handshake."
                  onRetry={() => alert('Reconnecting telematics stream...')}
                />
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Reusable Modals & Drawers */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Vehicle Telemetry Inspector"
        subtitle="Live telemetry packet for Bus NY-TR-8042"
        footer={
          <Button variant="primary" size="sm" onClick={() => setIsModalOpen(false)}>
            Close Inspector
          </Button>
        }
      >
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-navy-800 space-y-1 text-slate-700 dark:text-slate-300">
            <div>GPS Coordinates: 19.0760° N, 72.8777° E</div>
            <div>Telemetry Speed: 38.4 km/h</div>
            <div>Occupancy: 32 / 54 Seats (59%)</div>
            <div>Driver ID: DRV-8820 (P. Sharma)</div>
            <div>Next Waypoint: Andheri Hub (ETA 4 min)</div>
          </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          handleTestToast('success');
        }}
        title="Trigger Emergency SOS Protocol"
        message="This will broadcast an immediate priority distress beacon across the System Operations Center and dispatch emergency teams."
        confirmLabel="Confirm Emergency SOS"
        isDestructive={true}
      />

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Route Dispatch Roster"
        subtitle="Active vehicles assigned to Route RT-108"
        footer={
          <Button variant="secondary" size="sm" onClick={() => setIsDrawerOpen(false)}>
            Done
          </Button>
        }
      >
        <div className="space-y-3">
          <BusCard busNumber="Bus 245" eta="4 mins" occupancyStatus="MODERATE" />
          <BusCard busNumber="Bus 248" eta="12 mins" occupancyStatus="LOW" />
          <BusCard busNumber="Bus 252" eta="20 mins" occupancyStatus="HIGH" />
        </div>
      </Drawer>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-navy-900/50 py-4 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-2">
          <span>SmartTransit OS Design System — Standardized Token Mesh</span>
          <span>Stage ST-01: Verified & Complete</span>
        </div>
      </footer>
    </div>
  );
}

export default DesignSystemShowcase;
