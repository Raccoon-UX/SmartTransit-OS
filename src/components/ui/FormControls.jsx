import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Standard Reusable Toggle Switch
 */
export function Toggle({ label, description, checked = false, onChange, disabled = false, className = '' }) {
  return (
    <label className={cn('flex items-start space-x-3 cursor-pointer select-none', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <div className="relative inline-flex items-center mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            'w-10 h-5.5 rounded-full transition-colors duration-200 ease-in-out border border-transparent',
            checked ? 'bg-transit-500' : 'bg-slate-300 dark:bg-navy-800 border-slate-400/40 dark:border-slate-700'
          )}
        >
          <div
            className={cn(
              'w-4.5 h-4.5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out mt-0.5',
              checked ? 'translate-x-5' : 'translate-x-0.5'
            )}
          />
        </div>
      </div>
      {(label || description) && (
        <div className="text-left">
          {label && <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{label}</div>}
          {description && <div className="text-xs text-slate-500 dark:text-slate-400">{description}</div>}
        </div>
      )}
    </label>
  );
}

/**
 * Standard Checkbox
 */
export function Checkbox({ label, checked = false, onChange, disabled = false, error, className = '' }) {
  return (
    <label className={cn('flex items-center space-x-2.5 cursor-pointer select-none text-left', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange && onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            'w-4.5 h-4.5 rounded border transition-all duration-150 flex items-center justify-center',
            checked
              ? 'bg-transit-500 border-transit-500 text-white'
              : 'bg-white dark:bg-navy-900 border-slate-300 dark:border-slate-700',
            error && 'border-rose-500'
          )}
        >
          {checked && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>
      {label && <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{label}</span>}
    </label>
  );
}

/**
 * Standard Radio Option
 */
export function Radio({ label, name, value, checked = false, onChange, disabled = false, className = '' }) {
  return (
    <label className={cn('flex items-center space-x-2.5 cursor-pointer select-none text-left', disabled && 'opacity-50 cursor-not-allowed', className)}>
      <div className="relative flex items-center justify-center">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={(e) => !disabled && onChange && onChange(e.target.value)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={cn(
            'w-4.5 h-4.5 rounded-full border transition-all duration-150 flex items-center justify-center',
            checked
              ? 'border-transit-500 bg-white dark:bg-navy-900'
              : 'bg-white dark:bg-navy-900 border-slate-300 dark:border-slate-700'
          )}
        >
          {checked && <div className="w-2 h-2 rounded-full bg-transit-500" />}
        </div>
      </div>
      {label && <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{label}</span>}
    </label>
  );
}
