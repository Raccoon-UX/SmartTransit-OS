import React, { useState } from 'react';
import { Star, X, CheckCircle2, HeartHandshake, Bus, Sparkles } from 'lucide-react';
import { passengerFeedbackService } from '../../../services/passenger/passengerFeedbackService.js';
import { Button } from '../../../components/ui/Button.jsx';
import { useToast } from '../../../components/ui/Toast.jsx';
import { cn } from '../../../utils/index.js';

const RATING_DIMENSIONS = [
  { key: 'overall', label: 'Overall Experience' },
  { key: 'driver', label: 'Driver / Pilot Conduct' },
  { key: 'cleanliness', label: 'Vehicle Cleanliness & Hygiene' },
  { key: 'punctuality', label: 'Punctuality & Schedule Reliability' },
  { key: 'comfort', label: 'Seat Comfort & AC Temperature' },
  { key: 'safety', label: 'Safety & Onboard Security' },
];

export function RateJourneyModal({ isOpen, onClose, trip, user, onRatingSubmitted }) {
  const { addToast } = useToast();
  const [ratings, setRatings] = useState({
    overall: 5,
    driver: 5,
    cleanliness: 5,
    punctuality: 5,
    comfort: 5,
    safety: 5,
  });
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !trip) return null;

  const handleStarClick = (dimKey, score) => {
    setRatings((prev) => ({
      ...prev,
      [dimKey]: score,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await passengerFeedbackService.submitJourneyFeedback({
        journeyId: trip.journeyId || trip.id,
        tripId: trip.id,
        vehicle: trip.vehicle || trip.busNumber || 'Bus 245',
        route: trip.routeCode || trip.route || 'RT-108',
        passengerId: user?.id || 'usr-pass-001',
        passengerName: user?.name || 'Aarav Sharma',
        ratings,
        comment,
      });

      setIsSuccess(true);
      addToast('Thank you for rating your commute!', 'success');
      if (onRatingSubmitted) {
        onRatingSubmitted(trip.id, { ...ratings, comment });
      }
    } catch (err) {
      console.error('[RateJourneyModal] Feedback submission error:', err);
      addToast('Failed to save rating. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setComment('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm text-left">
      <div className="relative max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
              <Star className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-sans tracking-wide text-white">
                RATE YOUR COMMUTE
              </h3>
              <p className="text-[11px] text-white/90 font-mono">
                {trip.routeCode || trip.route || 'RT-108'} • {trip.vehicle || trip.busNumber || 'Bus 245'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4 font-sans">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-lg text-slate-900 dark:text-white">Feedback Logged!</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your rating helps municipal transit operations improve fleet comfort, scheduling and pilot training.
              </p>
            </div>
            <Button variant="primary" size="md" onClick={handleClose} fullWidth className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Please rate your experience across standard service categories:
            </p>

            <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
              {RATING_DIMENSIONS.map((dim) => (
                <div key={dim.key} className="pt-2.5 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{dim.label}</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(dim.key, star)}
                        className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        title={`${star} star`}
                      >
                        <Star
                          className={cn(
                            'w-4 h-4 transition-colors',
                            star <= ratings[dim.key]
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 dark:text-slate-700'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Optional Comment */}
            <div className="space-y-1.5 pt-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                Additional Comments (Optional)
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share any highlights or suggestions about your ride..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none font-sans"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <Button variant="outline" size="sm" type="button" onClick={handleClose} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Rating'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
