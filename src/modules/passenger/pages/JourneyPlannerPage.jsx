import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  ArrowRight, 
  ArrowLeftRight, 
  Sparkles, 
  Clock, 
  Footprints, 
  Bus, 
  Repeat, 
  CheckCircle2, 
  AlertTriangle,
  Play,
  RotateCcw,
  Radio,
  Zap,
  GitMerge,
  Users
} from 'lucide-react';
import { journeyService } from '../../../services/passenger/journeyService.js';
import { JourneyOptionCard } from '../components/JourneyOptionCard.jsx';
import { JourneyTimeline } from '../components/JourneyTimeline.jsx';
import { JourneyRouteMap } from '../components/JourneyRouteMap.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function JourneyPlannerPage({ onNavigate }) {
  const [from, setFrom] = useState('Borivali Railway Station');
  const [to, setTo] = useState('Vashi Sector 17');
  const [preference, setPreference] = useState('best_overall'); // 'best_overall' | 'fastest' | 'fewer_transfers' | 'less_walking' | 'less_crowded'
  const [journeyResult, setJourneyResult] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeCommute, setActiveCommute] = useState(null);

  // Quick Preset Scenarios for Instant Testing
  const TEST_PRESETS = [
    {
      label: 'Borivali Stn ➔ Vashi Sec 17 (No Direct Bus)',
      from: 'Borivali Railway Station',
      to: 'Vashi Sector 17',
      desc: 'Multimodal transfer via Bus 245 + Bus 504 at Magathane Junction',
    },
    {
      label: 'Borivali Hub ➔ Andheri West (Direct Express)',
      from: 'Borivali Central Hub',
      to: 'Andheri West Exchange',
      desc: 'Direct zero-transfer express line on RT-108',
    },
    {
      label: 'City Center ➔ Tech Park (Crowd-Aware Feeder)',
      from: 'City Center Hub',
      to: 'Tech Park Station',
      desc: 'AI-prioritized low occupancy alternative route',
    },
  ];

  const handlePlan = async (origin = from, destination = to, pref = preference) => {
    setIsCalculating(true);
    const res = await journeyService.planJourney({ from: origin, to: destination, preference: pref });
    setJourneyResult(res);
    setSelectedPlanId(res?.recommendedPlanId || res?.plans?.[0]?.id);
    setIsCalculating(false);
  };

  // Initial Calculation on Mount
  useEffect(() => {
    handlePlan('Borivali Railway Station', 'Vashi Sector 17', 'best_overall');

    const unsubscribe = journeyService.subscribeActiveTrip((trip) => {
      setActiveCommute(trip);
    });

    return () => unsubscribe();
  }, []);

  const handleSwap = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    handlePlan(to, temp, preference);
  };

  const handlePresetClick = (preset) => {
    setFrom(preset.from);
    setTo(preset.to);
    handlePlan(preset.from, preset.to, preference);
  };

  const handlePreferenceChange = (newPref) => {
    setPreference(newPref);
    handlePlan(from, to, newPref);
  };

  const selectedPlan = journeyResult?.plans?.find((p) => p.id === selectedPlanId) || journeyResult?.plans?.[0];

  const handleStartJourney = (plan = selectedPlan) => {
    if (!plan) return;
    journeyService.startJourney(plan);
  };

  const handleAdvanceStep = () => {
    journeyService.advanceStep();
  };

  const handleCancelJourney = () => {
    journeyService.cancelJourney();
  };

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Top Header Masthead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-sky-400 text-xs font-mono font-bold mb-1 border border-blue-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>INTELLIGENT MULTIMODAL ROUTING ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
            Metropolitan Journey Planner
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Intelligent point-to-point journey construction with walking segments, live bus ETAs, and seamless transfer guidance.
          </p>
        </div>
      </div>

      {/* Quick Landmark Preset Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
          Quick Demo Scenarios:
        </span>
        <div className="flex flex-wrap gap-2">
          {TEST_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className={cn(
                'px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all text-left flex items-center space-x-1.5 cursor-pointer',
                from === preset.from && to === preset.to
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              )}
            >
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Input Box & Preferences */}
      <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePlan();
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Origin Field */}
            <div className="md:col-span-5 space-y-1">
              <label className="text-[11px] font-semibold uppercase font-mono text-slate-500 block">
                Origin (Point A)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
                <input
                  type="text"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="Enter starting landmark or station..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#0B3D91]"
                  required
                />
              </div>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-2 flex justify-center pt-5">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors shadow-xs cursor-pointer"
                title="Swap Origin & Destination"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Field */}
            <div className="md:col-span-5 space-y-1">
              <label className="text-[11px] font-semibold uppercase font-mono text-slate-500 block">
                Destination (Point B)
              </label>
              <div className="relative">
                <Navigation className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rose-600" />
                <input
                  type="text"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="Enter destination terminal or stop..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-[#0B3D91]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Preference Selection Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400 text-[10px] uppercase font-bold pr-1">Routing Mode:</span>
              {[
                { id: 'best_overall', label: 'Best Overall', icon: Sparkles },
                { id: 'fastest', label: 'Fastest', icon: Zap },
                { id: 'fewer_transfers', label: 'Fewest Transfers', icon: GitMerge },
                { id: 'less_walking', label: 'Minimal Walking', icon: Footprints },
                { id: 'less_crowded', label: 'Less Crowded (AI)', icon: Users },
              ].map((m) => {
                const IconComponent = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handlePreferenceChange(m.id)}
                    className={cn(
                      'inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all text-xs cursor-pointer',
                      preference === m.id
                        ? 'bg-[#0B3D91] text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={isCalculating}
              rightIcon={ArrowRight}
              className="shadow-xs font-mono font-bold"
            >
              Find Best Journey
            </Button>
          </div>
        </form>
      </div>

      {/* Route Status Banner */}
      {journeyResult && (
        <div
          className={cn(
            'p-4 rounded-2xl border text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2',
            journeyResult.isDirectAvailable
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-300'
              : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-300'
          )}
        >
          <div className="flex items-center space-x-2.5">
            {journeyResult.isDirectAvailable ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <Repeat className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <div>
              <strong>
                {journeyResult.isDirectAvailable
                  ? 'DIRECT ROUTE AVAILABLE'
                  : 'DIRECT BUS UNAVAILABLE — MULTIMODAL ALTERNATIVE CONSTRUCTED'}
              </strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans mt-0.5">
                {journeyResult.isDirectAvailable
                  ? 'Single vehicle direct transit line found from departure terminal.'
                  : 'Calculated optimal transfer journey via central transit interchange to avoid commuter dead-ends.'}
              </p>
            </div>
          </div>

          <span className="text-[11px] font-bold self-start sm:self-auto">
            {journeyResult.plans?.length || 0} Journey Options Computed
          </span>
        </div>
      )}

      {/* Live Active Commute Progress Simulation Card */}
      {activeCommute?.isActive && activeCommute?.activePlan && (
        <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <strong className="text-sm text-emerald-400 font-bold uppercase">
                ACTIVE JOURNEY SIMULATION IN PROGRESS
              </strong>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleAdvanceStep}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors shadow-xs cursor-pointer flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Advance Step ➔</span>
              </button>
              <button
                type="button"
                onClick={handleCancelJourney}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-colors border border-slate-700 cursor-pointer"
              >
                End Trip
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase block">Current Phase</span>
              <strong className="text-sm text-amber-400 font-bold block mt-0.5">
                {activeCommute.stepState}
              </strong>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase block">Active Instruction</span>
              <p className="text-[11px] text-white font-sans font-bold truncate mt-0.5">
                {activeCommute.activePlan.segments?.[activeCommute.currentSegmentIndex]?.title || 'En route'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase block">Step Counter</span>
              <strong className="text-sm text-white font-bold block mt-0.5">
                Step {activeCommute.currentSegmentIndex + 1} of {activeCommute.activePlan.segments?.length || 1}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Calculated Journey Options Cards Grid */}
      {journeyResult?.plans && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-sans">
              Suggested Travel Plans ({journeyResult.plans.length} Options Ranked)
            </h3>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              Ranked by {preference.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {journeyResult.plans.map((plan) => (
              <JourneyOptionCard
                key={plan.id}
                plan={plan}
                isSelected={selectedPlanId === plan.id}
                onSelectOption={() => setSelectedPlanId(plan.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Split Details Section: Left Vertical Timeline + Right Interactive Map */}
      {selectedPlan && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          {/* Left Column (7 Cols): Step-by-step Detailed Vertical Timeline */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-sans">
                Detailed Itinerary & Transfer Guidance
              </h3>
              <Button
                variant="primary"
                size="sm"
                rightIcon={Play}
                onClick={() => handleStartJourney(selectedPlan)}
                className="font-mono font-bold shadow-xs"
              >
                Start This Journey
              </Button>
            </div>

            <JourneyTimeline plan={selectedPlan} />
          </div>

          {/* Right Column (5 Cols): Multimodal Route Map Canvas */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-sans">
              Transit Corridor Map
            </h3>
            <JourneyRouteMap plan={selectedPlan} />
          </div>
        </div>
      )}
    </div>
  );
}

export default JourneyPlannerPage;
