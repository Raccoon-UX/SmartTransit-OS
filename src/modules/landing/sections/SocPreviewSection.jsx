import React from 'react';
import { Terminal, ShieldCheck } from 'lucide-react';
import { SocTelemetryWall } from '../components/SocTelemetryWall.jsx';
import { cn } from '../../../utils/index.js';

export function SocPreviewSection({ onExploreSoc }) {
  return (
    <section id="soc" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>OPERATIONAL COMMAND MESH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            One Control Center for the Entire Digital Transit System.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            Monitor GPS streaming packet throughput, API latency walls, database health, and system diagnostic audits in real time.
          </p>
        </div>

        {/* Reusable SOC Telemetry Wall */}
        <SocTelemetryWall onExploreSoc={onExploreSoc} />
      </div>
    </section>
  );
}

export default SocPreviewSection;
