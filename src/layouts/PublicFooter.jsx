import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  FileText, 
  Globe, 
  User, 
  Phone,
  BookOpen
} from 'lucide-react';
import { cn } from '../utils/index.js';

import logoImg from '../assets/logo.png';
import msrtcLogo1 from '../assets/msrtc logo1.png';
import bestLogo from '../assets/BEST Bus_logo.png';
import tmtLogo from '../assets/TMT_logo.png';

export function PublicFooter({ className = '' }) {
  // Contact Us / Public Grievance Form State (4 Fields)
  const [formData, setFormData] = useState({
    name: '',
    email: 'vsujal956@gmail.com',
    phone: '+91 7710893839',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);

    const timestamp = new Date().toLocaleString([], { 
      dateStyle: 'medium', 
      timeStyle: 'short' 
    });

    const rawPhoneDigits = '917710893839';

    // 1. Formatted WhatsApp Message & Deep Link launch to +91 7710893839
    const whatsappMsg = `📋 *SMARTTRANSIT OS — PUBLIC GRIEVANCE & COMPLAINT SUBMISSION* 📋\n\n👤 *Sender Name:* ${formData.name}\n📧 *Sender Gmail:* ${formData.email}\n📞 *Phone Number:* ${formData.phone}\n⏰ *Submitted At:* ${timestamp}\n\n💬 *Complaint / Feedback Message:*\n${formData.message}\n\n_State Transport Grievance Redressal Desk_`;
    const whatsappUrl = `https://wa.me/${rawPhoneDigits}?text=${encodeURIComponent(whatsappMsg)}`;

    try {
      window.open(whatsappUrl, '_blank');
    } catch (err) {
      console.warn('WhatsApp window popup blocked:', err);
    }

    // 2. Formatted Gmail Mailto Deep Link launch to vsujal956@gmail.com
    const emailSubject = `📋 [GRIEVANCE / COMPLAINT] SmartTransit OS - ${formData.name}`;
    const emailBody = `PUBLIC GRIEVANCE SUBMISSION\n\nSender Name: ${formData.name}\nEmail: ${formData.email}\nPhone Number: ${formData.phone}\nSubmitted At: ${timestamp}\n\nComplaint / Feedback Message:\n${formData.message}\n\nSmartTransit OS Grievance Redressal Portal`;
    const gmailUrl = `mailto:vsujal956@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    setTimeout(() => {
      window.location.href = gmailUrl;
    }, 400);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 8000);
    }, 600);
  };

  return (
    <footer className={cn('border-t border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 transition-colors duration-200 text-left select-none', className)}>
      {/* Top 3px Solid Institutional Accent Line */}
      <div className="h-1 bg-[#B83E12] w-full" />

      {/* Official Government Partner Emblems Banner Strip */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#B83E12] dark:text-amber-400" />
            <span>OFFICIAL TRANSIT CORPORATIONS & MUNICIPAL EMPOWERMENT PARTNERS</span>
          </div>

          <div className="flex items-center space-x-4 sm:space-x-6 overflow-x-auto py-1">
            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img src={logoImg} alt="SmartTransit OS Logo" className="h-7 w-auto object-contain shrink-0" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white font-sans">SmartTransit OS</span>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img src={msrtcLogo1} alt="MSRTC Emblem" className="h-7 w-auto object-contain shrink-0" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white font-sans">MSRTC Official</span>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img src={bestLogo} alt="BEST Bus Logo" className="h-7 w-auto object-contain shrink-0" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white font-sans">BEST Undertaking</span>
            </div>

            <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img src={tmtLogo} alt="TMT Logo" className="h-7 w-auto object-contain shrink-0" />
              <span className="text-[11px] font-bold text-slate-900 dark:text-white font-sans">TMT Transit</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        {/* Upper Grid: Portal Information, Links, & Contact Us Grievance Desk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-300 dark:border-slate-800">
          
          {/* Column 1 (5 Cols): Masthead & Helpline */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <img src={logoImg} alt="SmartTransit OS Logo" className="h-10 w-auto object-contain shrink-0" />
              <div className="border-l border-slate-300 dark:border-slate-700 pl-3">
                <span className="font-extrabold text-base text-slate-900 dark:text-white font-sans whitespace-nowrap">
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

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono space-y-2.5 w-fit shadow-xs">
              <div className="flex items-center space-x-3">
                <PhoneCall className="w-4 h-4 text-[#B83E12] dark:text-amber-400 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-bold">24x7 TRANSIT HELPLINE & TOLL-FREE</span>
                  <strong className="text-slate-900 dark:text-white font-bold text-sm">1800-11-TRANSIT (1800-11-8726)</strong>
                </div>
              </div>

              <div className="pt-1.5 border-t border-slate-200 dark:border-slate-700/80 flex flex-wrap gap-3 text-[11px] font-sans">
                <span className="flex items-center space-x-1 text-emerald-700 dark:text-emerald-400 font-bold">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>WhatsApp: +91 7710893839</span>
                </span>
                <span className="flex items-center space-x-1 text-rose-700 dark:text-rose-400 font-bold">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span>Gmail: vsujal956@gmail.com</span>
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-3">
                <a 
                  href="https://raccoon-ux.github.io/SmartTransit-OS-Documentation/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold transition-colors shadow-xs border border-emerald-500"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>Documentation ↗</span>
                </a>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">v1.0.0 Stable</span>
              </div>
            </div>
          </div>

          {/* Column 2 (2 Cols): Public Services */}
          <div className="lg:col-span-2 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-300 dark:border-slate-700 pb-1">
              Public Services
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans">
              <li><a href="#live-map" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline">Live Bus Map & Search</a></li>
              <li><a href="#planner" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline">Journey Route Planner</a></li>
              <li><a href="#smart-stops" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline">Smart Bus Stop Kiosks</a></li>
              <li><a href="https://raccoon-ux.github.io/SmartTransit-OS-Documentation/" target="_blank" rel="noreferrer" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline font-bold flex items-center space-x-1 text-emerald-700 dark:text-emerald-400"><span>Documentation</span><ExternalLink className="w-3 h-3 inline" /></a></li>
              <li><a href="#advisories" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline">Public Service Advisories</a></li>
              <li><a href="#grievances" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline">Grievance Redressal Desk</a></li>
            </ul>
          </div>

          {/* Column 3 (2 Cols): Governance & External Portals */}
          <div className="lg:col-span-2 space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono border-b border-slate-300 dark:border-slate-700 pb-1">
              Official Portals & RTI
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-sans">
              <li><a href="https://msrtc.maharashtra.gov.in/GeneralPages/Home.aspx" target="_blank" rel="noreferrer" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline flex items-center space-x-1"><span>MSRTC Portal</span><ExternalLink className="w-3 h-3 inline" /></a></li>
              <li><a href="https://mib.gov.in/en/node/1326" target="_blank" rel="noreferrer" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline flex items-center space-x-1"><span>MIB Advisory</span><ExternalLink className="w-3 h-3 inline" /></a></li>
              <li><a href="https://raccoon-ux.github.io/SmartTransit-OS-Documentation/" target="_blank" rel="noreferrer" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline flex items-center space-x-1"><span>Technical Docs</span><ExternalLink className="w-3 h-3 inline" /></a></li>
              <li><a href="#" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline">Right to Information (RTI)</a></li>
              <li><a href="#" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline">Accessibility Statement</a></li>
              <li><a href="#" className="hover:text-[#B83E12] dark:hover:text-amber-400 underline">Open Transit Data (GTFS)</a></li>
            </ul>
          </div>

          {/* Column 4 (3 Cols): Interactive Contact Us / Public Grievance Desk (4 Fields) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-700 pb-1">
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] font-mono flex items-center space-x-1.5">
                <FileText className="w-3.5 h-3.5 text-[#B83E12] dark:text-amber-400 shrink-0" />
                <span>Contact Us / Public Grievance</span>
              </h4>
            </div>

            {submitted && (
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div className="leading-tight">
                  <strong>Complaint Dispatched!</strong> Sent to WhatsApp (+91 7710893839) & Gmail (vsujal956@gmail.com).
                </div>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-2 text-xs font-sans">
              {/* Field 1: Name */}
              <div>
                <label className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-0.5">
                  1. Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#B83E12]"
                />
              </div>

              {/* Field 2: Gmail / Email */}
              <div>
                <label className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-0.5">
                  2. Gmail / Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="vsujal956@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#B83E12]"
                />
              </div>

              {/* Field 3: Phone Number */}
              <div>
                <label className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-0.5">
                  3. Phone / WhatsApp Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 7710893839"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#B83E12]"
                />
              </div>

              {/* Field 4: Complaint Message */}
              <div>
                <label className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block mb-0.5">
                  4. Complaint / Feedback Message *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Write your grievance or feedback..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-xs focus:outline-none focus:border-[#B83E12] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-3 rounded-lg bg-[#B83E12] hover:bg-[#96300c] text-white font-mono font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Dispatching Alert...' : 'Submit Grievance to WhatsApp & Email'}</span>
              </button>
            </form>
          </div>

        </div>

        {/* E-Governance Legal Bottom Attribution Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono gap-3">
          <div>
            <span>© 2026 Government Transit Operations & Municipal Transport Authority. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <a href="https://raccoon-ux.github.io/SmartTransit-OS-Documentation/" target="_blank" rel="noreferrer" className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold flex items-center space-x-1">
              <span>Documentation ↗</span>
            </a>
            <span>•</span>
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

