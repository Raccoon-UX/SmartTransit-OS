import React, { useState, useEffect } from 'react';
import { X, Send, AlertCircle, Bus, Route, FileText, CheckCircle2 } from 'lucide-react';
import { passengerComplaintService } from '../../../services/passenger/passengerComplaintService.js';
import { Button } from '../../../components/ui/Button.jsx';
import { useToast } from '../../../components/ui/Toast.jsx';
import { cn } from '../../../utils/index.js';

export function ReportIssueModal({ isOpen, onClose, activeTrip, user, onComplaintSubmitted }) {
  const { addToast } = useToast();
  const categories = passengerComplaintService.getCategories();

  const [category, setCategory] = useState(categories[0]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [route, setRoute] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Auto-populate when activeTrip is available
  useEffect(() => {
    if (activeTrip && activeTrip.isActive) {
      if (activeTrip.busNumber) setVehicle(activeTrip.busNumber);
      if (activeTrip.routeCode) setRoute(`${activeTrip.routeCode} (${activeTrip.routeName || 'Active Route'})`);
    }
  }, [activeTrip]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      setError('Please provide both a subject and detailed description.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const complaint = await passengerComplaintService.submitComplaint({
        category,
        subject: subject.trim(),
        description: description.trim(),
        vehicle: vehicle.trim() || null,
        route: route.trim() || null,
        journeyId: activeTrip?.journeyId || null,
        passengerId: user?.id || 'usr-pass-001',
        passengerName: user?.name || 'Aarav Sharma',
      });

      addToast(`Complaint submitted successfully (${complaint.id})`, 'success');
      if (onComplaintSubmitted) onComplaintSubmitted(complaint);
      setSubject('');
      setDescription('');
      onClose();
    } catch (err) {
      console.error('[ReportIssueModal] Submission error:', err);
      setError(err.message || 'Failed to submit complaint. Please check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm text-left">
      <div className="relative max-w-lg w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-transit-600 to-[#0B3D91] text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-sans tracking-wide text-white">
                REPORT AN ISSUE / COMPLAINT
              </h3>
              <p className="text-[11px] text-white/80 font-mono">
                Log a verified operational complaint to municipal transit dispatch
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Category Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Complaint Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-sans focus:outline-none focus:ring-2 focus:ring-transit-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Subject Summary *
            </label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Bus 245 skipped Dahisar Stop"
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-sans focus:outline-none focus:ring-2 focus:ring-transit-500"
            />
          </div>

          {/* Vehicle & Route (Auto-populated if active trip) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Vehicle ID (Optional)
              </label>
              <input
                type="text"
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="e.g. Bus 245"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-transit-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Route / Line (Optional)
              </label>
              <input
                type="text"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                placeholder="e.g. RT-108"
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-transit-500"
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              Detailed Description *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what occurred with specific timestamps, stop locations, or circumstances..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-transit-500 resize-none font-sans"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Button variant="outline" size="sm" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="submit"
              rightIcon={Send}
              disabled={isSubmitting}
              className="bg-transit-600 hover:bg-transit-700 text-white font-bold"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
