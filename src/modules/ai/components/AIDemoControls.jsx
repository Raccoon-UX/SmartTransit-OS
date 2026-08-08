import React from 'react';
import { Sliders, RefreshCw, AlertCircle, Users, Radio, Cpu, RotateCcw } from 'lucide-react';
import { Button } from '../../../components/ui/Button.jsx';
import { aiEngine } from '../../../services/ai/aiEngine.js';


export function AIDemoControls({ isSimulationActive = false, activeType = null }) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-700 shadow-xl space-y-4 text-left">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-sans">AI Demo Simulation Controls</h4>
            <p className="text-[11px] text-slate-400 font-mono">Trigger simulated telemetry anomalies to demonstrate AI adaptation</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-bold border border-amber-500/30">
          {isSimulationActive ? `SIMULATION: ${activeType}` : 'BASELINE AI ACTIVE'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono font-bold">
        <Button
          variant="outline"
          size="sm"
          leftIcon={Radio}
          onClick={() => aiEngine.triggerSimulateDelay()}
          className="text-amber-300 border-slate-700 hover:bg-slate-800"
        >
          Simulate Delay
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={Users}
          onClick={() => aiEngine.triggerSimulateCrowdSurge()}
          className="text-amber-300 border-slate-700 hover:bg-slate-800"
        >
          Crowd Surge
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={AlertCircle}
          onClick={() => aiEngine.triggerSimulateGpsAnomaly()}
          className="text-amber-300 border-slate-700 hover:bg-slate-800"
        >
          GPS Dropout
        </Button>
        <Button
          variant="outline"
          size="sm"
          leftIcon={Cpu}
          onClick={() => aiEngine.triggerSimulateApiDegradation()}
          className="text-amber-300 border-slate-700 hover:bg-slate-800"
        >
          API Spike
        </Button>
        <Button
          variant="primary"
          size="sm"
          leftIcon={RotateCcw}
          onClick={() => aiEngine.resetSimulation()}
          className="col-span-2 sm:col-span-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
        >
          Reset AI
        </Button>
      </div>
    </div>
  );
}

export default AIDemoControls;
