/**
 * SmartTransit OS — Elevation & Shadow System (Light & Dark Compliant)
 */

export const shadows = {
  light: {
    subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
    card: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
    modal: '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
    focusRing: '0 0 0 3px rgba(12, 135, 235, 0.35)',
  },
  dark: {
    subtle: '0 1px 3px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
    card: '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
    elevated: '0 12px 30px -4px rgba(0, 0, 0, 0.65), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
    modal: '0 30px 60px -10px rgba(0, 0, 0, 0.85), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
    glowBlue: '0 0 25px rgba(12, 135, 235, 0.25)',
    glowEmerald: '0 0 20px rgba(16, 185, 129, 0.25)',
    glowAmber: '0 0 20px rgba(245, 158, 11, 0.25)',
    glowRose: '0 0 20px rgba(244, 63, 94, 0.25)',
    focusRing: '0 0 0 3px rgba(56, 189, 248, 0.45)',
  },
};
