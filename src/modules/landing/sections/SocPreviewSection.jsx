import React from 'react';
import { Terminal, Shield } from 'lucide-react';
import { SocTelemetryWall } from '../components/SocTelemetryWall.jsx';

export function SocPreviewSection({ onExploreSoc }) {
  return (
    <section id="soc" className="py-12 sm:py-16 border-t border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold border border-slate-300 dark:border-slate-700">
            <Terminal className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>SYSTEM OPERATIONS CENTER (SOC)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Centralized Operational Telemetry NOC
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Real-time monitoring of GPS telemetry ingestion rates, API response latencies, cluster database health, and automated system security audits.
          </p>
        </div>

        {/* Flat NOC Telemetry Wall */}
        <SocTelemetryWall onExploreSoc={onExploreSoc} />
      </div>
    </section>
  );
}

export default SocPreviewSection;
