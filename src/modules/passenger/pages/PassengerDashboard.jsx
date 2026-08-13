import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { Search, MapPin, Route, Compass, Star, Bell, Bus, ArrowRight, ShieldCheck, Activity, CheckCircle2 } from 'lucide-react';
import { transitService } from '../../../services/passenger/transitService.js';
import { favoriteService } from '../../../services/passenger/favoriteService.js';
import { journeyService } from '../../../services/passenger/journeyService.js';
import { passengerNotificationService } from '../../../services/passenger/passengerNotificationService.js';
import { BusCard } from '../../../components/cards/BusCard.jsx';
import { AlertCard } from '../../../components/cards/AlertCard.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { ActiveTripCard } from '../components/ActiveTripCard.jsx';
import { OccupancyIndicator } from '../components/OccupancyIndicator.jsx';
import { EtaDisplay } from '../components/EtaDisplay.jsx';
import { cn } from '../../../utils/index.js';

export function PassengerDashboard({ onNavigate }) {
  const { user } = useAuth();
  const [buses, setBuses] = useState([]);
  const [stops, setStops] = useState([]);
  const [favorites, setFavorites] = useState(favoriteService.getFavorites());
  const [activeTrip, setActiveTrip] = useState(journeyService.getActiveTrip());
  const [alerts, setAlerts] = useState(passengerNotificationService.getAlerts());
  const [searchQuery, setSearchQuery] = useState('');

  const userName = user?.name || 'Aarav Sharma';

  useEffect(() => {
    transitService.getLiveBuses().then(setBuses);
    transitService.getNearbyStops().then(setStops);

    const unsubscribeBuses = transitService.subscribeToLiveBuses(setBuses);
    const unsubscribeTrip = journeyService.subscribeActiveTrip(setActiveTrip);

    const ticker = setInterval(() => {
      transitService.simulateTick();
    }, 2500);

    return () => {
      unsubscribeBuses();
      unsubscribeTrip();
      clearInterval(ticker);
    };
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(`/passenger/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleRemoveFavorite = (routeId) => {
    const updated = favoriteService.removeFavoriteRoute(routeId);
    setFavorites(updated);
  };

  const handleCancelActiveTrip = () => {
    journeyService.cancelJourney();
  };

  return (
    <div className="space-y-8 text-left">
      {/* Top Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
            <span>METROPOLITAN COMMUTER HUB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Good morning, {userName.split(' ')[0]}.
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening across your city transit network.
          </p>
        </div>

        {/* Quick Mode Indicator */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-slate-300">
          <span className="p-2 rounded-xl bg-slate-100 dark:bg-navy-800 text-emerald-500 font-bold flex items-center space-x-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Live Sync Active</span>
          </span>
        </div>
      </div>

      {/* A. Quick Search Interface ("Where are you going?") */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-transit-500/10 via-cyan-500/10 to-transparent border border-transit-500/30 shadow-sm space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white font-sans">
          Where are you going today?
        </h2>
        <form onSubmit={handleQuickSearch} className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by bus number (e.g. 245), route (RT-108), station, or destination..."
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2',
                'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-transit-500'
              )}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            rightIcon={ArrowRight}
            className="w-full sm:w-auto shadow-glow font-bold"
          >
            Find Transit
          </Button>
        </form>
      </div>

      {/* D. Active Trip Experience (If active) or Empty State */}
      {activeTrip && activeTrip.isActive ? (
        <ActiveTripCard
          trip={activeTrip}
          onCancelTrip={handleCancelActiveTrip}
          onOpenLiveMap={() => onNavigate && onNavigate('/passenger/live-map')}
        />
      ) : (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold uppercase text-slate-400">Journey Status</div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">No Active Commute in Progress</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Plan your next trip to receive live stop-by-stop progression, arrival alarms, and crowd alerts.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            leftIcon={Compass}
            onClick={() => onNavigate && onNavigate('/passenger/planner')}
          >
            Plan a Journey
          </Button>
        </div>
      )}

      {/* Main Grid: B. Nearby Transit & C. Favorite Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: B. Nearby Transit Stops & Incoming Buses */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-transit-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
                Nearby Transit Stops & Incoming Fleet
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('/passenger/live-map')}
              className="text-xs font-mono font-bold text-transit-500 hover:text-transit-600"
            >
              Open Live Map →
            </button>
          </div>

          <div className="space-y-3">
            {stops.slice(0, 2).map((stop) => (
              <div
                key={stop.id}
                className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white font-sans">{stop.name}</div>
                    <span className="text-[10px] font-mono text-slate-400">{stop.code} • {stop.zone}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-navy-800 text-transit-500 border border-slate-200 dark:border-slate-700">
                    {stop.shelterType}
                  </span>
                </div>

                <div className="space-y-2">
                  {(stop.incomingBuses || []).map((busItem, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded bg-transit-500 text-white font-mono font-bold text-[10px]">
                          {busItem.busNumber}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">{busItem.destination}</div>
                          <span className="text-[10px] text-slate-400 font-mono">Line {busItem.route}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-right">
                        <EtaDisplay eta={busItem.eta} size="sm" />
                        <OccupancyIndicator percent={busItem.occupancy} size="sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: C. Favorite Routes & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          {/* C. Favorite Routes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
                  Favorite Routes
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('/passenger/favorites')}
                className="text-xs font-mono font-bold text-transit-500 hover:text-transit-600"
              >
                Manage ({favorites?.routes?.length || 0})
              </button>
            </div>

            <div className="space-y-2.5">
              {(favorites?.routes || []).map((fav) => (
                <div
                  key={fav.id}
                  className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
                >
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{fav.name}</div>
                    <span className="text-[10px] text-slate-400 font-mono">Line {fav.routeCode} • {fav.frequency}</span>
                    <div className="mt-1 flex items-center space-x-2">
                      <EtaDisplay eta={fav.eta} size="sm" />
                      <OccupancyIndicator percent={fav.occupancy} size="sm" />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveFavorite(fav.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-xs"
                    title="Remove from favorites"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* F. Quick Action Bar */}
          <div className="p-5 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="text-xs font-mono font-bold uppercase text-slate-400">Quick Shortcuts</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Button
                variant="outline"
                size="sm"
                leftIcon={MapPin}
                onClick={() => onNavigate && onNavigate('/passenger/live-map')}
              >
                Live Map
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={Compass}
                onClick={() => onNavigate && onNavigate('/passenger/planner')}
              >
                Journey Planner
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={Route}
                onClick={() => onNavigate && onNavigate('/passenger/routes')}
              >
                City Routes
              </Button>
              <Button
                variant="outline"
                size="sm"
                leftIcon={Star}
                onClick={() => onNavigate && onNavigate('/passenger/favorites')}
              >
                Favorites
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* E. Service Alerts Ticker */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-rose-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Active Transit Alerts & Advisory
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('/passenger/notifications')}
            className="text-xs font-mono font-bold text-transit-500 hover:text-transit-600"
          >
            View All ({alerts.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {alerts.slice(0, 2).map((alert) => (
            <AlertCard
              key={alert.id}
              type={alert.type}
              severity={alert.severity}
              title={alert.title}
              description={alert.message}
              timestamp={alert.timestamp}
              affectedRoutes={alert.affectedRoutes}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PassengerDashboard;
