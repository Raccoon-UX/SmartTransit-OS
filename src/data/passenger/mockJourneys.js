/**
 * SmartTransit OS — Journey Planner & Multimodal Type Contracts
 * 
 * Defines the generic Itinerary Leg Model, Top-Level Journey Model,
 * Mode Registries, and Data Provenance Rules.
 */

export const ROUTING_PATTERNS = {
  DIRECT_TRUNK_ROUTE: 'DIRECT_TRUNK_ROUTE',
  MULTI_PROVIDER_BOUNDARY_TRANSFER: 'MULTI_PROVIDER_BOUNDARY_TRANSFER',
  MIXED_MODE_INTERMODAL: 'MIXED_MODE_INTERMODAL',
};

export const ROUTING_PATTERN_META = {
  DIRECT_TRUNK_ROUTE: {
    code: 'DIRECT_TRUNK_ROUTE',
    label: 'Direct Trunk Route',
    shortLabel: 'Direct Trunk',
    description: 'Point-to-point journey on a single transit line with initial/final walking legs.',
    badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    icon: 'ArrowRight',
  },
  MULTI_PROVIDER_BOUNDARY_TRANSFER: {
    code: 'MULTI_PROVIDER_BOUNDARY_TRANSFER',
    label: 'Multi-Provider Transfer',
    shortLabel: 'Boundary Transfer',
    description: 'Cross-municipal journey transferring between distinct transit operators (e.g. BEST ➔ TMT).',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-sky-400 border-blue-200 dark:border-blue-800',
    icon: 'Repeat',
  },
  MIXED_MODE_INTERMODAL: {
    code: 'MIXED_MODE_INTERMODAL',
    label: 'Mixed-Mode Intermodal',
    shortLabel: 'Intermodal',
    description: 'Combined multimodal journey spanning Bus, Metro, Suburban Rail, Ferry, or First-Mile.',
    badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    icon: 'Compass',
  },
};

export const TRANSIT_MODES = {
  WALK: {
    code: 'WALK',
    name: 'Walk',
    icon: 'Footprints',
    color: '#10B981',
    badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  },
  BUS: {
    code: 'BUS',
    name: 'Bus',
    icon: 'Bus',
    color: '#2563EB',
    badgeBg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-sky-400 border-blue-200 dark:border-blue-800',
  },
  METRO: {
    code: 'METRO',
    name: 'Metro',
    icon: 'TrainTrack',
    color: '#9333EA',
    badgeBg: 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  },
  TRAIN: {
    code: 'TRAIN',
    name: 'Suburban Rail',
    icon: 'Train',
    color: '#D97706',
    badgeBg: 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  },
  FERRY: {
    code: 'FERRY',
    name: 'Water Ferry',
    icon: 'Ship',
    color: '#0284C7',
    badgeBg: 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400 border-sky-200 dark:border-sky-800',
  },
  MONORAIL: {
    code: 'MONORAIL',
    name: 'Monorail',
    icon: 'Navigation',
    color: '#0D9488',
    badgeBg: 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 border-teal-200 dark:border-teal-800',
  },
  AUTO_RICKSHAW: {
    code: 'AUTO_RICKSHAW',
    name: 'Auto-Rickshaw',
    icon: 'Car',
    color: '#EA580C',
    badgeBg: 'bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  },
  TRANSFER_BUFFER: {
    code: 'TRANSFER_BUFFER',
    name: 'Transfer Interchange',
    icon: 'Repeat',
    color: '#F59E0B',
    badgeBg: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-700',
  },
};

export const DATA_PROVENANCE = {
  CANONICAL_REGIONAL: {
    code: 'CANONICAL_REGIONAL',
    label: 'Regional Transit Dataset',
    sourceFile: 'maharashtra_transit_analysis.csv',
    isCanonical: true,
    isSimulated: false,
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
  },
  DEMO_SCENARIO: {
    code: 'DEMO_SCENARIO',
    label: 'Demo Scenario',
    sourceFile: '20-Route UX Structural Reference',
    isCanonical: false,
    isSimulated: true,
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
  },
};

