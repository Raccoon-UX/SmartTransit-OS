import React, { useState, useEffect } from 'react';
import { Clock, Route, Bus, MapPin, Star, Repeat, CheckCircle2, ChevronRight, Filter, Search, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { passengerTripHistoryService } from '../../../services/passenger/passengerTripHistoryService.js';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { RateJourneyModal } from '../components/RateJourneyModal.jsx';
import { cn } from '../../../utils/index.js';

export function TripHistoryPage({ onNavigate }) {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTripToRate, setSelectedTripToRate] = useState(null);

  useEffect(() => {
    passengerTripHistoryService.getTripHistory().then(setTrips);
  }, []);

  const handleRepeatTrip = (trip) => {
    if (onNavigate) {
      onNavigate(`/passenger/planner?from=${encodeURIComponent(trip.origin)}&to=${encodeURIComponent(trip.destination)}`);
    }
  };

  const handleRatingSubmitted = (tripId, ratingData) => {
    const updated = passengerTripHistoryService.markTripRated(tripId, ratingData);
    setTrips(updated);
  };

  const filteredTrips = trips.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.routeCode?.toLowerCase().includes(q) ||
        t.routeName?.toLowerCase().includes(q) ||
        t.origin?.toLowerCase().includes(q) ||
        t.destination?.toLowerCase().includes(q) ||
        t.vehicle?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Clock className="w-3.5 h-3.5" />
            <span>COMMUTER JOURNEY ARCHIVE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Trip History & Commute Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Review completed journeys, rate vehicle comfort & pilot conduct, or repeat frequent routes with one click.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="md"
            rightIcon={ArrowRight}
            onClick={() => onNavigate && onNavigate('/passenger/planner')}
            className="font-bold"
          >
            Plan New Journey
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center">
        <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search trips by route (RT-108), bus number, origin, or destination..."
          className="w-full bg-transparent text-xs text-slate-900 dark:text-white focus:outline-none"
        />
      </div>

      {/* Trips List */}
      <div className="space-y-4">
        {filteredTrips.length === 0 ? (
          <EmptyState
            icon={Clock}
            title="No past trips recorded"
            description="Your completed commuter journeys will appear here with stop breakdowns, durations, and rating options."
            actionLabel="Plan a Trip"
            onAction={() => onNavigate && onNavigate('/passenger/planner')}
          />
        ) : (
          filteredTrips.map((trip) => (
            <div
              key={trip.id}
              className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all space-y-4"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-xl bg-transit-500/10 text-transit-600 dark:text-transit-400 border border-transit-500/20">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <strong className="font-extrabold text-sm text-slate-900 dark:text-white font-sans">
                        {trip.routeCode} • {trip.routeName}
                      </strong>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                        {trip.vehicle}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {trip.date} • {trip.startTime} → {trip.endTime} ({trip.duration})
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <StatusBadge status={trip.status} label={trip.status} size="sm" />
                </div>
              </div>

              {/* Origin to Destination Route Path */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Boarded At (Origin)</span>
                  <div className="font-bold text-slate-900 dark:text-white truncate">{trip.origin}</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Alighted At (Destination)</span>
                  <div className="font-bold text-transit-600 dark:text-transit-400 truncate">{trip.destination}</div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  <span>Driver: <strong className="text-slate-700 dark:text-slate-300 font-sans">{trip.driverName}</strong></span>
                  <span>•</span>
                  <span>{trip.stopsCount} stops completed</span>
                </div>

                <div className="flex items-center space-x-2">
                  {trip.rated ? (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>Rated ({trip.rating?.overall || 5}/5)</span>
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={Star}
                      onClick={() => setSelectedTripToRate(trip)}
                      className="text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/10 font-bold"
                    >
                      Rate Trip
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={Repeat}
                    onClick={() => handleRepeatTrip(trip)}
                    className="font-bold"
                  >
                    Repeat Trip
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rating Modal */}
      <RateJourneyModal
        trip={selectedTripToRate}
        isOpen={!!selectedTripToRate}
        onClose={() => setSelectedTripToRate(null)}
        user={user}
        onRatingSubmitted={handleRatingSubmitted}
      />
    </div>
  );
}

export default TripHistoryPage;
