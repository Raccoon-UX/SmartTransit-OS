import React, { useState } from 'react';
import { Share2, Copy, Check, MessageSquare, Download, X, MapPin, Bus, Route, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { useToast } from '../../../components/ui/Toast.jsx';

export function ShareJourneyModal({ isOpen, onClose, activeTrip }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !activeTrip) return null;

  const busNumber = activeTrip.busNumber || 'Bus 245';
  const routeCode = activeTrip.routeCode || 'RT-108';
  const routeName = activeTrip.routeName || 'Metro Coastal Express';
  const currentStop = activeTrip.currentStop || 'Dahisar Check Naka';
  const nextStop = activeTrip.nextStop || 'Western Highway Exchange';
  const eta = activeTrip.etaToNextStop || '3 min';
  const destination = activeTrip.destination || 'Andheri West Terminal';
  const speed = activeTrip.speed || '38 km/h';

  const shareText = `📍 *SmartTransit OS — Live Journey Update*\n\n🚍 *Vehicle:* ${busNumber}\n🛣️ *Route:* ${routeCode} (${routeName})\n📍 *Current Stop:* ${currentStop}\n⏭️ *Next Stop:* ${nextStop} (ETA in ${eta})\n🏁 *Destination:* ${destination}\n⚡ *Speed:* ${speed}\n\n_Real-time commuter telemetry broadcast via SmartTransit OS_`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    addToast('Journey details copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTelemetry = () => {
    const dataStr = `SMARTTRANSIT OS — COMMUTER JOURNEY TELEMETRY CARD\nGenerated: ${new Date().toLocaleString()}\n----------------------------------------\nVehicle ID: ${busNumber}\nRoute: ${routeCode} - ${routeName}\nCurrent Stop: ${currentStop}\nNext Stop: ${nextStop}\nETA to Next Stop: ${eta}\nFinal Destination: ${destination}\nSpeed: ${speed}\nJourney Status: Active Commute in Progress\n----------------------------------------\nMunicipal Smart Transit Operations`;
    const blob = new Blob([dataStr], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Journey_Telemetry_${busNumber.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Telemetry card downloaded!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm text-left">
      <div className="relative max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-transit-600 to-[#0B3D91] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-sans tracking-wide text-white">
                SHARE JOURNEY STATUS
              </h3>
              <p className="text-[11px] text-white/80 font-mono">
                Journey information sharing with family or trusted contacts
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Journey snapshot card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2">
                <Bus className="w-4 h-4 text-transit-600 dark:text-transit-400" />
                <span className="font-bold text-slate-900 dark:text-white text-sm font-sans">{busNumber}</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                ACTIVE COMMUTE
              </span>
            </div>

            <div className="text-xs font-mono space-y-1 text-slate-600 dark:text-slate-300">
              <div>
                Line: <strong className="text-slate-900 dark:text-white font-sans">{routeCode} • {routeName}</strong>
              </div>
              <div>
                Current Station: <strong className="text-slate-900 dark:text-white font-sans">{currentStop}</strong>
              </div>
              <div>
                Upcoming Stop: <strong className="text-transit-600 dark:text-amber-400 font-sans">{nextStop} (in {eta})</strong>
              </div>
              <div>
                Destination: <strong className="text-slate-900 dark:text-white font-sans">{destination}</strong>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2.5 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs font-sans flex items-center justify-center space-x-2 shadow-md transition-transform active:scale-98"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Share Live Telemetry on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={copied ? Check : Copy}
                onClick={handleCopy}
                className={copied ? 'border-emerald-500 text-emerald-600' : ''}
              >
                {copied ? 'Copied!' : 'Copy Summary'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                fullWidth
                leftIcon={Download}
                onClick={handleDownloadTelemetry}
              >
                Download Card
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
