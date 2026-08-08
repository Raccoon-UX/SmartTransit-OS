import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind classes safely
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format timestamp into standard transit time format (HH:MM:SS)
 */
export function formatTransitTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date);
}

/**
 * Format ETA in minutes/seconds
 */
export function formatEta(seconds) {
  if (seconds < 60) return `${Math.max(0, Math.floor(seconds))}s`;
  const mins = Math.floor(seconds / 60);
  return `${mins} min${mins > 1 ? 's' : ''}`;
}
