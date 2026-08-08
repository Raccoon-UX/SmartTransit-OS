/**
 * SmartTransit OS — Micro-interactions, Transition Timings & Telemetry Waves
 */

export const animations = {
  durations: {
    instant: '75ms',
    fast: '150ms',      // Micro-interactions (hover, click, active pills)
    normal: '250ms',    // Card expansion, dropdown opens, tabs
    slow: '400ms',      // Modal open, drawer slide, panel transitions
    telemetry: '2000ms',// Continuous telemetry pulses
  },

  easings: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    decelerate: 'cubic-bezier(0.0, 0, 0.2, 1)',
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },

  transitions: {
    button: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    cardHover: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    modalFade: 'opacity 300ms cubic-bezier(0.0, 0, 0.2, 1), transform 300ms cubic-bezier(0.0, 0, 0.2, 1)',
    drawerSlide: 'transform 350ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
};
