import React from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../../utils/index.js';

export function PasswordStrength({ password = '', className = '' }) {
  if (!password) return null;

  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialOrUpper = /[A-Z]/.test(password) || /[^A-Za-z0-9]/.test(password);

  let score = 0;
  if (hasMinLength) score += 1;
  if (hasNumber) score += 1;
  if (hasSpecialOrUpper) score += 1;
  if (password.length >= 12) score += 1;

  let label = 'Too Weak';
  let color = 'bg-rose-500 text-rose-500';
  let width = 'w-1/4';

  if (score === 2) {
    label = 'Weak';
    color = 'bg-amber-500 text-amber-500';
    width = 'w-2/4';
  } else if (score === 3) {
    label = 'Medium';
    color = 'bg-cyan-500 text-cyan-500';
    width = 'w-3/4';
  } else if (score >= 4) {
    label = 'Strong';
    color = 'bg-emerald-500 text-emerald-500';
    width = 'w-full';
  }

  return (
    <div className={cn('space-y-2 text-left pt-1', className)}>
      <div className="flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-500 dark:text-slate-400">Password Strength</span>
        <span className={cn('font-bold', color.split(' ')[1])}>{label}</span>
      </div>

      <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-navy-800 overflow-hidden">
        <div className={cn('h-full transition-all duration-300 rounded-full', width, color.split(' ')[0])} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1 text-[10px] font-mono">
        <div className="flex items-center space-x-1">
          {hasMinLength ? (
            <Check className="w-3 h-3 text-emerald-500" />
          ) : (
            <X className="w-3 h-3 text-slate-400" />
          )}
          <span className={hasMinLength ? 'text-slate-700 dark:text-slate-300 font-semibold' : 'text-slate-400'}>
            8+ Characters
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {hasNumber ? (
            <Check className="w-3 h-3 text-emerald-500" />
          ) : (
            <X className="w-3 h-3 text-slate-400" />
          )}
          <span className={hasNumber ? 'text-slate-700 dark:text-slate-300 font-semibold' : 'text-slate-400'}>
            Includes Number
          </span>
        </div>

        <div className="flex items-center space-x-1">
          {hasSpecialOrUpper ? (
            <Check className="w-3 h-3 text-emerald-500" />
          ) : (
            <X className="w-3 h-3 text-slate-400" />
          )}
          <span className={hasSpecialOrUpper ? 'text-slate-700 dark:text-slate-300 font-semibold' : 'text-slate-400'}>
            Uppercase / Symbol
          </span>
        </div>
      </div>
    </div>
  );
}

export default PasswordStrength;
