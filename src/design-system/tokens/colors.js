/**
 * SmartTransit OS — Semantic Warm Municipal Color Token System
 * Municipal Smart City Transport Palette (WCAG AA Compliant)
 */

export const colors = {
  // Brand Identity — Municipal Blue
  primary: {
    50: '#f0f7ff',
    100: '#e0effe',
    200: '#bae0fd',
    300: '#7cc5fb',
    400: '#36a5f7',
    500: '#1769D1', // Primary municipal blue
    600: '#1252A5',
    700: '#0E3E7E',
    800: '#092A56',
    900: '#051833',
    950: '#030E1F',
  },

  // Civic Teal & Orange Accents
  accent: {
    teal: '#0E8F82',
    orange: '#D97732',
  },

  // Warm Background & Text Hierarchy
  warm: {
    bg: '#F7F5F0',
    surface: '#FFFFFF',
    elevated: '#F3F0E9',
    subtle: '#ECE8DF',
    border: '#E5E0D8',
    textPrimary: '#172033',
    textMuted: '#596273',
  },

  // Semantic Status Colors
  semantic: {
    success: {
      lightBg: '#f0fdf4',
      lightBorder: '#bbf7d0',
      lightText: '#166534',
      darkBg: '#022c22',
      darkBorder: '#065f46',
      darkText: '#34d399',
      solid: '#218A63',
    },
    warning: {
      lightBg: '#fffbeb',
      lightBorder: '#fef3c7',
      lightText: '#92400e',
      darkBg: '#451a03',
      darkBorder: '#92400e',
      darkText: '#fbbf24',
      solid: '#C8891A',
    },
    critical: {
      lightBg: '#fef2f2',
      lightBorder: '#fecaca',
      lightText: '#991b1b',
      darkBg: '#4c0519',
      darkBorder: '#9f1239',
      darkText: '#fb7185',
      solid: '#C94A45',
    },
    neutral: {
      lightBg: '#f8fafc',
      lightBorder: '#e2e8f0',
      lightText: '#475569',
      solid: '#596273',
    },
  },

  // Surface Hierarchy
  surfaces: {
    light: {
      canvas: '#F7F5F0',
      card: '#FFFFFF',
      elevated: '#F3F0E9',
      subtle: '#ECE8DF',
      border: '#E5E0D8',
      textPrimary: '#172033',
      textMuted: '#596273',
    },
    dark: {
      canvas: '#0F172A',
      card: '#1E293B',
      elevated: '#334155',
      subtle: '#1E293B',
      border: '#334155',
      textPrimary: '#F8FAFC',
      textMuted: '#94A3B8',
    },
  },
};

export default colors;
