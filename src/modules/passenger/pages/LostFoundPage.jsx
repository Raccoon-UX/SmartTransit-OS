import React, { useState, useEffect } from 'react';
import { Package, PlusCircle, Search, Clock, CheckCircle2, MapPin, Bus, Route, Phone, Mail, ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { passengerLostFoundService } from '../../../services/passenger/passengerLostFoundService.js';
import { journeyService } from '../../../services/passenger/journeyService.js';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { useToast } from '../../../components/ui/Toast.jsx';
import { cn } from '../../../utils/index.js';

export function LostFoundPage({ onNavigate }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('list'); // 'list' | 'report'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTrip, setActiveTrip] = useState(journeyService.getActiveTrip());

  // Report Form State
  const categories = passengerLostFoundService.getCategories();
  const [category, setCategory] = useState(categories[0]);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [route, setRoute] = useState('');
  const [approximateTime, setApproximateTime] = useState('Today morning');
  const [contactPref, setContactPref] = useState('Phone & WhatsApp');
  const [contactDetails, setContactDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    passengerLostFoundService.getLostItems(user?.id).then(setItems);
    const unsubscribe = passengerLostFoundService.subscribe(setItems);
    const unsubscribeTrip = journeyService.subscribeActiveTrip(setActiveTrip);
    return () => {
      unsubscribe();
      unsubscribeTrip();
    };
  }, [user]);

  // Auto populate vehicle and route if on an active journey
  useEffect(() => {
    if (activeTrip && activeTrip.isActive) {
      if (activeTrip.busNumber) setVehicle(activeTrip.busNumber);
      if (activeTrip.routeCode) setRoute(`${activeTrip.routeCode} (${activeTrip.routeName || 'Line'})`);
    }
  }, [activeTrip]);

  const handleSubmitReport = async (e) => {
    e.preventDefault();
    if (!itemName.trim() || !description.trim()) {
      setFormError('Item name and description are required.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const report = await passengerLostFoundService.reportLostItem({
        category,
        itemName: itemName.trim(),
        description: description.trim(),
        vehicle: vehicle.trim() || null,
        route: route.trim() || null,
        journeyId: activeTrip?.journeyId || null,
        approximateTime,
        contactPreference: contactPref,
        contactDetails: contactDetails.trim() || user?.email || '+91 98765 43210',
        passengerId: user?.id || 'usr-pass-001',
      });

      addToast(`Lost property report submitted (${report.id})`, 'success');
      setItemName('');
      setDescription('');
      setActiveTab('list');
    } catch (err) {
      console.error('[LostFoundPage] Report error:', err);
      setFormError('Failed to register lost property report.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = items.filter((item) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.itemName?.toLowerCase().includes(q) ||
        item.id?.toLowerCase().includes(q) ||
        item.category?.toLowerCase().includes(q) ||
        item.vehicle?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-mono font-bold mb-1 border border-purple-500/20">
            <Package className="w-3.5 h-3.5" />
            <span>TRANSIT CUSTODY & PROPERTY RECOVERY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Lost & Found Property Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Report items left on municipal buses or depot terminals. Track depot custody and retrieval verification.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={activeTab === 'report' ? 'outline' : 'primary'}
            size="md"
            leftIcon={PlusCircle}
            onClick={() => setActiveTab(activeTab === 'report' ? 'list' : 'report')}
            className={activeTab === 'report' ? '' : 'bg-purple-600 hover:bg-purple-700 text-white font-bold'}
          >
            {activeTab === 'report' ? 'View My Reports' : 'Report Lost Property'}
          </Button>
        </div>
      </div>

      {activeTab === 'report' ? (
        /* Report Form */
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
              Submit Lost Property Report
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide specific item characteristics to help depot staff cross-match recovery logs.
            </p>
          </div>

          {formError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmitReport} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Item Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Item Name & Model *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sony Wireless Earbuds (Black)"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Detailed Description & Distinguishing Marks *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Include color, brand, stickers, serial number hints, or specific seat row position..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Bus / Vehicle Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. Bus 245"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Route / Line
                </label>
                <input
                  type="text"
                  placeholder="e.g. RT-108"
                  value={route}
                  onChange={(e) => setRoute(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Approximate Date / Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. Today around 09:30 AM"
                  value={approximateTime}
                  onChange={(e) => setApproximateTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Contact Phone / Email
                </label>
                <input
                  type="text"
                  placeholder="e.g. +91 98200 12345"
                  value={contactDetails}
                  onChange={(e) => setContactDetails(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" type="button" onClick={() => setActiveTab('list')}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                {isSubmitting ? 'Registering...' : 'Register Lost Report'}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        /* Items List View */
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by report ID (e.g. LF-2026-0412), item name, or category..."
              className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="space-y-3">
            {filteredItems.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No lost property reports found"
                description="If you have misplaced an item on any municipal route, file a report to initiate custody matching across depot lost & found desks."
                actionLabel="Report Lost Item"
                onAction={() => setActiveTab('report')}
              />
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono font-bold text-xs text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">
                        {item.id}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-sans">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono text-slate-400">
                        Reported: {new Date(item.reportedDate).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <StatusBadge status={item.status} label={item.status} size="sm" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white font-sans">
                      {item.itemName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                      {item.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-3.5 h-3.5 text-purple-500" />
                      <span>{item.depotLocation}</span>
                    </div>
                    {item.vehicle && (
                      <div className="flex items-center space-x-2">
                        <Bus className="w-3.5 h-3.5 text-purple-500" />
                        <span>Vehicle: {item.vehicle} • {item.route || 'Line'}</span>
                      </div>
                    )}
                  </div>

                  {item.matchNote && (
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-300 text-xs font-sans">
                      <strong>Custody Update:</strong> {item.matchNote}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LostFoundPage;
