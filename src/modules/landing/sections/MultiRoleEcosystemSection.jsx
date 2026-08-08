import React from 'react';
import { Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { ECOSYSTEM_ROLES } from '../../../data/landing/ecosystemRoles.js';
import { Button } from '../../../components/ui/Button.jsx';
import { cn } from '../../../utils/index.js';

export function MultiRoleEcosystemSection({ onExploreRole }) {
  return (
    <section id="ecosystem" className="py-16 sm:py-20 border-t border-slate-200 dark:border-slate-800/80 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-transit-500/10 text-transit-600 dark:text-transit-400 text-xs font-mono font-bold border border-transit-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>UNIFIED PLATFORM ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">
            One Operating System. Four Specialized Interfaces.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
            SmartTransit OS serves commuters at the bus stop, drivers in the vehicle cockpit, municipal dispatchers at the command center, and engineers in the SOC.
          </p>
        </div>

        {/* 4-Card Multi-Role Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ECOSYSTEM_ROLES.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={cn(
                  'p-6 sm:p-8 rounded-3xl border transition-all duration-200 text-left flex flex-col justify-between space-y-6',
                  'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800',
                  'shadow-sm dark:shadow-card hover:border-transit-500/40 hover:shadow-glow-sm'
                )}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={cn('p-3 rounded-2xl border', role.color)}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold uppercase text-transit-500">
                      {role.tagline}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans">{role.roleName}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                    {role.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    rightIcon={ArrowRight}
                    onClick={() => onExploreRole && onExploreRole(role.id)}
                  >
                    {role.ctaLabel}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MultiRoleEcosystemSection;
