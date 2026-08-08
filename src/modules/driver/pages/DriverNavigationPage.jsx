import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Bus, Radio, ArrowLeft, RotateCcw } from 'lucide-react';
import { tripService } from '../../../services/driver/tripService.js';
import { navigationService } from '../../../services/driver/navigationService.js';
import { DriverMap } from '../components/DriverMap.jsx';
import { NextStopCard } from '../components/NextStopCard.jsx';
import { RouteTimeline } from '../../passenger/components/RouteTimeline.jsx';

export function DriverNavigationPage({ onNavigate }) {
  const [tripState, setTripState] = useState(tripService.getTripState());
  const [stops, setStops] = useState([]);

  useEffect(() => {
    const unsub = tripService.subscribeTrip(setTripState);
    navigationService.getRouteStops().then(setStops);
    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono font-bold mb-1 border border-cyan-500/20">
            <Navigation className="w-3.5 h-3.5" />
            <span>DRIVER ROUTE GUIDANCE HUD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Glanceable Navigation & Waypoints
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            High-contrast visual route path guidance optimized for operational safety and minimum distraction.
          </p>
        </div>
      </div>

      {/* Prominent Next Stop Banner */}
      <NextStopCard
        nextStopName={tripState.nextStop}
        nextStopCode="BST-048"
        eta={tripState.nextStopEta}
        distance={tripState.nextStopDistance}
        waitingPassengers={tripState.nextStopWaiting}
      />

      {/* Large High-Contrast Route Guidance Map */}
      <DriverMap
        busNumber={tripState.busNumber}
        routeCode={tripState.routeCode}
        currentStop={tripState.currentStop}
        nextStop={tripState.nextStop}
        tripProgress={tripState.progressPercent}
        coordinates={tripState.gpsCoordinates}
      />

      {/* Route Stop Progression Sequence */}
      <div className="p-6 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
            Line {tripState.routeCode} Waypoint Sequence ({stops.length} Stops)
          </h3>
          <span className="text-xs font-mono text-emerald-500 font-bold">● Active Route Guidance</span>
        </div>

        <RouteTimeline stops={stops} activeIndex={2} />
      </div>
    </div>
  );
}

export default DriverNavigationPage;
