import { apiClient } from '../api/apiClient.js';
import { aiEngine } from './aiEngine.js';

export const recommendationService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        recommendations: snapshot.recommendations,
      });
    });
  },

  async updateStatus(id, status, reason = null) {
    try {
      await apiClient.patch(`/ai/recommendations/${encodeURIComponent(id)}`, { status, reason });
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[RecommendationService] API update warning:', e);
      }
    }
    aiEngine.updateRecommendationStatus(id, status);
  },
};

export default recommendationService;
