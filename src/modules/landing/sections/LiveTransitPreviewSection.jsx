import React from 'react';
import { Bus, Clock, Activity, CheckCircle2, Navigation } from 'lucide-react';
import { LiveFleetWidget } from '../components/LiveFleetWidget.jsx';
import { BusCard } from '../../../components/cards/BusCard.jsx';
import { RouteCard } from '../../../components/cards/RouteCard.jsx';
import { cn } from '../../../utils/index.js';

export function LiveTransitPreviewSection() {
  return (
    <section className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-2 border border-transit-500/20">
            <Activity className="w-3.5 h-3.5" />
            <span>REAL-TIME METROPOLITAN OVERVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Your City, In Real Time.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            Live fleet locations, route congestion metrics, and passenger occupancy indicators streamed synchronously across the city transit grid.
          </p>
        </div>

        {/* 4 KPI Metric Cards */}
        <LiveFleetWidget />

        {/* Live Active Cards Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <BusCard
            busNumber="Bus 245"
            routeCode="RT-108"
            origin="Borivali Central Hub"
            destination="Andheri West Exchange"
            eta="2 mins"
            occupancyPercent={78}
            occupancyStatus="MODERATE"
            status="LIVE"
            nextStop="Western Highway Exchange (BST-104)"
          />

          <RouteCard
            routeCode="RT-204"
            routeName="Airport Superfast Highway Link"
            stopsCount={10}
            frequency="Every 12 mins"
            firstBus="05:00 AM"
            lastBus="01:30 AM"
            activeBuses={8}
            status="ACTIVE"
          />
        </div>
      </div>
    </section>
  );
}

export default LiveTransitPreviewSection;
