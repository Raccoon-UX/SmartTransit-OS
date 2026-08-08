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

      {/* C. Quick Operational Actions Bar (Large Touch Controls) */}
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

          <Button
            variant="outline"
            size="md"
            leftIcon={Navigation}
            onClick={() => onNavigate && onNavigate('/driver/navigation')}
            className="text-white border-slate-700 hover:bg-slate-800"
          >
            Route Navigation
          </Button>

          <Button
            variant="outline"
            size="md"
            leftIcon={Users}
            onClick={() => onNavigate && onNavigate('/driver/occupancy')}
            className="text-white border-slate-700 hover:bg-slate-800"
          >
            Occupancy
          </Button>

          <Button
            variant="outline"
            size="md"
            leftIcon={FileText}
            onClick={() => setShowIncidentModal(true)}
            className="text-white border-slate-700 hover:bg-slate-800"
          >
            Report Issue
          </Button>

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
        {/* Left 6 Cols: A. Current Assignment */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              A. Shift & Vehicle Assignment
            </h3>
            <StatusBadge status={assignment?.operationalStatus || 'READY'} size="sm" />
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-transit-500 to-transit-700 text-white flex items-center justify-center font-bold text-lg shadow-glow-sm">
                  <Bus className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                    {assignment?.busNumber || 'Bus 245'}
                  </h4>
                  <span className="text-xs font-mono text-slate-400">
                    Serial: {assignment?.busSerial || 'NY-TR-8042'} • {assignment?.vehicleType}
                  </span>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Scheduled Departure</span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">{assignment?.scheduledDeparture || '10:15 AM'}</span>
              </div>
            </div>

            {/* Route Details */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Assigned Route Corridor</span>
              <div className="font-bold text-slate-900 dark:text-white font-sans text-sm">
                Line {assignment?.routeCode} — {assignment?.routeName}
              </div>
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                {assignment?.origin} → {assignment?.destination}
              </span>
            </div>

            {/* Shift Timings */}
            <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-300">
              <span>Shift Timing: <strong>{assignment?.shiftTiming}</strong></span>
              <span className="text-emerald-500 font-bold">Total Stops: {assignment?.totalStops}</span>
            </div>

            {/* Primary Action Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={ArrowRight}
              onClick={handleStartTrip}
              className="shadow-glow font-bold"
            >
              {tripState.status === 'ACTIVE' ? 'Manage Active Trip' : 'Start Scheduled Trip'}
            </Button>
          </div>
        </div>

        {/* Right 6 Cols: B. Active Trip Status */}
        <div className="lg:col-span-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            B. Active Trip Progress & Telemetry
          </h3>

          <TripStatusCard trip={tripState} />

          {/* E. Vehicle Diagnostics Pill Strip */}
          <VehicleStatusCard diagnostics={assignment?.vehicleDiagnostics} />
        </div>
      </div>

      {/* D. Service Alerts */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-rose-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              D. Operational Driver Advisories & Dispatch Alerts
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Driver Dispatch Sync</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {alerts.slice(0, 2).map((alert) => (
            <AlertCard
              key={alert.id}
              type={alert.type}
              severity={alert.severity}
              title={alert.title}
              description={alert.message}
              timestamp={alert.timestamp}
              affectedRoutes={[alert.affectedStop]}
            />
          ))}
        </div>
      </div>

      {/* Incident Report Modal */}
      <IncidentReportModal
        isOpen={showIncidentModal}
        onClose={() => setShowIncidentModal(false)}
        onSubmitted={() => {
          setToast('Operational issue report submitted.');
          setTimeout(() => setToast(null), 3000);
        }}
      />
    </div>
  );
}

export default DriverDashboard;
