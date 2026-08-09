import React, { useState, useRef, useEffect } from 'react';
import { User, Bus, Shield, Settings, ChevronDown, Check, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/index.js';

export const REQUIRED_ROLE_OPTIONS = [
  {
    id: 'passenger',
    title: 'Passenger',
    subtitle: 'Passenger Portal',
    headerLabel: 'Passenger',
    icon: User,
    defaultRoute: '/passenger/dashboard',
  },
  {
    id: 'driver',
    title: 'Driver',
    subtitle: 'Driver Operations',
    headerLabel: 'Driver',
    icon: Bus,
    defaultRoute: '/driver/dashboard',
  },
  {
    id: 'admin',
    title: 'Transport Admin',
    subtitle: 'Fleet & Transit Operations',
    headerLabel: 'Chief Dispatch Officer',
    icon: Shield,
    defaultRoute: '/admin/dashboard',
  },
  {
    id: 'systemAdmin',
    title: 'System Operations',
    subtitle: 'SOC & Infrastructure',
    headerLabel: 'System Operations',
    icon: Settings,
    defaultRoute: '/soc',
  },
];

export function RoleSwitcher({ currentRole = 'admin', onRoleChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize currentRole so 'soc' maps to 'systemAdmin'
  const normalizedRole = currentRole === 'soc' ? 'systemAdmin' : currentRole;

  const activeOption =
    REQUIRED_ROLE_OPTIONS.find((r) => r.id === normalizedRole) || REQUIRED_ROLE_OPTIONS[2];

  const ActiveIcon = activeOption.icon;

  // Handle outside click and Escape key dismissal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectRole = (option) => {
    setIsOpen(false);
    if (onRoleChange) {
      onRoleChange(option.id);
    }
  };

  return (
    <div ref={containerRef} className={cn('relative shrink-0 text-left select-none', className)}>
      {/* Role Header Button Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center space-x-2 px-3 py-1.5 rounded-xl border transition-all text-xs font-sans text-left leading-tight shrink-0 shadow-xs cursor-pointer',
          'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700/80',
          'hover:border-[#B83E12] dark:hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-[#B83E12]/30',
          isOpen && 'border-[#B83E12] dark:border-amber-400 ring-2 ring-[#B83E12]/20'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <ActiveIcon className="w-4 h-4 text-[#B83E12] dark:text-amber-400 shrink-0" />
        <div className="flex flex-col justify-center leading-none">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            ROLE
          </span>
          <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate mt-0.5">
            {activeOption.headerLabel}
          </span>
        </div>
        <ChevronDown className={cn('w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-150', isOpen && 'rotate-180')} />
      </button>

      {/* Role Switcher Menu Popover (Guaranteed z-[1000] visibility & outside click dismissal) */}
      {isOpen && (
        <div
          className={cn(
            'absolute right-0 mt-2 w-72 p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-[1000] text-left space-y-1',
            'transition-all duration-150 ease-out animate-in fade-in slide-in-from-top-1'
          )}
          style={{ minWidth: '18rem' }}
        >
          <div className="px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-1">
            ROLE
          </div>

          <div className="space-y-1">
            {REQUIRED_ROLE_OPTIONS.map((option) => {
              const OptionIcon = option.icon;
              const isSelected = activeOption.id === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectRole(option)}
                  className={cn(
                    'w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-150 cursor-pointer group',
                    isSelected
                      ? 'bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 shadow-xs'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent'
                  )}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={cn(
                        'p-2 rounded-lg border shrink-0 transition-colors',
                        isSelected
                          ? 'bg-[#B83E12]/10 border-[#B83E12]/30 text-[#B83E12] dark:text-amber-400'
                          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'
                      )}
                    >
                      <OptionIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                        {option.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate font-sans">
                        {option.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 pl-2">
                    {isSelected ? (
                      <Check className="w-4 h-4 text-[#B83E12] dark:text-amber-400" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 group-hover:text-slate-500 dark:group-hover:text-slate-300 transition-colors" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RoleSwitcher;
