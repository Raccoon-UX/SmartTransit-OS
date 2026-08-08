import React from 'react';
import { MapPin, CheckCircle2, Clock, Navigation } from 'lucide-react';
import { cn } from '../../../utils/index.js';

export function RouteTimeline({ stops = [], activeIndex = 2, className = '' }) {
  if (!stops.length) return null;

  return (
    <div className={cn('space-y-3 relative text-left', className)}>
      {stops.map((stop, idx) => {
        const isPassed = stop.isPassed || idx < activeIndex;
        const isCurrent = stop.isCurrent || idx === activeIndex;
        const isDestination = stop.isDestination || idx === stops.length - 1;
        const isUpcoming = !isPassed && !isCurrent;

        return (
          <div key={stop.id || idx} className="relative flex items-start space-x-3 group">
            {/* Connecting Vertical Line */}
            {idx < stops.length - 1 && (
              <div
                className={cn(
                  'absolute left-3.5 top-6 bottom-0 w-0.5 -ml-px transition-colors',
                  isPassed ? 'bg-emerald-500' : isCurrent ? 'bg-gradient-to-b from-emerald-500 to-slate-300 dark:to-slate-700' : 'bg-slate-200 dark:bg-navy-800'
                )}
                style={{ height: 'calc(100% + 4px)' }}
              />
            )}

            {/* Stop Indicator Node */}
            <div className="relative z-10 flex-shrink-0 mt-0.5">
              {isPassed ? (
                <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : isCurrent ? (
                <div className="relative">
                  <div className="w-7 h-7 rounded-full bg-transit-500 text-white flex items-center justify-center shadow-glow-sm">
                    <Navigation className="w-3.5 h-3.5" />
                  </div>
                  <span className="absolute -inset-1 rounded-full bg-transit-500/30 animate-ping pointer-events-none" />
                </div>
              ) : isDestination ? (
                <div className="w-7 h-7 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-bold text-xs shadow-sm">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-navy-800 border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center text-[10px] font-mono font-bold text-slate-500">
                  {idx + 1}
                </div>
              )}
            </div>

            {/* Stop Details */}
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between">
                <h4
                  className={cn(
                    'text-sm font-bold font-sans transition-colors',
                    isCurrent
                      ? 'text-transit-600 dark:text-transit-400 font-extrabold'
                      : isPassed
                      ? 'text-slate-500 dark:text-slate-400'
                      : 'text-slate-900 dark:text-white'
                  )}
                >
                  {stop.name}
                </h4>

                {stop.eta && (
                  <span
                    className={cn(
                      'text-xs font-mono font-semibold px-2 py-0.5 rounded',
                      isCurrent
                        ? 'bg-transit-500 text-white shadow-sm'
                        : isPassed
                        ? 'text-slate-400'
                        : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300'
                    )}
                  >
                    {stop.eta}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400 mt-0.5">
                <span>Code: {stop.code || `BST-0${idx + 1}`}</span>
                {isCurrent && <span className="text-emerald-500 font-bold">• Active Vehicle Approaching</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RouteTimeline;
