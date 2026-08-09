import React, { useState } from 'react';
import { 
  AlertOctagon, 
  ShieldAlert, 
  PhoneCall, 
  Stethoscope, 
  Wrench, 
  Shield, 
  CheckCircle2, 
  X, 
  Mail, 
  MessageSquare, 
  Send,
  ExternalLink,
  Phone
} from 'lucide-react';
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
    let triggeredSos;
    if (onTriggerSos) {
      triggeredSos = onTriggerSos({ reason: selectedReason, category: selectedReason });
    }

    // Launch WhatsApp Deep Link to +91 7710893839
    const rawPhoneDigits = '917710893839';
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const whatsappText = `🚨 *SMARTTRANSIT OS — EMERGENCY SOS BROADCAST ACTIVE* 🚨\n\n⚠️ *Category:* ${selectedReason}\n🚌 *Vehicle:* Bus 245 (NY-TR-8042)\n🛤 *Route:* RT-108 (Metro Coastal Express)\n📍 *GPS Location:* Dahisar Check Naka (19.25°N, 72.85°E)\n⏰ *Timestamp:* Today at ${timestamp}\n\n📞 *Target Phone:* +91 7710893839\n📧 *Target Email:* vsujal956@gmail.com\n\n_State Transport SOC Command Automated Dispatch Broadcast_`;
    const whatsappUrl = `https://wa.me/${rawPhoneDigits}?text=${encodeURIComponent(whatsappText)}`;

    // Open WhatsApp in new tab
    try {
      window.open(whatsappUrl, '_blank');
    } catch (e) {
      console.warn('Window open blocked:', e);
    }

    // Open Gmail mailto deep link to vsujal956@gmail.com
    const emailSubject = `🚨 [EMERGENCY SOS ALERT] SmartTransit OS Dispatch - ${selectedReason}`;
    const emailBody = `EMERGENCY SOS BROADCAST ACTIVE\n\nReason: ${selectedReason}\nVehicle: Bus 245 (NY-TR-8042)\nRoute: RT-108 (Metro Coastal Express)\nGPS Location: Dahisar Check Naka (19.25°N, 72.85°E)\nTimestamp: Today at ${timestamp}\n\nTarget Email: vsujal956@gmail.com\nTarget Phone: +91 7710893839\n\nSmartTransit OS Command Operations`;
    const gmailUrl = `mailto:vsujal956@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    setTimeout(() => {
      window.location.href = gmailUrl;
    }, 400);

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
          MULTI-CHANNEL DISPATCH ACTIVE
        </span>
      </div>

      {/* Dispatch Channels Notice */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs font-mono space-y-1.5">
        <div className="font-bold uppercase flex items-center space-x-2">
          <Send className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Configured Live Emergency Target Channels:</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-sans">
          <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-amber-500/20">
            <Mail className="w-4 h-4 text-rose-500 shrink-0" />
            <span><strong>Gmail Alert:</strong> vsujal956@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2 p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-amber-500/20">
            <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><strong>WhatsApp & SMS:</strong> +91 7710893839</span>
          </div>
        </div>
      </div>

      {/* Active SOS Banner (If active) */}
      {activeSos ? (
        <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-900 via-rose-950 to-slate-950 text-white border-2 border-rose-500 shadow-2xl space-y-5 relative overflow-hidden">
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
            <h4 className="text-xl font-bold font-sans text-white">{activeSos.reason}</h4>
            <p className="text-xs text-slate-300 font-mono mt-1">{activeSos.location}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/90 border border-rose-800/80 text-xs font-mono text-emerald-400 flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Status: {activeSos.status} • {activeSos.dispatchNote || 'Emergency channels notified.'}</span>
          </div>

          {/* Live Multi-Channel Dispatch Actions (WhatsApp, Gmail, SMS) */}
          <div className="space-y-2 pt-2 border-t border-rose-800/60">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-300">
              Instant Dispatch Channels (Click to Send Alert Again):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {/* WhatsApp Button */}
              <a
                href={activeSos.whatsappUrl || `https://wa.me/917710893839?text=${encodeURIComponent('🚨 EMERGENCY SOS BROADCAST: Medical Emergency on Bus 245 at Dahisar Check Naka.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-mono font-bold text-xs border border-emerald-500 shadow-md transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200 shrink-0" />
                <span>WhatsApp (+91 7710893839)</span>
              </a>

              {/* Gmail Mailto Button */}
              <a
                href={activeSos.gmailUrl || `mailto:vsujal956@gmail.com?subject=${encodeURIComponent(`[URGENT SOS] ${activeSos.id}`)}&body=${encodeURIComponent(`Emergency SOS on Bus 245 at Dahisar Check Naka.`)}`}
                className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-mono font-bold text-xs border border-rose-500 shadow-md transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-rose-200 shrink-0" />
                <span>Gmail (vsujal956@gmail.com)</span>
              </a>

              {/* SMS Text Button */}
              <a
                href={activeSos.smsUrl || `sms:+917710893839?body=${encodeURIComponent('🚨 EMERGENCY SOS: Bus 245 Dahisar Check Naka')}`}
                className="flex items-center justify-center space-x-2 px-3 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-600 text-white font-mono font-bold text-xs border border-sky-500 shadow-md transition-all cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-sky-200 shrink-0" />
                <span>SMS (+91 7710893839)</span>
              </a>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between border-t border-rose-900/80">
            {/* Visible Solid Button for Cancel Emergency Signal */}
            <button
              type="button"
              onClick={onCancelSos}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs border border-slate-600 shadow-md transition-colors cursor-pointer"
            >
              Cancel Emergency Signal
            </button>

            <span className="text-[10px] font-mono text-slate-400">SOC Logged • ID #{activeSos.id}</span>
          </div>
        </div>
      ) : (
        /* Primary Emergency Trigger Center */
        <div className="space-y-5">
          {/* Giant Red SOS Button */}
          <button
            type="button"
            onClick={() => setShowConfirmModal(true)}
            className="w-full py-8 sm:py-10 rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800 text-white font-extrabold text-2xl sm:text-3xl font-mono flex flex-col items-center justify-center space-y-2 shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all border-4 border-rose-500/50 cursor-pointer"
          >
            <AlertOctagon className="w-10 h-10 animate-bounce text-white" />
            <span>TRIGGER EMERGENCY SOS</span>
            <span className="text-xs font-normal opacity-90 text-rose-100">
              Broadcasting to WhatsApp (+91 7710893839) & Gmail (vsujal956@gmail.com)
            </span>
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
                      'p-3.5 rounded-2xl border text-left font-mono text-xs transition-all flex flex-col space-y-2 cursor-pointer',
                      isSelected
                        ? 'bg-rose-500/10 border-rose-500 text-slate-900 dark:text-white ring-2 ring-rose-500/20'
                        : 'bg-slate-50 dark:bg-navy-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-rose-300'
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
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-300 text-xs font-mono space-y-2">
            <div className="font-bold uppercase text-sm flex items-center space-x-2 text-rose-700 dark:text-rose-400">
              <AlertOctagon className="w-5 h-5 shrink-0" />
              <span>⚠️ HIGH PRIORITY DISPATCH BROADCAST</span>
            </div>
            <p className="text-sm">
              Are you sure you want to broadcast an emergency alert for <strong>{selectedReason}</strong>?
            </p>
            <p className="text-[11px] opacity-90 leading-relaxed">
              Vehicle telemetry (Bus 245) and GPS location (Dahisar Check Naka) will be transmitted immediately to:
            </p>
            <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 border border-rose-500/20 text-slate-800 dark:text-slate-200 space-y-1 font-sans text-xs">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span><strong>WhatsApp & SMS:</strong> +91 7710893839</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span><strong>Gmail:</strong> vsujal956@gmail.com</span>
              </div>
            </div>
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
              className="bg-rose-700 hover:bg-rose-800 text-white font-bold shadow-glow"
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
