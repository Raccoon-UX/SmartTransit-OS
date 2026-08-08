/**
 * SmartTransit OS — Centralized Typography Scale & Font Tokens
 */

export const typography = {
  fontFamilies: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    display: 'Outfit, Inter, sans-serif',
    mono: 'JetBrains Mono, monospace',
  },

  scale: {
    display: {
      fontSize: '2.5rem', // 40px
      lineHeight: '1.2',
      fontWeight: '800',
      letterSpacing: '-0.025em',
    },
    h1: {
      fontSize: '2rem', // 32px
      lineHeight: '1.25',
      fontWeight: '700',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '1.5rem', // 24px
      lineHeight: '1.3',
      fontWeight: '700',
      letterSpacing: '-0.015em',
    },
    h3: {
      fontSize: '1.25rem', // 20px
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1rem', // 16px
      lineHeight: '1.5',
      fontWeight: '600',
      letterSpacing: '0',
    },
    bodyLarge: {
      fontSize: '1.125rem', // 18px
      lineHeight: '1.6',
      fontWeight: '400',
    },
    bodyRegular: {
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5',
      fontWeight: '400',
    },
    bodySmall: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.4',
      fontWeight: '400',
    },
    caption: {
      fontSize: '0.6875rem', // 11px
      lineHeight: '1.3',
      fontWeight: '500',
      letterSpacing: '0.02em',
    },
    label: {
      fontSize: '0.75rem', // 12px
      lineHeight: '1.2',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    metric: {
      fontSize: '1.75rem', // 28px
      lineHeight: '1.1',
      fontWeight: '700',
      fontFeatureSettings: '"tnum" 1',
    },
    metricMonospace: {
      fontSize: '1.5rem', // 24px
      lineHeight: '1.1',
      fontWeight: '600',
      fontFamily: 'JetBrains Mono, monospace',
      fontFeatureSettings: '"tnum" 1',
    },
  },
};
