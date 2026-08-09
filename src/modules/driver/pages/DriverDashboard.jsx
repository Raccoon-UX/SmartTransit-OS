import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { Bus, Navigation, Play, Users, AlertOctagon, FileText, Bell, Radio, ShieldCheck, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import { driverService } from '../../../services/driver/driverService.js';
import { tripService } from '../../../services/driver/tripService.js';
import { driverNotificationService } from '../../../services/driver/driverNotificationService.js';
import { TripStatusCard } from '../components/TripStatusCard.jsx';
import { VehicleStatusCard } from '../components/VehicleStatusCard.jsx';
import { IncidentReportModal } from '../components/IncidentReportModal.jsx';
import { AlertCard } from '../../../components/cards/AlertCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { cn } from '../../../utils/index.js';

export function DriverDashboard({ onNavigate }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [tripState, setTripState] = useState(tripService.getTripState());
  const [alerts, setAlerts] = useState(driverNotificationService.getAlerts());
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [toast, setToast] = useState(null);

  const userName = user?.name || 'Vikram Jadhav';

  useEffect(() => {
    driverService.getProfile().then(setProfile);
    driverService.getAssignment().then(setAssignment);

    const unsubscribeTrip = tripService.subscribeTrip(setTripState);
    return () => {
      unsubscribeTrip();
    };
  }, []);

  const handleStartTrip = () => {
    if (onNavigate) {
      onNavigate('/driver/trip');
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Top Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
            <span>PRIMARY DRIVER COCKPIT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Good morning, {userName.split(' ')[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Assigned Vehicle: <strong className="text-slate-900 dark:text-white">{assignment?.busNumber || 'Bus 245'}</strong> • Line <strong className="text-transit-500">{assignment?.routeCode || 'RT-108'}</strong>
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-slate-300">
          <span className="p-2 rounded-xl bg-slate-100 dark:bg-navy-800 text-emerald-500 font-bold flex items-center space-x-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Pilot Duty Active</span>
          </span>
        </div>
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">
          ✓ {toast}
        </div>
      )}

      {/* C. Quick Operational Actions Bar (Large Touch Controls - Light & Dark Theme High Contrast) */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-xl space-y-3">
        <div className="text-xs font-mono font-bold uppercase text-slate-400">Primary Cockpit Quick Actions</div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono font-bold">
          <Button
            variant="primary"
            size="md"
            leftIcon={Play}
            onClick={handleStartTrip}
            className="shadow-glow"
          >
            {tripState.status === 'ACTIVE' ? 'Live Trip Control' : 'Start Trip'}
          </Button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('/driver/navigation')}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors shadow-xs cursor-pointer font-mono font-bold text-xs sm:text-sm"
          >
            <Navigation className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-white">Route Navigation</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate('/driver/occupancy')}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors shadow-xs cursor-pointer font-mono font-bold text-xs sm:text-sm"
          >
            <Users className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-white">Occupancy</span>
          </button>

          <button
            type="button"
            onClick={() => setShowIncidentModal(true)}
            className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors shadow-xs cursor-pointer font-mono font-bold text-xs sm:text-sm"
          >
            <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-white">Report Issue</span>
          </button>

          <Button
            variant="danger"
            size="md"
            leftIcon={AlertOctagon}
            onClick={() => onNavigate && onNavigate('/driver/emergency')}
            className="col-span-2 sm:col-span-1 shadow-glow"
          >
            EMERGENCY SOS
          </Button>
        </div>
      </div>

      {/* Main Grid: A. Current Assignment & B. Trip Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Shift Assignment Details & Bus Vehicle Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center space-x-2">
              <Bus className="w-5 h-5 text-transit-500" />
              <span>A. Shift & Vehicle Assignment</span>
            </h2>
            <StatusBadge status="ONLINE" label="ASSIGNED" size="sm" />
          </div>

          <VehicleStatusCard
            assignment={assignment}
            onToggleDoors={(doorsOpen) => {
              setToast(doorsOpen ? 'Bus passenger doors OPENED' : 'Bus passenger doors CLOSED');
              setTimeout(() => setToast(null), 3000);
            }}
          />

          {/* Incident Reporter Action */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs font-mono">
            <div className="space-y-0.5">
              <div className="font-bold text-amber-600 dark:text-amber-400 uppercase">Encountered an Issue?</div>
              <div className="text-slate-600 dark:text-slate-400">Log mechanical defect, delay, or route blockage directly to SOC.</div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowIncidentModal(true)}>
              Report
            </Button>
          </div>
        </div>

        {/* Right Column: Live Trip Progress & Telemetry */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-transit-500" />
              <span>B. Active Trip Progress & Telemetry</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">Schedule Sync 100%</span>
          </div>

          <TripStatusCard
            tripState={tripState}
            onStartTrip={handleStartTrip}
            onEndTrip={() => tripService.endTrip()}
          />
        </div>
      </div>

      {/* Driver Urgent Alerts & Notices */}
      <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans flex items-center space-x-2">
            <Bell className="w-5 h-5 text-amber-500" />
            <span>Driver Service Alerts ({alerts.length})</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Dispatched from SOC Command</span>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              title={alert.title}
              message={alert.message}
              severity={alert.severity}
              timestamp={alert.timestamp}
              source={alert.source}
            />
          ))}
        </div>
      </div>

      {/* Incident Report Modal */}
      <IncidentReportModal
        isOpen={showIncidentModal}
        onClose={() => setShowIncidentModal(false)}
        onSubmit={(incidentData) => {
          setToast(`Incident report #${Date.now().toString().slice(-4)} submitted to SOC Dispatch.`);
          setTimeout(() => setToast(null), 4000);
        }}
      />
    </div>
  );
}

export default DriverDashboard;
