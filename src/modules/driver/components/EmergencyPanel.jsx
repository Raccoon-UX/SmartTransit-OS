import React, { useState } from 'react';
import { AlertOctagon, ShieldAlert, PhoneCall, Stethoscope, Wrench, Shield, CheckCircle2, X } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { Modal } from '../../../components/ui/Modal.jsx';
import { cn } from '../../../utils/index.js';

export function EmergencyPanel({
  activeSos,
  onTriggerSos,
  onCancelSos,
  className = '',
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedReason, setSelectedReason] = useState('Medical Emergency');

  const emergencyTypes = [
    { id: 'MEDICAL', label: 'Medical Emergency', icon: Stethoscope, color: 'text-rose-500 bg-rose-500/10' },
    { id: 'BREAKDOWN', label: 'Vehicle Breakdown', icon: Wrench, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'SECURITY', label: 'Security / Threat', icon: Shield, color: 'text-purple-500 bg-purple-500/10' },
    { id: 'GENERAL', label: 'General Emergency', icon: AlertOctagon, color: 'text-rose-600 bg-rose-600/10' },
  ];

  const handleConfirmTrigger = () => {
    if (onTriggerSos) {
      onTriggerSos({ reason: selectedReason, category: selectedReason });
    }
    setShowConfirmModal(false);
  };

  return (
    <div
      className={cn(
        'p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left space-y-6',
        className
      )}
    >
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-rose-600 animate-pulse" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            Driver Emergency Assistance Center
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
          PROTOTYPE DEMO MODE
        </span>
      </div>

      {/* Demo Safety Notice Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono">
        ⚠️ <strong>Safety Design Disclaimer:</strong> Emergency triggers simulate SOC dispatch notifications within this prototype environment. No live 911 / emergency services are contacted.
      </div>

      {/* Active SOS Banner (If active) */}
      {activeSos ? (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-900 via-rose-950 to-slate-950 text-white border-2 border-rose-500 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase text-rose-300 tracking-wider">
                EMERGENCY SOS BROADCAST ACTIVE
              </span>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-rose-500 text-white">
              {activeSos.id}
            </span>
          </div>

          <div>
            <h4 className="text-xl font-bold font-sans">{activeSos.reason}</h4>
            <p className="text-xs text-slate-300 font-mono mt-1">{activeSos.location}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-rose-800/80 text-xs font-mono text-emerald-400 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Status: {activeSos.status} • {activeSos.dispatchNote}</span>
          </div>

          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onCancelSos}
              className="text-white border-rose-500 hover:bg-rose-900/50"
            >
              Cancel Emergency Signal
            </Button>
          </div>
        </div>
      ) : (
        /* Primary Emergency Trigger Center */
        <div className="space-y-5">
          {/* Giant Red SOS Button */}
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="w-full py-8 sm:py-10 rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 text-white font-extrabold text-2xl sm:text-3xl font-mono flex flex-col items-center justify-center space-y-2 shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all border-4 border-rose-500/50"
          >
            <AlertOctagon className="w-10 h-10 animate-bounce text-white" />
            <span>TRIGGER EMERGENCY SOS</span>
            <span className="text-xs font-normal opacity-80 text-rose-200">Requires 2-step confirmation</span>
          </button>

          {/* Secondary Emergency Type Selectors */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold uppercase text-slate-400">Select Primary Incident Category</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {emergencyTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedReason === item.label;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedReason(item.label)}
                    className={cn(
                      'p-3.5 rounded-2xl border text-left font-mono text-xs transition-all flex flex-col space-y-2',
                      isSelected
                        ? 'bg-rose-500/10 border-rose-500 text-slate-900 dark:text-white ring-2 ring-rose-500/20'
                        : 'bg-slate-50 dark:bg-navy-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    )}
                  >
                    <div className={cn('p-2 rounded-xl w-fit', item.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-bold font-sans text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="CONFIRM EMERGENCY SOS ALERT"
      >
        <div className="space-y-5 text-left font-sans">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs font-mono space-y-2">
            <div className="font-bold uppercase text-sm">⚠️ High Priority Dispatch Broadcast</div>
            <p>
              Are you sure you want to broadcast an emergency alert for <strong>{selectedReason}</strong>?
            </p>
            <p className="text-[11px] opacity-80">
              Vehicle telemetry (Bus 245) and GPS location (Dahisar Check Naka) will be transmitted to simulated dispatch controllers.
            </p>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-2">
            <Button variant="outline" size="md" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="md"
              leftIcon={AlertOctagon}
              onClick={handleConfirmTrigger}
              className="shadow-glow"
            >
              CONFIRM SOS BROADCAST
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default EmergencyPanel;
