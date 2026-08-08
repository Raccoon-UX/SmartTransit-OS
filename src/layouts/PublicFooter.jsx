import React from 'react';
import { Activity, ShieldCheck, Heart, Globe, Terminal } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 transition-colors duration-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-transit-500 to-transit-700 flex items-center justify-center text-white shadow-glow-sm">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white font-sans">
                SmartTransit <span className="text-transit-500">OS</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              AI-Powered Smart City Transport Operating System connecting passengers, drivers, transport authorities, and digital bus stop displays through one unified intelligence mesh.
            </p>
            <div className="flex items-center space-x-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
              <span>Simulated Prototype Environment v1.0.0</span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#live-tracking" className="hover:text-transit-500 transition-colors">Live Transit Map</a></li>
              <li><a href="#capabilities" className="hover:text-transit-500 transition-colors">Core Capabilities</a></li>
              <li><a href="#ai-intelligence" className="hover:text-transit-500 transition-colors">AI Intelligence Layer</a></li>
              <li><a href="#technology" className="hover:text-transit-500 transition-colors">Security Architecture</a></li>
              <li><a href="#soc" className="hover:text-transit-500 transition-colors">Operations Center (SOC)</a></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#ecosystem" className="hover:text-transit-500 transition-colors">Passenger Experience</a></li>
              <li><a href="#ecosystem" className="hover:text-transit-500 transition-colors">Driver Cockpit</a></li>
              <li><a href="#ecosystem" className="hover:text-transit-500 transition-colors">Transport Authorities</a></li>
              <li><a href="#ecosystem" className="hover:text-transit-500 transition-colors">Digital Bus Stops</a></li>
              <li><a href="#ecosystem" className="hover:text-transit-500 transition-colors">System Operations</a></li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><a href="#" className="hover:text-transit-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-transit-500 transition-colors">API Architecture</a></li>
              <li><a href="#" className="hover:text-transit-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-transit-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-transit-500 transition-colors">Contact Support</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
          <span>© 2026 SmartTransit OS. All rights reserved. Enterprise Smart City Mobility Platform.</span>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400">GTFS-Realtime Protocol Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
