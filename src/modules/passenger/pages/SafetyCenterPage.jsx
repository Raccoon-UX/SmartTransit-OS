import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertOctagon, Phone, HeartHandshake, Plus, Trash2, Share2, FileText, Info, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { passengerSafetyService } from '../../../services/passenger/passengerSafetyService.js';
import { passengerSosService } from '../../../services/passenger/passengerSosService.js';
import { journeyService } from '../../../services/passenger/journeyService.js';
import { Button } from '../../../components/ui/Button.jsx';
import { useToast } from '../../../components/ui/Toast.jsx';
import { PassengerSosModal } from '../components/PassengerSosModal.jsx';
import { ActiveSosBanner } from '../components/ActiveSosBanner.jsx';
import { ShareJourneyModal } from '../components/ShareJourneyModal.jsx';
import { ReportIssueModal } from '../components/ReportIssueModal.jsx';
import { cn } from '../../../utils/index.js';

export function SafetyCenterPage({ onNavigate }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [contacts, setContacts] = useState([]);
  const [activeSos, setActiveSos] = useState(passengerSosService.getActiveSos());
  const [activeTrip, setActiveTrip] = useState(journeyService.getActiveTrip());

  // Modal states
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // New Contact Form
  const [showAddContact, setShowAddContact] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactRelation, setContactRelation] = useState('Family');

  const helplines = passengerSafetyService.getHelplines();
  const guidelines = passengerSafetyService.getGuidelines();

  useEffect(() => {
    passengerSafetyService.getTrustedContacts(user?.id).then(setContacts);
    const unsubscribeContacts = passengerSafetyService.subscribe(setContacts);
    const unsubscribeSos = passengerSosService.subscribe(setActiveSos);
    const unsubscribeTrip = journeyService.subscribeActiveTrip(setActiveTrip);
    return () => {
      unsubscribeContacts();
      unsubscribeSos();
      unsubscribeTrip();
    };
  }, [user]);

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      addToast('Name and phone number are required.', 'error');
      return;
    }

    try {
      await passengerSafetyService.addTrustedContact({
        name: contactName,
        phone: contactPhone,
        relationship: contactRelation,
        passengerId: user?.id || 'usr-pass-001',
      });
      addToast('Trusted emergency contact added.', 'success');
      setContactName('');
      setContactPhone('');
      setShowAddContact(false);
    } catch (err) {
      console.error('[SafetyCenterPage] Add contact error:', err);
      addToast('Failed to add contact.', 'error');
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await passengerSafetyService.deleteTrustedContact(id);
      addToast('Contact removed.', 'info');
    } catch (err) {
      console.error('[SafetyCenterPage] Delete contact error:', err);
      addToast('Failed to remove contact.', 'error');
    }
  };

  return (
    <div className="space-y-8 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-mono font-bold mb-1 border border-rose-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MUNICIPAL COMMUTER SAFETY DESK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Commuter Safety Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Emergency SOS trigger, verified helpline directory, trusted contacts, and night travel safety protocols.
          </p>
        </div>
      </div>

      {/* Active SOS Banner if running */}
      {activeSos && (
        <ActiveSosBanner activeSos={activeSos} onResolved={() => setActiveSos(null)} />
      )}

      {/* Primary Action Hero Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Emergency SOS Trigger Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 via-rose-500/5 to-transparent border border-rose-500/30 shadow-xs space-y-3">
          <div className="p-3 rounded-2xl bg-rose-600 text-white w-fit shadow-md">
            <AlertOctagon className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-sans">
              Emergency SOS
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Trigger a high-priority incident broadcast to transit operations dispatch with your live vehicle & GPS.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => setIsSosModalOpen(true)}
            className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold shadow-md"
          >
            🚨 Trigger Emergency SOS
          </Button>
        </div>

        {/* 2. Report Safety Issue */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="p-3 rounded-2xl bg-amber-500 text-white w-fit shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-sans">
              Report Safety Hazard
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Report non-emergency safety concerns like faulty doors, lighting issues, or stop hazards.
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => setIsReportModalOpen(true)}
            className="border-slate-300 dark:border-slate-700 font-bold"
          >
            📝 Report Safety Issue
          </Button>
        </div>

        {/* 3. Share Live Journey */}
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="p-3 rounded-2xl bg-[#0B3D91] text-white w-fit shadow-md">
            <Share2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-sans">
              Share Live Journey
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Send your current bus line, estimated arrival, and stop progression to family or trusted contacts.
            </p>
          </div>
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={() => setIsShareModalOpen(true)}
            className="border-slate-300 dark:border-slate-700 font-bold"
          >
            📍 Share Journey Telemetry
          </Button>
        </div>
      </div>

      {/* Middle Split: Trusted Contacts & Helplines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 6 Cols: Trusted Emergency Contacts */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
                Trusted Emergency Contacts
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                People who receive immediate notifications if you trigger Emergency SOS.
              </p>
            </div>
            {!showAddContact && (
              <Button
                variant="outline"
                size="sm"
                leftIcon={Plus}
                onClick={() => setShowAddContact(true)}
                className="text-xs font-bold"
              >
                Add Contact
              </Button>
            )}
          </div>

          {/* Add Contact Form */}
          {showAddContact && (
            <form onSubmit={handleAddContact} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="font-bold text-xs text-slate-900 dark:text-white font-mono uppercase">
                New Emergency Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Full Name *"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-transit-500"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number (e.g. +91 98200 12345) *"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-transit-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <select
                  value={contactRelation}
                  onChange={(e) => setContactRelation(e.target.value)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs"
                >
                  <option value="Family / Spouse">Family / Spouse</option>
                  <option value="Parent / Guardian">Parent / Guardian</option>
                  <option value="Colleague / Friend">Colleague / Friend</option>
                  <option value="Emergency Contact">Emergency Contact</option>
                </select>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="xs" type="button" onClick={() => setShowAddContact(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="xs" type="submit" className="bg-transit-600 text-white font-bold">
                    Save Contact
                  </Button>
                </div>
              </div>
            </form>
          )}

          {/* Contact Cards */}
          <div className="space-y-2.5">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <strong className="text-sm font-bold text-slate-900 dark:text-white font-sans">
                      {contact.name}
                    </strong>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {contact.relationship}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {contact.phone}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors"
                  title="Remove contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 Cols: Municipal Helplines & Safety Guidelines */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
              Municipal 24/7 Safety Helplines
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct emergency helpline numbers verified for Maharashtra & Mumbai Metropolitan Region.
            </p>
          </div>

          <div className="space-y-2.5">
            {helplines.map((hl) => (
              <div
                key={hl.number}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-xs text-slate-900 dark:text-white font-sans">
                    {hl.name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                    {hl.description}
                  </div>
                </div>

                <a
                  href={`tel:${hl.number}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-transit-500/10 text-transit-600 dark:text-transit-400 font-mono font-extrabold text-xs whitespace-nowrap border border-slate-200 dark:border-slate-700 flex items-center space-x-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{hl.number}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Full-Width Section: Safety Guidelines */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans flex items-center space-x-2">
          <Info className="w-4 h-4 text-transit-500" />
          <span>Commuter Safety Protocols & Security Standards</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {guidelines.map((g, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="text-[10px] font-mono font-bold text-transit-600 dark:text-transit-400 uppercase">
                RULE 0{idx + 1}
              </span>
              <strong className="font-bold text-slate-900 dark:text-white block font-sans">
                {g.title}
              </strong>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                {g.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <PassengerSosModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
        activeTrip={activeTrip}
        user={user}
        onSosTriggered={(sos) => setActiveSos(sos)}
      />

      <ShareJourneyModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        activeTrip={activeTrip}
      />

      <ReportIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        activeTrip={activeTrip}
        user={user}
      />
    </div>
  );
}

export default SafetyCenterPage;
