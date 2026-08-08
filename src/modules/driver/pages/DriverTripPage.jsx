import React, { useState, useEffect } from 'react';
import { Play, Square, CheckCircle2, Navigation, Bus, Clock, MapPin, Radio, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { tripService } from '../../../services/driver/tripService.js';
import { occupancyService } from '../../../services/driver/occupancyService.js';
import { NextStopCard } from '../components/NextStopCard.jsx';
import { TripStatusCard } from '../components/TripStatusCard.jsx';
import { TripSummaryCard } from '../components/TripSummaryCard.jsx';
import { OccupancyIndicator } from '../../passenger/components/OccupancyIndicator.jsx';
import { Modal } from '../../../components/ui/Modal.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function DriverTripPage({ onNavigate }) {
  const [tripState, setTripState] = useState(tripService.getTripState());
  const [occupancy, setOccupancy] = useState(occupancyService.getOccupancy());
  const [showStartModal, setShowStartModal] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);

  useEffect(() => {
    const unsubTrip = tripService.subscribeTrip(setTripState);
    const unsubOcc = occupancyService.subscribeOccupancy(setOccupancy);
    return () => {
      unsubTrip();
      unsubOcc();
    };
  }, []);


  const handleConfirmStart = () => {
    tripService.startTrip();
    setShowStartModal(false);
  };

  const handleConfirmEnd = () => {
    tripService.endTrip();
    setShowEndModal(false);
  };

  const isActive = tripState.status === 'ACTIVE';
  const isCompleted = tripState.status === 'COMPLETED';

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
            <span>ACTIVE TRIP CONTROL CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Vehicle Trip Execution
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage your live journey lifecycle, route progression, and passenger arrival broadcasts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {isActive ? (
            <Button
              variant="danger"
              size="md"
              leftIcon={Square}
              onClick={() => setShowEndModal(true)}
              className="shadow-glow"
            >
              End Trip
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              leftIcon={Play}
              onClick={() => setShowStartModal(true)}
              className="shadow-glow"
            >
              Start Trip
            </Button>
          )}
        </div>
      </div>

      {/* AI Occupancy Forecast Warning */}
      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="text-slate-700 dark:text-slate-200">
            <strong>AI OCCUPANCY FORECAST:</strong> Heavy passenger boarding expected at <strong>Magathane Junction</strong> (+18 passengers predicted).
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-[10px] shrink-0">
          BUS FULL RISK (86%)
        </span>
      </div>

      {/* Completed State: Trip Summary View */}

      {isCompleted && tripState.summaryReport ? (
        <TripSummaryCard
          summary={tripState.summaryReport}
          onReturnToDashboard={() => {
            tripService.resetTrip();
            if (onNavigate) onNavigate('/driver');
          }}
          onViewReports={() => {
            if (onNavigate) onNavigate('/driver/reports');
          }}
        />
      ) : isActive ? (
        /* Active Trip View */
        <div className="space-y-6">
          {/* Prominent Next Stop Display */}
          <NextStopCard
            nextStopName={tripState.nextStop}
            nextStopCode="BST-048"
            eta={tripState.nextStopEta}
            distance={tripState.nextStopDistance}
            waitingPassengers={tripState.nextStopWaiting}
          />

          {/* Active Trip Telemetry Card */}
          <TripStatusCard trip={tripState} />

          {/* Live Occupancy Touch Controls & Emergency SOS */}
          <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1 flex-1">
                <span className="text-xs font-mono font-bold uppercase text-slate-400">Live Passenger Crowd Density</span>
                <OccupancyIndicator percent={occupancy.occupancyPercent} status={occupancy.occupancyStatus} showBar={true} />
              </div>

              {/* Driver Quick Touch Buttons */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => occupancyService.decrementPassenger()}
                  className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-slate-900 dark:text-white font-mono font-extrabold text-lg flex items-center justify-center border border-slate-300 dark:border-slate-700 active:scale-95 transition-all shadow-sm"
                >
                  −1
                </button>
                <button
                  type="button"
                  onClick={() => occupancyService.incrementPassenger()}
                  className="w-12 h-12 rounded-2xl bg-transit-500 hover:bg-transit-600 text-white font-mono font-extrabold text-lg flex items-center justify-center shadow-md active:scale-95 transition-all"
                >
                  +1
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onNavigate && onNavigate('/driver/emergency')}
                className="shadow-glow-sm font-mono font-bold"
              >
                🚨 EMERGENCY SOS
              </Button>
              <Button
                variant="ghost"
                size="sm"
                rightIcon={ArrowRight}
                onClick={() => onNavigate && onNavigate('/driver/occupancy')}
              >
                Detailed Occupancy Override
              </Button>
            </div>
          </div>
        </div>

      ) : (
        /* Ready / Idle State */
        <div className="p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-transit-500/10 text-transit-500 flex items-center justify-center mx-auto shadow-sm">
            <Bus className="w-8 h-8" />
          </div>

          <div className="max-w-md mx-auto space-y-1">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
              Ready to Start Scheduled Trip
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Vehicle <strong className="text-slate-900 dark:text-white">{tripState.busNumber}</strong> assigned to <strong className="text-transit-500">Line {tripState.routeCode}</strong> ({tripState.origin} → {tripState.destination}).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800 max-w-lg mx-auto text-xs font-mono grid grid-cols-2 gap-3 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Shift Hours</span>
              <span className="font-bold text-slate-900 dark:text-white">{tripState.shiftTiming}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Corridor Stops</span>
              <span className="font-bold text-slate-900 dark:text-white">{tripState.totalStopsCount} Waypoint Stops</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              leftIcon={Play}
              onClick={() => setShowStartModal(true)}
              className="shadow-glow font-bold"
            >
              Confirm & Start Trip Now
            </Button>
          </div>
        </div>
      )}

      {/* Start Trip Modal */}
      <Modal isOpen={showStartModal} onClose={() => setShowStartModal(false)} title="START SCHEDULED TRIP">
        <div className="space-y-4 text-left font-sans">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Confirm initiating live trip telemetry for the assigned vehicle and route line.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-1.5">
            <div>Bus Vehicle: <strong>{tripState.busNumber}</strong></div>
            <div>Route Line: <strong>{tripState.routeCode} ({tripState.routeName})</strong></div>
            <div>Corridor: <strong>{tripState.origin} → {tripState.destination}</strong></div>
            <div>Shift: <strong>{tripState.shiftTiming}</strong></div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowStartModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" leftIcon={Play} onClick={handleConfirmStart}>
              Confirm Start Trip
            </Button>
          </div>
        </div>
      </Modal>

      {/* End Trip Modal */}
      <Modal isOpen={showEndModal} onClose={() => setShowEndModal(false)} title="END CURRENT TRIP">
        <div className="space-y-4 text-left font-sans">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Are you sure you want to end the current trip? Telemetry logging will terminate and compile your shift report.
          </p>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-1.5">
            <div>Completed Stops: <strong>32 / 32 Stops</strong></div>
            <div>Trip Duration: <strong>1h 14m</strong></div>
            <div>Distance Covered: <strong>18.4 km</strong></div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <Button variant="outline" size="sm" onClick={() => setShowEndModal(false)}>
              Continue Trip
            </Button>
            <Button variant="danger" size="sm" leftIcon={Square} onClick={handleConfirmEnd}>
              End Current Trip
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DriverTripPage;
