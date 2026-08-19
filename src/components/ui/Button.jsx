import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * SmartTransit OS — Government Service Solid Button Component
 * Sharp-ish corners (6px), solid fills, zero gradients, zero bounce motion.
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
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border';

  const variantStyles = {
    // Primary Main Action — Institutional Navy
    primary: 'bg-[#0B3D91] hover:bg-[#093278] text-white border-[#07275f] focus:ring-[#0B3D91] shadow-subtle',
    
    // Supporting Action — Flat Neutral Surface
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-100 border-slate-300 dark:border-slate-700 focus:ring-slate-400',
    
    // Low Emphasis Outline
    outline: 'bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 focus:ring-[#0B3D91]',
    
    // Ghost Action
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent focus:ring-slate-400',
    
    // Emergency / Destructive Action — Solid Red
    destructive: 'bg-[#B91C1C] hover:bg-[#991b1b] text-white border-[#7f1d1d] focus:ring-rose-600 shadow-subtle',
    
    // Success Action — Solid Green
    success: 'bg-[#15803D] hover:bg-[#166534] text-white border-[#14532d] focus:ring-emerald-600 shadow-subtle',
    
    // Compact Icon Action
    icon: 'p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 rounded-md focus:ring-[#0B3D91]',
  };

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-4 py-2 rounded-md gap-2',
    lg: 'text-base px-5 py-2.5 rounded-md gap-2.5 font-bold',
    icon: 'p-2 rounded-md',
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
          {LeftIcon && (
            React.isValidElement(LeftIcon) ? LeftIcon : typeof LeftIcon === 'function' ? <LeftIcon className="w-4 h-4 shrink-0" /> : null
          )}
          {children && <span>{children}</span>}
          {RightIcon && (
            React.isValidElement(RightIcon) ? RightIcon : typeof RightIcon === 'function' ? <RightIcon className="w-4 h-4 shrink-0" /> : null
          )}
        </>
      )}
    </button>
  );
}

export default Button;
