import React, { useState } from 'react';
import { Bus, Radio } from 'lucide-react';
import { fleetService } from '../../../services/admin/fleetService.js';
import { FleetTable } from '../components/FleetTable.jsx';

export function FleetPage({ onNavigate }) {
  const [fleet] = useState(fleetService.getFleet());

  return (
    <div className="space-y-6 text-left">
      <div className="pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
          <Bus className="w-3.5 h-3.5" /><span>FLEET OPERATIONS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">Fleet Management</h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Monitor, search, and manage all {fleet.length} vehicles in the metropolitan transit fleet roster.</p>
      </div>
      <FleetTable fleet={fleet} onSelectBus={(bus) => onNavigate(`/admin/fleet/${bus.id}`)} />
    </div>
  );
}
export default FleetPage;
