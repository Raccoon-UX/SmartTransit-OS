import React from 'react';
import { Server, Activity, Database, HardDrive, ShieldCheck, Wifi, Cpu, Terminal, ArrowRight } from 'lucide-react';
import { Sparkline } from '../../../components/dataviz/Sparkline.jsx';
import { StatusBadge } from '../../../components/ui/Badge.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function SocTelemetryWall({ onExploreSoc, className = '' }) {
  const socNodes = [
    { label: 'Cluster Server Health', value: '99.98%', sub: 'High Availability', status: 'ONLINE', icon: Cpu },
    { label: 'API Response Latency', value: '41 ms', sub: 'Sub-50ms Gateway', status: 'LIVE', icon: Activity },
    { label: 'Connected Active Users', value: '8,451', sub: 'Peak Commuter Mesh', status: 'ACTIVE', icon: Wifi },
    { label: 'GPS Ingestion Rate', value: '9,842/s', sub: 'Zero Packet Loss', status: 'LIVE', icon: Server },
    { label: 'Database & Redis Cluster', value: 'HEALTHY', sub: 'Sub-5ms Memory Cache', status: 'ONLINE', icon: Database },
    { label: 'Automated Snapshots', value: 'COMPLETED', sub: 'Multi-Region Backup', status: 'RESOLVED', icon: HardDrive },
    { label: 'Security & Access Audits', value: 'NORMAL', sub: 'Zero Critical Incidents', status: 'RESOLVED', icon: ShieldCheck },
    { label: 'Core Platform Engine', value: 'LIVE', sub: 'Real-Time Telemetry', status: 'LIVE', icon: Terminal },
  ];

  return (
    <div
      className={cn(
        'p-6 sm:p-8 rounded-3xl bg-navy-900/90 border border-slate-700/80 shadow-2xl text-left text-white space-y-6 relative overflow-hidden',
        className
      )}
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-transit-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800 relative z-10">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono font-bold mb-1 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 telemetry-live" />
            <span>SOC COMMAND TELEMETRY WALL</span>
          </div>
          <h3 className="text-xl font-bold font-sans">Municipal System Operations Center</h3>
        </div>

        {onExploreSoc && (
          <Button variant="primary" size="sm" rightIcon={ArrowRight} onClick={onExploreSoc}>
            Explore Operations Center
          </Button>
        )}
      </div>

      {/* 8-Tile Telemetry Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {socNodes.map((node, idx) => {
          const Icon = node.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-navy-950/80 border border-slate-800 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-slate-800/80 text-transit-400">
                  <Icon className="w-4 h-4" />
                </div>
                <StatusBadge status={node.status} size="sm" />
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">{node.label}</span>
                <div className="text-lg font-extrabold font-mono text-white tracking-tight mt-0.5">
                  {node.value}
                </div>
                <span className="text-[11px] text-slate-400 font-mono block mt-0.5">{node.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Ingestion Wave Graph */}
      <div className="p-5 rounded-2xl bg-navy-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div className="space-y-1">
          <div className="text-xs font-mono text-slate-400 uppercase font-bold">
            Simulated Global Ingestion Throughput (30s Window)
          </div>
          <div className="text-sm font-bold text-emerald-400 font-mono">
            Peak: 14,280 msgs/s • Mean: 9,842 msgs/s • Latency: 41ms
          </div>
        </div>

        <div className="w-full sm:w-64 h-10">
          <Sparkline data={[8200, 9100, 8900, 11400, 12800, 14280, 13900, 14100]} color="#10b981" height={40} width={250} />
        </div>
      </div>
    </div>
  );
}

export default SocTelemetryWall;
