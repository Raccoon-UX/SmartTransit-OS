import React from 'react';
import { MapPin, Bus, Radio, Wifi, QrCode, ShieldCheck, Clock, Users, Volume2, Accessibility } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function SmartBusStopShowcaseSection({ className = '' }) {
  return (
    <section className={cn('py-16 sm:py-24 bg-slate-900 text-white border-y border-slate-800 text-left overflow-hidden relative', className)}>
      {/* Background Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none stroke-slate-500">
        <defs>
          <pattern id="bus-stop-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#bus-stop-grid)" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-transit-500/20 text-transit-400 border border-transit-500/30 text-xs font-mono font-bold">
            <Wifi className="w-3.5 h-3.5 animate-pulse" />
            <span>CONNECTED PHYSICAL INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Turn Every Bus Stop Into a Smart Public Facility.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            SmartTransit OS upgrades physical bus shelters into digital public information hubs with live arrival boards, accessibility audio broadcasts, service alerts, and mobile QR passenger integration.
          </p>
        </div>

        {/* Smart Bus Stop Digital Kiosk Visualization Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Digital Display Board Mockup */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-700/80 shadow-2xl space-y-6 font-mono">
            {/* Kiosk Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-transit-500/20 text-transit-400 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">MAGATHANE JUNCTION</h3>
                  <p className="text-xs text-slate-400">STATION CODE: BST-048 • CORRIDOR RT-108</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
                <span>KIOSK ONLINE</span>
              </div>
            </div>

            {/* Digital Arrival Departure Board Stream */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase text-slate-400 flex justify-between px-2">
                <span>LINE / ROUTE</span>
                <span>DESTINATION</span>
                <span>ETA</span>
              </div>

              {/* Arrival Item 1 */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded bg-transit-500 text-white font-extrabold text-xs">RT-108</span>
                  <span className="font-bold text-white font-sans">Bus 245</span>
                </div>
                <span className="text-slate-300 font-sans">Andheri West Hub</span>
                <span className="font-extrabold text-emerald-400 text-sm">3 MIN</span>
              </div>

              {/* Arrival Item 2 */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded bg-purple-500 text-white font-extrabold text-xs">RT-415</span>
                  <span className="font-bold text-white font-sans">Bus 504</span>
                </div>
                <span className="text-slate-300 font-sans">Vashi Sector 17 Express</span>
                <span className="font-extrabold text-cyan-400 text-sm">5 MIN</span>
              </div>

              {/* Arrival Item 3 */}
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded bg-emerald-500 text-white font-extrabold text-xs">RT-302</span>
                  <span className="font-bold text-white font-sans">Bus 118</span>
                </div>
                <span className="text-slate-300 font-sans">Tech Park Station</span>
                <span className="font-extrabold text-amber-400 text-sm">8 MIN</span>
              </div>
            </div>

            {/* Live Service Advisory Ticker */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>SERVICE ADVISORY:</strong> Heavy boarding expected on RT-108. Audio announcements active.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Infrastructure Capabilities List */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 flex items-start space-x-4">
              <div className="p-2.5 rounded-xl bg-transit-500/20 text-transit-400 border border-transit-500/30 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-sans">Digital Real-Time Departure Board</h4>
                <p className="text-xs text-slate-300">Live sub-minute countdown timers synchronized directly with vehicle GPS telemetry mesh.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 flex items-start space-x-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                <Accessibility className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-sans">Inclusive Accessibility Standards</h4>
                <p className="text-xs text-slate-300">Audio arrival chimes, high-contrast displays, and ramp/wheelchair accessibility indicators.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-850 border border-slate-800 flex items-start space-x-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white font-sans">Mobile QR & Contactless Sync</h4>
                <p className="text-xs text-slate-300">Passengers scan station QR codes to instantly sync live arrival updates on their smartphones.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartBusStopShowcaseSection;
