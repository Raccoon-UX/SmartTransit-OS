import React, { useState } from 'react';
import { AlertOctagon, ShieldAlert, HeartPulse, UserX, Bus, HelpCircle, ArrowRight, X, AlertTriangle, ShieldCheck } from 'lucide-react';
import { passengerSosService } from '../../../services/passenger/passengerSosService.js';
import { Button } from '../../../components/ui/Button.jsx';
import { useToast } from '../../../components/ui/Toast.jsx';
import { cn } from '../../../utils/index.js';

const EMERGENCY_TYPES = [
  {
    id: 'Medical Emergency',
    label: 'Medical Emergency',
    icon: HeartPulse,
    desc: 'Sudden illness, injury, or passenger requiring first aid medical response.',
    color: 'text-rose-500 bg-rose-500/10 border-rose-500/30',
  },
  {
    id: 'Personal Safety / Security',
    label: 'Personal Safety / Security',
    icon: ShieldAlert,
    desc: 'Threat, theft, suspicious activity, or unsafe passenger environment.',
    color: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
  },
  {
    id: 'Harassment / Unsafe Situation',
    label: 'Harassment / Unsafe Situation',
    icon: UserX,
    desc: 'Verbal harassment, physical intimidation, or unruly behavior.',
    color: 'text-purple-500 bg-purple-500/10 border-purple-500/30',
  },
  {
    id: 'Vehicle Emergency',
    label: 'Vehicle Emergency',
    icon: Bus,
    desc: 'Breakdown, collision, smoke/fire hazard, or extreme mechanical failure.',
    color: 'text-orange-500 bg-orange-500/10 border-orange-500/30',
  },
  {
    id: 'Other Emergency',
    label: 'Other Emergency',
    icon: HelpCircle,
    desc: 'Critical transit incident requiring operations dispatch assistance.',
    color: 'text-slate-500 bg-slate-500/10 border-slate-500/30',
  },
];

export function PassengerSosModal({ isOpen, onClose, activeTrip, user, onSosTriggered }) {
  const { addToast } = useToast();
  const [selectedType, setSelectedType] = useState('Personal Safety / Security');
  const [description, setDescription] = useState('');
  const [step, setStep] = useState(1); // 1: Select Type, 2: Review & Confirm
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const vehicleId = activeTrip?.busNumber || 'Bus 245 (Assigned Line)';
  const routeId = activeTrip?.routeCode || 'RT-108';
  const locationName = activeTrip?.currentStop || 'Western Highway Exchange (19.25°N, 72.85°E)';
  const passengerId = user?.id || 'usr-pass-001';
  const passengerName = user?.name || 'Aarav Sharma';

  const handleConfirmEmergency = async () => {
    setIsSubmitting(true);
    try {
      const sosResult = await passengerSosService.triggerEmergencySos({
        emergencyType: selectedType,
        description: description.trim(),
        passengerId,
        passengerName,
        journeyId: activeTrip?.journeyId || activeTrip?.planId || null,
        vehicleId,
        routeId,
        locationName,
      });

      addToast(`🚨 Emergency SOS Triggered (Incident ${sosResult.id})`, 'warning');
      if (onSosTriggered) {
        onSosTriggered(sosResult);
      }
      onClose();
    } catch (err) {
      console.error('[PassengerSosModal] SOS trigger error:', err);
      addToast('Failed to broadcast SOS. Please try again or call emergency helpline.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm text-left">
      <div className="relative max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-rose-600 to-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
              <AlertOctagon className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-sans tracking-wide text-white">
                PASSENGER EMERGENCY SOS
              </h3>
              <p className="text-[11px] text-white/80 font-mono">
                {step === 1 ? 'Step 1 of 2 — Select Emergency Category' : 'Step 2 of 2 — Confirm Operations Dispatch'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">
                  Select Incident Category
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Choose the category that best describes your situation to route the alert immediately:
                </p>
              </div>

              <div className="space-y-2.5">
                {EMERGENCY_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        'w-full p-3.5 rounded-2xl border text-left transition-all flex items-start space-x-3 cursor-pointer',
                        isSelected
                          ? 'border-rose-500 bg-rose-500/10 dark:bg-rose-950/30 ring-2 ring-rose-500/30'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                      )}
                    >
                      <div className={cn('p-2 rounded-xl border mt-0.5 shrink-0', type.color)}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm text-slate-900 dark:text-white">{type.label}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{type.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  rightIcon={ArrowRight}
                  onClick={() => setStep(2)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  Continue to Context Review
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Context Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs font-mono">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Auto-Attached Transit Context
                </span>

                <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400 block text-[10px]">PASSENGER</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{passengerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">CATEGORY</span>
                    <strong className="text-rose-600 dark:text-rose-400 font-bold">{selectedType}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">VEHICLE</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{vehicleId}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ROUTE</span>
                    <strong className="text-slate-900 dark:text-white font-bold">{routeId}</strong>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px]">ESTIMATED LOCATION</span>
                  <div className="font-bold text-slate-900 dark:text-white">{locationName}</div>
                </div>
              </div>

              {/* Optional Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Additional Details / Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide any specific details (e.g. seat number, nature of injury or situation)..."
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none font-sans"
                />
              </div>

              {/* Prototype Disclosure Alert */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] font-sans flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Operations Workflow Notice:</strong> Emergency incident will be logged to the central transit operations workflow and recorded with unique incident ID.
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setStep(1)}
                  disabled={isSubmitting}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={handleConfirmEmergency}
                  disabled={isSubmitting}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold shadow-lg shadow-rose-600/30"
                >
                  {isSubmitting ? 'Transmitting SOS...' : '🚨 Confirm & Transmit SOS'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
