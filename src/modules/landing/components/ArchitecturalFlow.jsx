import React from 'react';
import { Radio, Server, Cpu, Smartphone, ArrowRight, Shield } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function ArchitecturalFlow({ className = '' }) {
  const nodes = [
    { id: '1', label: 'Vehicle GPS Telemetry', sub: 'Edge Sensors (2s ping)', icon: Radio },
    { id: '2', label: 'Ingestion Mesh Broker', sub: 'WebSocket / Redis Broker', icon: Server },
    { id: '3', label: 'ETA Prediction Engine', sub: 'Predictive Transit Service', icon: Cpu },
    { id: '4', label: 'Public Display Terminals', sub: 'Bus Stop Kiosks & Portal', icon: Smartphone },
  ];

  return (
    <div className={cn('p-5 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-left space-y-4 shadow-subtle', className)}>
      <div className="flex items-center justify-between pb-3 border-b border-slate-300 dark:border-slate-800">
        <div>
          <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-[#0B3D91] dark:text-sky-400">
            <Shield className="w-3.5 h-3.5" />
            <span>TECHNICAL ARCHITECTURE SPECIFICATION</span>
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-sans mt-0.5">
            End-to-End Real-Time Transit Data Pipeline
          </h3>
        </div>
        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
          Sub-50ms Pipeline
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {nodes.map((node, idx) => {
          const Icon = node.icon;
          const isLast = idx === nodes.length - 1;

          return (
            <div key={node.id} className="relative flex flex-col justify-between p-4 rounded bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[#0B3D91] dark:text-sky-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">STAGE 0{idx + 1}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white font-sans">{node.label}</h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">{node.sub}</p>
              </div>

              {!isLast && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-500 shadow-subtle">
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
