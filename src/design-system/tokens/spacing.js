/**
 * SmartTransit OS — Spacing & Layout Tokens (4px Baseline Grid)
 */

export const spacing = {
  // Base scale
  0: '0px',
  1: '0.25rem', // 4px
  2: '0.5rem',  // 8px
  3: '0.75rem', // 12px
  4: '1rem',    // 16px
  5: '1.25rem', // 20px
  6: '1.5rem',  // 24px
  8: '2rem',    // 32px
  10: '2.5rem', // 40px
  12: '3rem',   // 48px
  16: '4rem',   // 64px
  20: '5rem',   // 80px

  // Semantic layout abstractions
  layout: {
    pagePaddingX: 'px-4 sm:px-6 lg:px-8',
    pagePaddingY: 'py-6 sm:py-8 lg:py-10',
    sectionGap: 'gap-6 lg:gap-8',
    cardPadding: 'p-4 sm:p-5 lg:p-6',
    cardPaddingCompact: 'p-3 sm:p-4',
    formGap: 'space-y-4',
    widgetGap: 'gap-4',
  },
};
