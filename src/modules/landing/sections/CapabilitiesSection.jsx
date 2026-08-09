import React from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';
import { CAPABILITIES_DATA } from '../../../data/landing/capabilitiesData.js';

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-12 sm:py-16 border-t border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono font-bold border border-slate-300 dark:border-slate-700">
            <Shield className="w-3.5 h-3.5 text-[#0B3D91]" />
            <span>MUNICIPAL TRANSIT SPECIFICATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            Core Service Capabilities & Standard Specifications
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Standard operating capabilities supporting passenger visibility, driver operations, municipal fleet command, and system availability.
          </p>
        </div>

        {/* Structured Government Scheme Data Table Format */}
        <div className="overflow-x-auto rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-subtle">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-bold uppercase text-[11px] font-mono">
                <th className="py-3 px-4">Capability / Subsystem</th>
                <th className="py-3 px-4">Classification</th>
                <th className="py-3 px-4">Operational Purpose & Technical Description</th>
                <th className="py-3 px-4 text-right">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {CAPABILITIES_DATA.map((item) => {
                const Icon = item.icon;
                return (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4 text-[#0B3D91] dark:text-sky-400 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-600 dark:text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[11px]">
                        {item.tag}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 leading-relaxed max-w-xl">
                      {item.description}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-700 dark:text-emerald-400">
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
