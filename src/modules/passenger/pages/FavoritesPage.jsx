import React, { useState } from 'react';
import { Star, Bus, MapPin, ArrowRight, Trash2, ShieldCheck, Clock } from 'lucide-react';
import { favoriteService } from '../../../services/passenger/favoriteService.js';
import { OccupancyIndicator } from '../components/OccupancyIndicator.jsx';
import { EtaDisplay } from '../components/EtaDisplay.jsx';
import { EmptyState } from '../../../components/ui/EmptyState.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function FavoritesPage({ onNavigate }) {
  const [favorites, setFavorites] = useState(favoriteService.getFavorites());
  const [toast, setToast] = useState(null);

  const handleRemove = (routeId) => {
    const updated = favoriteService.removeFavoriteRoute(routeId);
    setFavorites(updated);
    setToast('Favorite route removed.');
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold mb-1 border border-amber-500/20">
            <Star className="w-3.5 h-3.5" />
            <span>PERSONAL COMMUTER SHORTCUTS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Favorite Routes & Saved Stops
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            One-tap access to your daily commutes with instant live arrival count and crowding visibility.
          </p>
        </div>
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold border border-slate-700">
          {toast}
        </div>
      )}

      {/* Favorite Routes List */}
      {favorites.routes.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Saved Commute Corridors ({favorites.routes.length})
            </h3>
            <span className="text-xs font-mono text-slate-400">Synced Across Your Session</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favorites.routes.map((fav) => (
              <div
                key={fav.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-transit-500 text-white font-mono font-bold text-xs">
                        {fav.routeCode}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white font-sans">{fav.name}</h4>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(fav.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      title="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {fav.origin} → {fav.destination} • {fav.frequency}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex items-center space-x-2">
                    <EtaDisplay eta={fav.eta} size="sm" />
                    <OccupancyIndicator percent={fav.occupancy} size="sm" />
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon={ArrowRight}
                    onClick={() => onNavigate && onNavigate('/passenger/live-map')}
                  >
                    Track Live
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={Star}
          title="No Favorite Routes Saved"
          description="Save frequently traveled bus lines or stations to quickly check upcoming arrival times."
          actionLabel="Explore City Routes"
          onAction={() => onNavigate && onNavigate('/passenger/routes')}
        />
      )}

      {/* Saved Bus Stops Section */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
          Saved Bus Stop Kiosks ({favorites.stops.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {favorites.stops.map((stop) => (
            <div
              key={stop.id}
              className="p-4 rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white font-sans">{stop.name}</div>
                  <span className="text-[10px] text-slate-400 font-mono">{stop.code} • {stop.zone}</span>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-transit-500">{stop.incomingNextEta}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;
