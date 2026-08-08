import React, { useState } from 'react';
import { Search, Eye, EyeOff, X, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/index.js';

/**
 * Standard Text Input with label, error, helper text, and icon support
 */
export function TextInput({
  label,
  error,
  success,
  helperText,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  className = '',
  disabled = false,
  required = false,
  id,
  ...props
}) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {LeftIcon && (
          <div className="absolute left-3 pointer-events-none text-slate-400 dark:text-slate-500">
            <LeftIcon className="w-4 h-4" />
          </div>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={cn(
            'w-full text-sm rounded-lg px-3.5 py-2 transition-all duration-150',
            'bg-white dark:bg-navy-900 border border-slate-300 dark:border-slate-700/80',
            'text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-transit-500 focus:border-transit-500',
            'disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-navy-950 disabled:cursor-not-allowed',
            LeftIcon && 'pl-10',
            RightIcon && 'pr-10',
            error && 'border-rose-500 focus:ring-rose-500 focus:border-rose-500',
            success && 'border-emerald-500 focus:ring-emerald-500 focus:border-emerald-500',
            className
          )}
          {...props}
        />
        {RightIcon && (
          <div className="absolute right-3 pointer-events-none text-slate-400 dark:text-slate-500">
            <RightIcon className="w-4 h-4" />
          </div>
        )}
      </div>
      {error && (
        <p className="flex items-center space-x-1 text-xs text-rose-500 font-medium mt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </p>
      )}
      {success && !error && (
        <p className="flex items-center space-x-1 text-xs text-emerald-500 font-medium mt-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>{success}</span>
        </p>
      )}
      {helperText && !error && !success && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{helperText}</p>
      )}
    </div>
  );
}

/**
 * Specialized Search Bar with clean clear-action and quick filter style
 */
export function SearchInput({ value = '', onChange, onClear, placeholder = 'Search buses, routes, stops...', className = '', ...props }) {
  return (
    <div className={cn('relative flex items-center w-full', className)}>
      <Search className="absolute left-3.5 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full text-sm rounded-lg pl-10 pr-9 py-2 transition-all',
          'bg-slate-50 dark:bg-navy-900/90 border border-slate-200 dark:border-slate-700/80',
          'text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-transit-500 focus:bg-white dark:focus:bg-navy-900'
        )}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

/**
 * Standard Select Dropdown
 */
export function Select({ label, options = [], error, value, onChange, className = '', id, ...props }) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={cn(
            'w-full text-sm rounded-lg px-3.5 py-2 pr-10 appearance-none transition-all',
            'bg-white dark:bg-navy-900 border border-slate-300 dark:border-slate-700/80',
            'text-slate-900 dark:text-slate-100',
            'focus:outline-none focus:ring-2 focus:ring-transit-500',
            error && 'border-rose-500 focus:ring-rose-500',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="dark:bg-navy-900 dark:text-slate-100">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-rose-500 font-medium mt-1">{error}</p>}
    </div>
  );
}

/**
 * MultiSelect Tag Component
 */
export function MultiSelect({ label, options = [], selected = [], onChange, placeholder = 'Select options...' }) {
  const toggleOption = (val) => {
    if (selected.includes(val)) {
      onChange(selected.filter((item) => item !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="p-2 rounded-lg border border-slate-300 dark:border-slate-700/80 bg-white dark:bg-navy-900 min-h-[42px] flex flex-wrap gap-1.5 items-center">
        {selected.length === 0 && (
          <span className="text-xs text-slate-400 dark:text-slate-500 px-1">{placeholder}</span>
        )}
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => toggleOption(opt.value)}
              className={cn(
                'text-xs font-medium px-2.5 py-1 rounded-md transition-all flex items-center space-x-1',
                isSelected
                  ? 'bg-transit-500 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-700'
              )}
            >
              <span>{opt.label}</span>
              {isSelected && <X className="w-3 h-3 ml-1" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Password Input with Reveal toggle
 */
export function PasswordInput({ label, error, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <TextInput
        type={show ? 'text' : 'password'}
        label={label}
        error={error}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
  );
}

/**
 * Number Stepper Input
 */
export function NumberInput({ label, value, onChange, min = 0, max = 100, step = 1, error, ...props }) {
  return (
    <TextInput
      type="number"
      label={label}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      step={step}
      error={error}
      {...props}
    />
  );
}

/**
 * Textarea Input
 */
export function Textarea({ label, error, helperText, rows = 3, className = '', id, ...props }) {
  const areaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label htmlFor={areaId} className="block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        rows={rows}
        className={cn(
          'w-full text-sm rounded-lg px-3.5 py-2 transition-all',
          'bg-white dark:bg-navy-900 border border-slate-300 dark:border-slate-700/80',
          'text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-transit-500',
          error && 'border-rose-500 focus:ring-rose-500',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-rose-500 font-medium mt-1">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{helperText}</p>}
    </div>
  );
}
