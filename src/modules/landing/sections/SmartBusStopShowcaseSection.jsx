import React from 'react';
import { MapPin, Bus, Radio, Wifi, QrCode, ShieldCheck, Clock, Users, Volume2, Accessibility } from 'lucide-react';
import { cn } from '../../../utils/index.js';
import mobilityHubsBg from '../../../assets/Mobility-Hubs.png';

export function SmartBusStopShowcaseSection({ className = '' }) {
  return (
    <section
      className={cn(
        'relative py-16 sm:py-24 bg-slate-950 text-white border-y border-slate-800 text-left overflow-hidden bg-cover bg-center bg-no-repeat bg-fixed',
        className
      )}
      style={{ backgroundImage: `url(${mobilityHubsBg})` }}
    >
      {/* Dark Overlay Layer for Contrast */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md text-cyan-300 border border-white/20 text-xs font-mono font-bold">
            <Wifi className="w-3.5 h-3.5 animate-pulse" />
            <span>CONNECTED PHYSICAL INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-sans">
            Turn Every Bus Stop Into a Smart Public Facility.
          </h2>
          <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            SmartTransit OS upgrades physical bus shelters into digital public information hubs with live arrival boards, accessibility audio broadcasts, service alerts, and mobile QR passenger integration.
          </p>
        </div>

        {/* Smart Bus Stop Digital Kiosk Visualization Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Digital Display Board Mockup */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-panel space-y-6 font-mono">
            {/* Kiosk Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-[#0B3D91] text-white flex items-center justify-center font-bold shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-sans">MAGATHANE JUNCTION</h3>
                  <p className="text-xs text-slate-400">STATION CODE: BST-048 • CORRIDOR RT-108</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
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
              <div className="p-3.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded bg-[#0B3D91] text-white font-extrabold text-xs">RT-108</span>
                  <span className="font-bold text-white font-sans">Bus 245</span>
                </div>
                <span className="text-slate-300 font-sans">Central Station Hub</span>
                <span className="font-extrabold text-emerald-400 text-sm">3 MIN</span>
              </div>

              {/* Arrival Item 2 */}
              <div className="p-3.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded bg-purple-600 text-white font-extrabold text-xs">RT-415</span>
                  <span className="font-bold text-white font-sans">Bus 504</span>
                </div>
                <span className="text-slate-300 font-sans">Metro Junction Express</span>
                <span className="font-extrabold text-cyan-400 text-sm">5 MIN</span>
              </div>

              {/* Arrival Item 3 */}
              <div className="p-3.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded bg-emerald-600 text-white font-extrabold text-xs">RT-302</span>
                  <span className="font-bold text-white font-sans">Bus 118</span>
                </div>
                <span className="text-slate-300 font-sans">Municipal Square</span>
                <span className="font-extrabold text-amber-400 text-sm">8 MIN</span>
              </div>
            </div>

            {/* Live Service Advisory Ticker */}
            <div className="p-3 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Volume2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>SERVICE ADVISORY:</strong> Heavy boarding expected on RT-108. Audio announcements active.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Kiosk Feature Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-panel space-y-2">
              <div className="flex items-center space-x-2.5">
                <Accessibility className="w-5 h-5 text-sky-400 shrink-0" />
                <h4 className="font-bold text-white text-sm font-sans">Accessibility & Audio Announcements</h4>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Integrated text-to-speech audio speakers broadcast arrival countdowns and route updates for visually impaired commuters.
              </p>
            </div>

            <div className="p-4 rounded bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-panel space-y-2">
              <div className="flex items-center space-x-2.5">
                <QrCode className="w-5 h-5 text-emerald-400 shrink-0" />
                <h4 className="font-bold text-white text-sm font-sans">Mobile QR Live Tracking Link</h4>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Commuters scan kiosk QR codes to launch live bus location and occupancy maps directly on their mobile device without downloading an app.
              </p>
            </div>

            <div className="p-4 rounded bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-panel space-y-2">
              <div className="flex items-center space-x-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <h4 className="font-bold text-white text-sm font-sans">Solar & SRE Infrastructure Health</h4>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Low-power solar displays monitored 24x7 by automated telemetry health checks to guarantee 99.9% public display uptime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartBusStopShowcaseSection;
