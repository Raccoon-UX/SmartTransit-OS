import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import { CAPABILITIES_DATA } from '../../../data/landing/capabilitiesData.js';
import ctaBusesBg from '../../../assets/CTA Buses.jpg';

export function CapabilitiesSection() {
  return (
    <section
      id="capabilities"
      className="relative py-16 sm:py-20 border-t border-slate-300 dark:border-slate-800 bg-slate-900 bg-cover bg-center bg-no-repeat bg-fixed text-left"
      style={{ backgroundImage: `url(${ctaBusesBg})` }}
    >
      {/* Dark Overlay Layer for Contrast */}
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-white/10 backdrop-blur-md text-sky-300 text-xs font-mono font-bold border border-white/20">
            <Shield className="w-3.5 h-3.5" />
            <span>MUNICIPAL TRANSIT SPECIFICATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-sans">
            Core Service Capabilities & Standard Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-200">
            Standard operating capabilities supporting passenger visibility, driver operations, municipal fleet command, and system availability.
          </p>
        </div>

        {/* Structured Government Scheme Data Table Format with Backdrop Blur */}
        <div className="overflow-x-auto rounded border border-slate-700 bg-slate-900/90 backdrop-blur-md shadow-panel">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-700 text-slate-200 font-bold uppercase text-[11px] font-mono">
                <th className="py-3 px-4">Capability / Subsystem</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Operational Purpose & Technical Description</th>
                <th className="py-3 px-4 text-right">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {CAPABILITIES_DATA.map((item) => {
                const Icon = item.icon;
                return (
                  <tr key={item.id} className="hover:bg-slate-800/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[11px]">
                        {item.tag}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 leading-relaxed max-w-xl">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400">
                      <span className="inline-flex items-center space-x-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Standard</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default CapabilitiesSection;
