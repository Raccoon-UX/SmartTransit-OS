import React, { useState } from 'react';
import { X, ExternalLink, ShieldCheck, AlertCircle, FileText, Send, CheckCircle2, HelpCircle, PhoneCall, Building2, BookOpen } from 'lucide-react';
import { usePublicAccessibility } from '../../context/PublicAccessibilityContext.jsx';
import { CONTACT_CONFIG } from '../../config/contact.js';
import { cn } from '../../utils/index.js';

export function PublicInfoModal({ isOpen, type, onClose }) {
  const { t, language } = usePublicAccessibility();

  // Feedback form state
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    name: '',
    contact: '',
    category: 'Passenger Experience',
    routeBus: '',
    message: '',
  });

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(null);

  if (!isOpen) return null;

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackSent(true);
  };

  const renderContent = () => {
    switch (type) {
      case 'about':
        return (
          <div className="space-y-6 text-left">
            <div className="p-3.5 rounded bg-[#0B3D91]/10 border border-[#0B3D91]/20 text-xs font-mono text-[#0B3D91] dark:text-sky-300 flex items-center space-x-2">
              <Building2 className="w-4 h-4 shrink-0 text-[#0B3D91] dark:text-sky-300" />
              <span>{t('publicAwarenessNotice')}</span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans">
                {t('platformTitle')} — {t('platformSubtitle')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                {t('heroDescription')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-[#0B3D91] dark:text-sky-400 font-mono text-sm uppercase">Vision</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  To deliver a predictable, accessible, transparent, and technology-driven public transportation experience for every municipal commuter.
                </p>
              </div>

              <div className="p-4 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-2">
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 font-mono text-sm uppercase">Mission</h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  Unify vehicle telemetry, digital bus stops, driver cockpits, and dispatch control into a single standardized open system.
                </p>
              </div>
            </div>

            <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-mono flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{t('footerDisclaimer')}</span>
            </div>
          </div>
        );

      case 'rti':
        return (
          <div className="space-y-6 text-left">
            <div className="p-3.5 rounded bg-blue-50 dark:bg-slate-800 border border-blue-300 dark:border-slate-700 text-xs font-mono text-[#0B3D91] dark:text-sky-300 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-[#0B3D91] dark:text-sky-400 shrink-0" />
                <span>RTI ACT 2005 • PUBLIC AWARENESS INFORMATION</span>
              </div>
              <a
                href="https://rti.gov.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-[#0B3D91] text-white text-[11px] font-bold hover:bg-[#093278]"
              >
                <span>{t('officialSource')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                What is the Right to Information (RTI) Act?
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                The Right to Information (RTI) Act 2005 enables eligible citizens to seek information held by public authorities, subject to statutory exemptions and procedural guidelines.
              </p>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white font-mono uppercase text-xs">
                Citizen's Right & Procedure
              </h4>
              <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-5">
                <li>Citizens have the right to request information regarding public transport policies, tender awards, and operations.</li>
                <li>Applications must be submitted to the designated Public Information Officer (PIO) of the respective State Transport Corporation.</li>
                <li>RTI applications can be filed online via the official portal <a href="https://rtionline.gov.in" target="_blank" rel="noreferrer" className="text-[#0B3D91] font-bold underline">rtionline.gov.in</a>.</li>
              </ul>
            </div>

            <div className="p-3 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-mono">
              <strong>Notice:</strong> SmartTransit OS is a demonstration prototype. For official RTI filings, please visit the official State Transport Corporation RTI portal.
            </div>
          </div>
        );

      case 'acts':
        return (
          <div className="space-y-6 text-left">
            <div className="p-3.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-[#0B3D91] shrink-0" />
                <span>MOTOR VEHICLES ACT, 1988 • PUBLIC AWARENESS</span>
              </div>
              <a
                href="https://www.indiacode.nic.in"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-[#0B3D91] text-white text-[11px] font-bold hover:bg-[#093278]"
              >
                <span>India Code Official Act</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                Motor Vehicles Act, 1988 Summary
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                The Motor Vehicles Act, 1988 provides the primary statutory framework covering licensing of drivers, registration of motor vehicles, control of transport vehicles, traffic safety regulations, offences, and penalties.
              </p>
            </div>

            {/* 6 Road Safety Awareness Cards */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white font-mono uppercase text-xs">
                Essential Road Safety Awareness Rules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">🪖 Wear a Helmet</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">Use an ISI-approved protective helmet when riding a two-wheeler for safety.</p>
                </div>
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">🚗 Fasten Seat Belts</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">Seat belts reduce the risk of critical injury for drivers and passengers.</p>
                </div>
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">🚦 Obey Traffic Signals</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">Always respect traffic lights, stop lines, and traffic police directions.</p>
                </div>
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">📱 Avoid Distracted Driving</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">Do not use mobile devices in a manner that distracts focus while driving.</p>
                </div>
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">🚑 Give Way to Ambulances</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">Allow emergency ambulances and fire engines to pass safely immediately.</p>
                </div>
                <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                  <div className="font-bold text-slate-900 dark:text-white">🚶 Respect Pedestrians</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px]">Give priority to pedestrians at marked zebra crossings and bus stops.</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
              <strong>Disclaimer:</strong> Information shown for public awareness. Refer to official Ministry of Road Transport & Highways (MoRTH) notifications for statutory legal text.
            </div>
          </div>
        );

      case 'tenders':
      case 'recruitment':
        return (
          <div className="space-y-6 text-left">
            <div className="p-3.5 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs font-mono text-amber-900 dark:text-amber-200 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{t('demoDataDisclaimer')}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
              {type === 'tenders' ? 'Public Procurement Tenders (Demo Roster)' : 'Career & Training Opportunities (Demo Roster)'}
            </h3>

            <div className="space-y-3 font-mono text-xs">
              {type === 'tenders' ? (
                <>
                  <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                    <div className="font-bold text-[#0B3D91] dark:text-sky-400">TENDER #TND-2026-0841</div>
                    <div className="text-slate-900 dark:text-white font-sans font-bold text-sm">Procurement of Smart Bus Stop LED Display Kiosks</div>
                    <div className="text-slate-600 dark:text-slate-400">Closing Date: 28 Aug 2026 • Category: Digital Infrastructure</div>
                  </div>
                  <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                    <div className="font-bold text-[#0B3D91] dark:text-sky-400">TENDER #TND-2026-0902</div>
                    <div className="text-slate-900 dark:text-white font-sans font-bold text-sm">Electric Bus Telematics & GPS Sensor System Integration</div>
                    <div className="text-slate-600 dark:text-slate-400">Closing Date: 15 Sep 2026 • Category: Telematics</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                    <div className="font-bold text-emerald-700 dark:text-emerald-400">REC #REC-2026-012</div>
                    <div className="text-slate-900 dark:text-white font-sans font-bold text-sm">Municipal Bus Driver & Electric Vehicle Operator</div>
                    <div className="text-slate-600 dark:text-slate-400">Location: Central Depot • Heavy Commercial License Required</div>
                  </div>
                  <div className="p-3 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-1">
                    <div className="font-bold text-emerald-700 dark:text-emerald-400">REC #REC-2026-045</div>
                    <div className="text-slate-900 dark:text-white font-sans font-bold text-sm">SOC Telemetry System Operator & Dispatch Analyst</div>
                    <div className="text-slate-600 dark:text-slate-400">Location: NOC Control Bhavan • Degree/Diploma Required</div>
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
              Public Transport Citizen Feedback Portal
            </h3>

            {feedbackSent ? (
              <div className="p-6 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-3 font-sans">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-base">
                  Thank you for helping improve public transport services!
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Your feedback has been logged into the municipal customer service queue.
                </p>
                <button
                  type="button"
                  onClick={() => setFeedbackSent(false)}
                  className="px-4 py-2 rounded bg-emerald-700 text-white font-mono text-xs font-bold"
                >
                  Submit Another Feedback
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={feedbackData.name}
                      onChange={(e) => setFeedbackData({ ...feedbackData, name: e.target.value })}
                      className="w-full p-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email / Mobile Number</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ramesh@example.com / 9876543210"
                      value={feedbackData.contact}
                      onChange={(e) => setFeedbackData({ ...feedbackData, contact: e.target.value })}
                      className="w-full p-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Feedback Category</label>
                    <select
                      value={feedbackData.category}
                      onChange={(e) => setFeedbackData({ ...feedbackData, category: e.target.value })}
                      className="w-full p-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option>Passenger Experience</option>
                      <option>Bus Schedule & Punctuality</option>
                      <option>Digital Bus Stop Display</option>
                      <option>Accessibility Support</option>
                      <option>Driver / Staff Behavior</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Route / Bus No. (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Bus 504 / RT-415"
                      value={feedbackData.routeBus}
                      onChange={(e) => setFeedbackData({ ...feedbackData, routeBus: e.target.value })}
                      className="w-full p-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Your Message / Feedback</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your feedback or suggestion..."
                    value={feedbackData.message}
                    onChange={(e) => setFeedbackData({ ...feedbackData, message: e.target.value })}
                    className="w-full p-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-[#0B3D91] hover:bg-[#093278] text-white font-mono font-bold text-xs flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Official Feedback</span>
                </button>
              </form>
            )}
          </div>
        );

      case 'faqs':
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
              Frequently Asked Questions (FAQs)
            </h3>

            <div className="space-y-2 font-sans text-xs">
              {[
                {
                  id: 'faq-1',
                  q: 'How do I track a bus in real time?',
                  a: 'Click "Track Live Buses" on the home page or search your bus number (e.g. Bus 245) in the search bar to view live GPS coordinates and sub-minute ETA predictions.',
                },
                {
                  id: 'faq-2',
                  q: 'How accurate is the real-time ETA information?',
                  a: 'ETAs are calculated continuously using live vehicle telemetry and machine learning traffic delay predictions. ETAs update dynamically with traffic conditions.',
                },
                {
                  id: 'faq-3',
                  q: 'What is a digital bus stop display?',
                  a: 'Digital bus stops feature connected LED boards showing live arrival times, audio announcements for accessibility, and service advisories.',
                },
                {
                  id: 'faq-4',
                  q: 'How do accessibility controls work?',
                  a: 'Use the top utility bar buttons (A- / A / A+) to increase font size, or click High Contrast to switch into high-contrast accessibility mode.',
                },
              ].map((faq) => {
                const isExpanded = expandedFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                      className="w-full p-3 font-bold text-slate-900 dark:text-white text-left flex items-center justify-between"
                    >
                      <span className="flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4 text-[#0B3D91] shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <span>{isExpanded ? '−' : '+'}</span>
                    </button>
                    {isExpanded && (
                      <div className="p-3 pt-0 text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6 text-left">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
              Official Contact & Public Helplines
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-2">
                <div className="font-bold text-[#0B3D91] dark:text-sky-400 font-mono flex items-center space-x-1.5">
                  <PhoneCall className="w-4 h-4" />
                  <span>24x7 Public Helpline</span>
                </div>
                <strong className="text-slate-900 dark:text-white font-mono text-sm block">{CONTACT_CONFIG.PUBLIC_HELPLINE}</strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">Toll-free 24x7 commuter assistance and bus inquiry.</p>
              </div>

              <div className="p-4 rounded bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 space-y-2">
                <div className="font-bold text-emerald-700 dark:text-emerald-400 font-mono flex items-center space-x-1.5">
                  <PhoneCall className="w-4 h-4" />
                  <span>Student / Commuter Support</span>
                </div>
                <strong className="text-slate-900 dark:text-white font-mono text-sm block">{CONTACT_CONFIG.STUDENT_HELPLINE}</strong>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">Student passes, concession passes, and route inquiries.</p>
              </div>
            </div>

            <div className="p-4 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xs space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">Central Transport Headquarters</div>
              <p className="text-slate-600 dark:text-slate-400">{CONTACT_CONFIG.HEADQUARTERS}</p>
              <p className="text-slate-600 dark:text-slate-400">Email: {CONTACT_CONFIG.GRIEVANCE_EMAIL}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs text-sans">
      <div className="max-w-2xl w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
        {/* Modal Header Bar */}
        <div className="p-4 bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-2 font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
            <ShieldCheck className="w-4 h-4 text-[#0B3D91] dark:text-sky-400" />
            <span className="uppercase tracking-wider">OFFICIAL PUBLIC INFORMATION PORTAL</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {renderContent()}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-700"
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PublicInfoModal;
