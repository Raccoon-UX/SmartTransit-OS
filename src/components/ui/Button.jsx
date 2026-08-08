import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * SmartTransit OS — Enterprise Reusable Button Component
 * Supports 7 variants, 3 sizes, micro-hover motion, loading indicators, and full accessibility.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98] active:translate-y-0 hover:-translate-y-0.5';

  const variantStyles = {
    // Primary Main Action CTA — SmartTransit Blue
    primary: 'bg-transit-500 hover:bg-transit-600 text-white shadow-sm hover:shadow-md focus:ring-transit-400 border border-transit-400/30 dark:focus:ring-offset-navy-950 focus:ring-offset-white',
    
    // Supporting Action — Slate / Subtle Surface
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 dark:bg-navy-850 dark:hover:bg-navy-800 dark:text-slate-200 border border-slate-300/80 dark:border-slate-700/80 focus:ring-slate-400 dark:focus:ring-offset-navy-950',
    
    // Low Emphasis Outline
    outline: 'bg-transparent hover:bg-slate-100 dark:hover:bg-navy-850 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 focus:ring-transit-500 dark:focus:ring-offset-navy-950',
    
    // Ghost / Text Action
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-navy-850 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white focus:ring-slate-400 dark:focus:ring-offset-navy-950 hover:translate-y-0',
    
    // Danger / Removal / Emergency
    destructive: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm focus:ring-rose-500 border border-rose-500/30 dark:focus:ring-offset-navy-950',
    
    // Confirmation / Activate / Resolve
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm focus:ring-emerald-500 border border-emerald-500/30 dark:focus:ring-offset-navy-950',
    
    // Compact Icon Action
    icon: 'p-2 bg-transparent hover:bg-slate-100 dark:hover:bg-navy-850 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-transparent hover:border-slate-300 dark:hover:border-slate-700 rounded-xl focus:ring-transit-500 dark:focus:ring-offset-navy-950',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-xl gap-1.5',
    md: 'text-sm px-4 py-2 rounded-xl gap-2',
    lg: 'text-base px-5 py-2.5 rounded-xl gap-2.5 font-semibold',
    icon: 'p-2 rounded-xl',
  };

  const currentSize = variant === 'icon' ? sizeStyles.icon : sizeStyles[size] || sizeStyles.md;

  return (
    <button
      type={type}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant] || variantStyles.primary,
        currentSize,
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        <>
          {LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />}
          {children && <span>{children}</span>}
          {RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}

export default Button;
