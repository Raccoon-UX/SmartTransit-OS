import React, { useState } from 'react';
import { Compass, MapPin, Navigation, Clock, ArrowRight, ShieldCheck, Footprints, Bus, Sparkles } from 'lucide-react';
import { journeyService } from '../../../services/passenger/journeyService.js';
import { JourneyOptionCard } from '../components/JourneyOptionCard.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function JourneyPlannerPage({ onNavigate }) {
  const [from, setFrom] = useState('Borivali Central Hub');
  const [to, setTo] = useState('Andheri West Exchange');
  const [preference, setPreference] = useState('fastest'); // 'fastest' | 'fewer_transfers' | 'less_walking'
  const [plans, setPlans] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState('jp-opt-1');
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async (e) => {
    e?.preventDefault();
    setIsCalculating(true);
    const results = await journeyService.planJourney({ from, to, preference });
    setPlans(results);
    setSelectedPlanId(results[0]?.id || 'jp-opt-1');
    setIsCalculating(false);
  };

  const handleStartJourney = (planId) => {
    journeyService.startJourney(planId);
    if (onNavigate) {
      onNavigate('/passenger');
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold mb-1 border border-transit-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>METROPOLITAN TRIP PLANNER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Intelligent Journey Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Calculate multi-hop bus connections with real-time crowd density awareness and walking countdowns.
          </p>
        </div>
      </div>

      {/* Input Form & Preference Selection */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase font-mono text-slate-500">Origin (From)</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-transit-500" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Enter starting station or bus stop..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-transit-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase font-mono text-slate-500">Destination (To)</label>
              <div className="relative">
                <Navigation className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Enter destination terminal or stop..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border text-sm bg-slate-50 dark:bg-navy-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-transit-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Preference Selection Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400 text-[10px] uppercase font-bold pr-1">Routing Mode:</span>
              {[
                { id: 'fastest', label: 'Fastest Transit' },
                { id: 'fewer_transfers', label: 'Fewer Transfers' },
                { id: 'less_walking', label: 'Minimal Walking' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPreference(m.id)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl font-bold transition-colors',
                    preference === m.id
                      ? 'bg-transit-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400 hover:text-white'
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isCalculating}
              rightIcon={ArrowRight}
              className="shadow-glow"
            >
              Calculate Routes
            </Button>
          </div>
        </form>
      </div>

      {/* Calculated Journey Options */}
      {plans && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Suggested Travel Plans ({plans.length} Options Available)
            </h3>
            <span className="text-xs font-mono text-emerald-500 font-bold">Optimized for Commuter Comfort</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <JourneyOptionCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlanId === plan.id}
                onSelectOption={() => handleStartJourney(plan.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default JourneyPlannerPage;
