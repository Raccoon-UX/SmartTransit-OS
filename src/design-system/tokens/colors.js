/**
 * SmartTransit OS — Semantic Color Token System
 * Enterprise Smart City Transport Palette (WCAG AA Compliant)
 */

export const colors = {
  // Brand Identity — Deep Intelligent Transit Blue
  primary: {
    50: '#f0f7ff',
    100: '#e0effe',
    200: '#bae0fd',
    300: '#7cc5fb',
    400: '#36a5f7',
    500: '#0c87eb', // Core action primary
    600: '#026bc9',
    700: '#0355a3',
    800: '#074886',
    900: '#0c3d70',
    950: '#08274a',
  },

  // Telemetry & GPS Accent — Cyan/Teal
  accent: {
    50: '#ecfeff',
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4',
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
  },

  // Semantic Status Colors
  semantic: {
    // Live / Online / Available / Normal
    success: {
      lightBg: '#ecfdf5',
      lightBorder: '#a7f3d0',
      lightText: '#065f46',
      darkBg: '#022c22',
      darkBorder: '#065f46',
      darkText: '#34d399',
      solid: '#10b981',
      pulse: 'rgba(16, 185, 129, 0.4)',
    },
    // Delayed / Moderate Occupancy / Attention Required
    warning: {
      lightBg: '#fffbeb',
      lightBorder: '#fde68a',
      lightText: '#92400e',
      darkBg: '#451a03',
      darkBorder: '#92400e',
      darkText: '#fbbf24',
      solid: '#f59e0b',
      pulse: 'rgba(245, 158, 11, 0.4)',
    },
    // Offline / Emergency SOS / Severe Overcrowding / System Failure
    critical: {
      lightBg: '#fff1f2',
      lightBorder: '#fecdd3',
      lightText: '#9f1239',
      darkBg: '#4c0519',
      darkBorder: '#9f1239',
      darkText: '#fb7185',
      solid: '#f43f5e',
      pulse: 'rgba(244, 63, 94, 0.4)',
    },
    // Tracking / Route Info / Dispatch Announcements
    info: {
      lightBg: '#f0f9ff',
      lightBorder: '#bae6fd',
      lightText: '#075985',
      darkBg: '#082f49',
      darkBorder: '#0369a1',
      darkText: '#38bdf8',
      solid: '#0284c7',
      pulse: 'rgba(2, 132, 199, 0.4)',
    },
    // Inactive / Maintenance / Archived
    neutral: {
      lightBg: '#f8fafc',
      lightBorder: '#e2e8f0',
      lightText: '#475569',
      darkBg: '#1e293b',
      darkBorder: '#334155',
      darkText: '#94a3b8',
      solid: '#64748b',
    },
  },

  // Surface Hierarchy
  surfaces: {
    light: {
      canvas: '#f8fafc',
      card: '#ffffff',
      elevated: '#ffffff',
      subtle: '#f1f5f9',
      border: '#e2e8f0',
      borderHover: '#cbd5e1',
      textPrimary: '#0f172a',
      textSecondary: '#475569',
      textMuted: '#94a3b8',
    },
    dark: {
      canvas: '#040711',
      card: '#0b1120',
      elevated: '#0f172a',
      subtle: '#161f30',
      border: '#1e293b',
      borderHover: '#334155',
      textPrimary: '#f8fafc',
      textSecondary: '#cbd5e1',
      textMuted: '#64748b',
    },
  },
};
