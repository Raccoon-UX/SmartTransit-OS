/**
 * SmartTransit OS — Recommendation Service
 */
import { aiEngine } from './aiEngine.js';

export const recommendationService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        recommendations: snapshot.recommendations,
      });
    });
  },

  updateStatus(id, status) {
    aiEngine.updateRecommendationStatus(id, status);
  },
};

export default recommendationService;
