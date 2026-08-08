/**
 * SmartTransit OS — Explainable AI Feature Factor Generator
 */

export const explainabilityService = {
  getFactors(predictionType, entity) {
    if (predictionType === 'ETA') {
      return [
        { label: 'Traffic slowdown', impactMin: 2.1 },
        { label: 'Vehicle speed', impactMin: 0.8 },
        { label: 'Stop dwell time', impactMin: 0.4 },
        { label: 'Route congestion', impactMin: 0.7 },
        { label: 'Historical pattern', impactMin: -0.3 },
      ];
    }
    if (predictionType === 'OCCUPANCY') {
      return [
        { label: 'Peak morning window', impactPercent: 8.2 },
        { label: 'Boarding surge', impactPercent: 5.4 },
        { label: 'Alighting rate', impactPercent: -2.1 },
      ];
    }
    return [
      { label: 'Signal weight A', impactMin: 1.5 },
      { label: 'Signal weight B', impactMin: 0.6 },
    ];
  },
};

export default explainabilityService;
