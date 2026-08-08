import React from 'react';
import { Radio, Server, Cpu, Smartphone, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function ArchitecturalFlow({ className = '' }) {
  const nodes = [
    { id: '1', label: 'Vehicle GPS & Telemetry', sub: 'Edge Sensors (2s ping)', icon: Radio, color: 'text-transit-500 bg-transit-500/10 border-transit-500/30' },
    { id: '2', label: 'Real-Time Ingestion Mesh', sub: 'Redis / WebSocket Broker', icon: Server, color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/30' },
    { id: '3', label: 'ETA & Occupancy Intelligence', sub: 'Predictive Transit Engine', icon: Cpu, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/30' },
    { id: '4', label: 'Passenger & Authority Screens', sub: 'Digital Bus Stops & Web Apps', icon: Smartphone, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
  ];

  return (
    <div className={cn('p-6 sm:p-8 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm text-left', className)}>
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800/80">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase text-transit-500 tracking-wider">
            Architecture Topology
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-sans">
            End-to-End Real-Time Transit Data Flow
          </h3>
        </div>
        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
          Sub-50ms Pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
        {nodes.map((node, idx) => {
          const Icon = node.icon;
          const isLast = idx === nodes.length - 1;

          return (
            <div key={node.id} className="relative flex flex-col justify-between p-5 rounded-2xl bg-slate-50 dark:bg-navy-850 border border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={cn('p-2.5 rounded-xl border', node.color)}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">STAGE 0{idx + 1}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1 font-sans">{node.label}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{node.sub}</p>
              </div>

              {!isLast && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-white dark:bg-navy-900 border border-slate-300 dark:border-slate-700 text-slate-400 shadow-sm">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ArchitecturalFlow;
