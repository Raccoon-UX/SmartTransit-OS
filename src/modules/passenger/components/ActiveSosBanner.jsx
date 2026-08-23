import React, { useState } from 'react';
import { AlertOctagon, CheckCircle2, MapPin, Bus, Route, Clock, ShieldCheck, XCircle } from 'lucide-react';
import { passengerSosService } from '../../../services/passenger/passengerSosService.js';
import { Button } from '../../../components/ui/Button.jsx';
import { useToast } from '../../../components/ui/Toast.jsx';

export function ActiveSosBanner({ activeSos, onResolved }) {
  const { addToast } = useToast();
  const [isResolving, setIsResolving] = useState(false);
  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  if (!activeSos) return null;

  const handleResolveSos = async () => {
    setIsResolving(true);
    try {
      await passengerSosService.resolveSos({
        reason: 'Emergency marked resolved by passenger.',
      });
      addToast('Emergency SOS marked as resolved.', 'success');
      setShowConfirmCancel(false);
      if (onResolved) onResolved();
    } catch (err) {
      console.error('[ActiveSosBanner] Resolve error:', err);
      addToast('Failed to resolve SOS status.', 'error');
    } finally {
      setIsResolving(false);
    }
  };

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-red-800 text-white shadow-xl space-y-4 text-left border border-rose-400/30 relative overflow-hidden">
      {/* Background ambient pulse */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 animate-pulse" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/20 pb-3 relative z-10">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
            <AlertOctagon className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-widest text-rose-200">
              EMERGENCY ACTIVE • {activeSos.status || 'REPORTED'}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold font-sans text-white">
              Incident ID: {activeSos.id}
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-white/20 text-white font-mono text-xs font-bold flex items-center space-x-1.5 border border-white/30">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
            <span>Forwarded to Operations</span>
          </span>
        </div>
      </div>

      {/* Context Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 text-xs font-mono text-white/90 relative z-10">
        <div className="p-3 rounded-2xl bg-black/20 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-rose-200 block uppercase font-bold">Category</span>
          <strong className="text-white font-sans text-sm block truncate">{activeSos.emergencyType}</strong>
        </div>

        <div className="p-3 rounded-2xl bg-black/20 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-rose-200 block uppercase font-bold">Vehicle & Line</span>
          <strong className="text-white font-sans text-sm block truncate">{activeSos.vehicleId} • {activeSos.routeId}</strong>
        </div>

        <div className="p-3 rounded-2xl bg-black/20 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-rose-200 block uppercase font-bold">Location</span>
          <strong className="text-white font-sans text-sm block truncate">{activeSos.location}</strong>
        </div>

        <div className="p-3 rounded-2xl bg-black/20 border border-white/10 space-y-0.5">
          <span className="text-[10px] text-rose-200 block uppercase font-bold">Logged Time</span>
          <strong className="text-white font-sans text-sm block truncate">{activeSos.timestamp}</strong>
        </div>
      </div>

      {/* Operations notice & Resolve CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 relative z-10 text-xs">
        <p className="text-white/80 font-sans text-xs max-w-xl">
          {activeSos.workflowStatus || 'Emergency incident created and forwarded to the configured operations workflow.'}
        </p>

        {!showConfirmCancel ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConfirmCancel(true)}
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-bold whitespace-nowrap"
          >
            Resolve / Cancel SOS
          </Button>
        ) : (
          <div className="flex items-center space-x-2 bg-black/30 p-1.5 rounded-xl border border-white/20">
            <span className="text-[11px] text-white/90 px-2">Are you safe now?</span>
            <Button
              variant="primary"
              size="xs"
              onClick={handleResolveSos}
              disabled={isResolving}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              {isResolving ? 'Resolving...' : 'Yes, Resolve'}
            </Button>
            <Button
              variant="outline"
              size="xs"
              onClick={() => setShowConfirmCancel(false)}
              className="text-white/80 border-white/20"
            >
              No
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
