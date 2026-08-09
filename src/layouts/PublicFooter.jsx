import React from 'react';
import { Shield, PhoneCall, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="border-t border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 transition-colors duration-200 text-left">
      {/* Top 3px Solid Institutional Accent Bar */}
      <div className="h-1 bg-[#0B3D91] w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-300 dark:border-slate-800">
          {/* Masthead Attribution */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded bg-[#0B3D91] flex items-center justify-center text-white font-bold">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-base text-slate-900 dark:text-white font-sans">
                  SmartTransit OS Portal
                </span>
                <span className="block text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                  Official Metropolitan Public Transport Operations & Commuter Information Service
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-lg">
              Published by the Municipal Transport Corporation in coordination with City Urban Mobility Department. Provided as a public civic digital service for real-time bus tracking, route schedules, and transit operational oversight.
            </p>
            <div className="p-3 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono flex items-center space-x-3 w-fit">
              <PhoneCall className="w-4 h-4 text-[#0B3D91] dark:text-sky-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-bold">24x7 Transit Helpline & Toll-Free</span>
                <strong className="text-slate-900 dark:text-white font-bold text-sm">1800-11-TRANSIT (1800-11-8726)</strong>
              </div>
            </div>
          </div>

          {/* Quick Official Portals */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-300 dark:border-slate-700 pb-1">
              Public Services
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans">
              <li><a href="#live-map" className="hover:text-[#0B3D91] underline">Live Bus Map & Search</a></li>
              <li><a href="#planner" className="hover:text-[#0B3D91] underline">Journey Route Planner</a></li>
              <li><a href="#smart-stops" className="hover:text-[#0B3D91] underline">Smart Bus Stop Kiosks</a></li>
              <li><a href="#advisories" className="hover:text-[#0B3D91] underline">Public Service Advisories</a></li>
              <li><a href="#grievances" className="hover:text-[#0B3D91] underline">Public Grievance Redressal Portal</a></li>
            </ul>
          </div>

          {/* Governance & Compliance */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-300 dark:border-slate-700 pb-1">
              Governance & Standards
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans">
              <li><a href="#" className="hover:text-[#0B3D91] underline">Right to Information (RTI)</a></li>
              <li><a href="#" className="hover:text-[#0B3D91] underline">Accessibility Statement (WCAG AA)</a></li>
              <li><a href="#" className="hover:text-[#0B3D91] underline">Open Transit Data (GTFS-RT)</a></li>
              <li><a href="#" className="hover:text-[#0B3D91] underline">Terms of Service & Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#0B3D91] underline">State Transport Directorate</a></li>
            </ul>
          </div>
        </div>

        {/* E-Governance Legal Bottom Attribution Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono gap-3">
          <div>
            <span>© 2026 Government Transit Operations & Municipal Transport Authority. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span>Last Updated: 09 Aug 2026</span>
            <span>•</span>
            <span>GTFS-RT Standard v2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
