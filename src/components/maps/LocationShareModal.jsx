import React, { useState } from 'react';
import { Share2, Copy, Check, MessageSquare, Download, X, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { useToast } from '../ui/Toast.jsx';

export function LocationShareModal({ isOpen, bus, onClose }) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!isOpen || !bus) return null;

  const lat = bus.lat || 19.0760;
  const lng = bus.lng || 72.8777;
  const busName = bus.busNumber || bus.id || 'Bus 245';
  const routeName = bus.routeId || bus.routeName || 'RT-108 Airport Express';
  const speed = bus.speed || '42';
  const status = bus.status || 'ACTIVE';

  const shareText = `📍 *SmartTransit OS — Live Bus Location Share*%0A%0A🚍 *Vehicle:* ${busName}%0A🛣️ *Route:* ${routeName}%0A⚡ *Speed:* ${speed} km/h%0A📍 *GPS Coordinates:* ${lat}, ${lng}%0A⏱️ *Next Stop ETA:* ${bus.nextStopEta || '4 mins'}%0A%0A🔗 *Track Live:* https://smarttransit-os.gov.in/track/${bus.id || '245'}`;

  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  const handleCopyLink = () => {
    const rawText = shareText.replace(/%0A/g, '\n').replace(/\*/g, '');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    addToast('Location details copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadTelemetry = () => {
    const dataStr = `SMARTTRANSIT OS — OFFICIAL TELEMETRY REPORT\nGenerated: ${new Date().toLocaleString()}\n----------------------------------------\nVehicle ID: ${busName}\nRoute: ${routeName}\nStatus: ${status}\nSpeed: ${speed} km/h\nLatitude: ${lat}\nLongitude: ${lng}\nNext Stop: ${bus.nextStop || 'Central Terminal'}\nETA: ${bus.nextStopEta || '4 mins'}\n----------------------------------------\nOfficial Municipal Transport Authority Portal`;
    const blob = new Blob([dataStr], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `GPS_Telemetry_${busName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('GPS Telemetry Card downloaded!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs text-sans text-left">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden font-sans">
        {/* Header Bar */}
        <div className="p-4 bg-[#0B3D91] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2 font-mono text-xs font-bold">
            <Share2 className="w-4 h-4 text-amber-300" />
            <span>EXPORT & SHARE LIVE LOCATION</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white text-base">{busName}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                {status}
              </span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-mono">
              Route: <strong className="text-slate-900 dark:text-white">{routeName}</strong>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-[#0B3D91] dark:text-sky-400" />
                <span>{lat}, {lng}</span>
              </span>
              <span>•</span>
              <span>Speed: {speed} km/h</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {/* Share on WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs font-sans flex items-center justify-center space-x-2 shadow-md transition-transform active:scale-98"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Share Live Location on WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Copy Location Link */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs font-mono flex items-center justify-center space-x-2 border border-slate-300 dark:border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Location & Details Link'}</span>
            </button>

            {/* Download Telemetry Card */}
            <button
              type="button"
              onClick={handleDownloadTelemetry}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 dark:bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs font-mono flex items-center justify-center space-x-2 border border-slate-700"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download GPS Telemetry Card (.txt)</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-center text-[10px] text-slate-500 font-mono flex items-center justify-center space-x-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>SmartTransit OS Official Encrypted GPS Stream</span>
        </div>
      </div>
    </div>
  );
}

export default LocationShareModal;
