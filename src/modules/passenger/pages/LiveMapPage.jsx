import React, { useState } from 'react';
import { MapPin, Navigation, Radio, RotateCcw, Filter, Star, Sparkles } from 'lucide-react';
import { LiveTransitMap } from '../components/LiveTransitMap.jsx';
import { favoriteService } from '../../../services/passenger/favoriteService.js';
import { Button } from '../../../components/ui/Button.jsx';

export function LiveMapPage({ onNavigate }) {
  const [favoriteSuccess, setFavoriteSuccess] = useState(null);

  const handleAddToFavorites = (bus) => {
    favoriteService.addFavoriteRoute({
      id: bus.routeId,
      routeCode: bus.routeId,
      busNumber: bus.busNumber,
      origin: bus.origin,
      destination: bus.destination,
      eta: bus.eta,
      occupancy: bus.occupancyPercent,
    });
    setFavoriteSuccess(`Saved ${bus.busNumber} (${bus.routeId}) to your favorites.`);
    setTimeout(() => setFavoriteSuccess(null), 3000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold mb-1 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 telemetry-live" />
            <span>LIVE METROPOLITAN FLEET VISUALIZER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Live City Transit Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Track active buses with real-time GPS telemetry, stop arrival countdowns, and crowding visibility.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate && onNavigate('/passenger/planner')}
          >
            Plan Journey from Map
          </Button>
        </div>
      </div>

      {favoriteSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold border border-emerald-500/30">
          ✓ {favoriteSuccess}
        </div>
      )}

      {/* AI Predictive ETA Banner */}
      <div className="p-3 rounded-2xl bg-transit-500/10 border border-transit-500/20 text-xs font-mono flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-transit-500 shrink-0" />
          <span className="text-slate-700 dark:text-slate-200">
            <strong>AI PREDICTIVE ETA:</strong> Bus 245 predicted arrival at Magathane Junction in <strong>5 min</strong> (91% High Confidence).
          </span>
        </div>
        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-[10px] shrink-0">
          AI ENHANCED
        </span>
      </div>

      {/* Main Large Live Transit Map Component */}

      <LiveTransitMap
        onAddToFavorites={handleAddToFavorites}
        onSelectBus={(bus) => {
          console.log('Selected live bus:', bus.busNumber);
        }}
      />
    </div>
  );
}

export default LiveMapPage;
