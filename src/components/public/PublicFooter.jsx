import React from 'react';
import { PhoneCall, Mail, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { CONTACT_CONFIG } from '../../config/contact.js';

import logoImg from '../../assets/logo.png';
import msrtcLogo1 from '../../assets/msrtc logo1.png';
import bestLogo from '../../assets/BEST Bus_logo.png';

export function PublicFooter() {
  const { t } = usePublicAccessibility();

  return (
    <footer className="bg-[#14233B] text-white border-t-4 border-[#B83E12] font-sans text-left select-none relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-700/80">
          {/* Column 1: About & Official Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logoImg} alt="SmartTransit OS Logo" className="h-9 w-auto object-contain shrink-0" />
              <span className="text-slate-500 font-mono text-base">|</span>
              <img src={msrtcLogo1} alt="MSRTC Emblem" className="h-8 w-auto object-contain shrink-0" />
              <div>
                <span className="font-extrabold text-base text-white block">
                  {t('platformTitle')}
                </span>
                <span className="text-[10px] text-amber-300 font-mono block">
                  Official Transport Authority Portal
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-md font-sans">
              {t('footerAboutDesc')}
            </p>

            <div className="p-3 rounded bg-slate-900/90 border border-slate-700 text-xs font-mono space-y-1.5 w-fit">
              <div className="flex items-center space-x-2 text-amber-300 font-bold">
                <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                <span>{t('footerHelplineHeading')}: {CONTACT_CONFIG.PUBLIC_HELPLINE}</span>
              </div>
              <div className="text-[10px] text-slate-400">
                Student Helpline: {CONTACT_CONFIG.STUDENT_HELPLINE}
              </div>
            </div>
          </div>

          {/* Column 2: Passenger Services */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px] font-mono border-b border-slate-700 pb-1">
              Passenger Services
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><a href="#live-tracking" className="hover:text-amber-200 underline">Live Bus Map & Search</a></li>
              <li><a href="#planner" className="hover:text-amber-200 underline">Route & Journey Planner</a></li>
              <li><a href="#smart-stops" className="hover:text-amber-200 underline">Digital Bus Stop Kiosks</a></li>
              <li><a href="#advisories" className="hover:text-amber-200 underline">Public Service Advisories</a></li>
              <li><a href="#grievances" className="hover:text-amber-200 underline">Grievance Redressal Portal</a></li>
            </ul>
          </div>

          {/* Column 3: Transport Network */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px] font-mono border-b border-slate-700 pb-1">
              Transport Network
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><a href="#fleet" className="hover:text-amber-200 underline">Municipal Fleet Roster</a></li>
              <li><a href="#routes" className="hover:text-amber-200 underline">Corridors & Timetables</a></li>
              <li><a href="#soc" className="hover:text-amber-200 underline">System Operations Center</a></li>
              <li><a href="#ai" className="hover:text-amber-200 underline">Predictive Dispatch Engine</a></li>
              <li><a href="#open-data" className="hover:text-amber-200 underline">GTFS-RT Open Data Stream</a></li>
            </ul>
          </div>

          {/* Column 4: Governance & Transparency */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px] font-mono border-b border-slate-700 pb-1">
              Governance & RTI
            </h4>
            <ul className="space-y-1.5 text-slate-300">
              <li><a href="#rti" className="hover:text-amber-200 underline">Right to Information (RTI Act)</a></li>
              <li><a href="#tenders" className="hover:text-amber-200 underline">Procurement & Tenders</a></li>
              <li><a href="#circulars" className="hover:text-amber-200 underline">Acts, Rules & Circulars</a></li>
              <li><a href="#recruitment" className="hover:text-amber-200 underline">Corporation Recruitment</a></li>
              <li><a href="#accessibility" className="hover:text-amber-200 underline">Accessibility Statement (WCAG AA)</a></li>
            </ul>
          </div>
        </div>

        {/* E-Governance Legal Bottom Attribution Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-3">
          <div className="space-y-1">
            <p>© 2026 Government Transit Operations & Municipal Transport Authority. All rights reserved.</p>
            <p className="text-[10px] text-amber-400/90 italic">
              {t('footerDisclaimer')}
            </p>
          </div>
          <div className="flex items-center space-x-3 text-[11px] shrink-0">
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
