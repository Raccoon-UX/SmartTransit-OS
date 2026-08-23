/**
 * SmartTransit OS — Passenger Journey Feedback Service
 * 
 * Collects 6-dimensional trip experience ratings (Overall, Driver, Cleanliness,
 * Punctuality, Comfort, Safety) separate from formal complaints.
 */

import { apiClient } from '../api/apiClient.js';

const STORAGE_KEY = 'smarttransit_passenger_feedback';

let feedbackHistory = [];

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    feedbackHistory = JSON.parse(saved);
  }
} catch (e) {
  console.warn('[PassengerFeedbackService] Storage read error:', e);
}

export const passengerFeedbackService = {
  async submitJourneyFeedback({
    journeyId = 'JRN-CURRENT',
    tripId = null,
    vehicle = 'Bus 245',
    route = 'RT-108',
    passengerId = 'usr-pass-001',
    passengerName = 'Aarav Sharma',
    ratings = {
      overall: 5,
      driver: 5,
      cleanliness: 4,
      punctuality: 5,
      comfort: 4,
      safety: 5,
    },
    comment = '',
  }) {
    const feedbackRecord = {
      id: `FDB-${Math.floor(1000 + Math.random() * 9000)}`,
      journeyId,
      tripId,
      vehicle,
      route,
      passengerId,
      passengerName,
      ratings,
      comment: comment.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      await apiClient.post('/feedback', feedbackRecord);
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerFeedbackService] API warning:', e);
      }
    }

    feedbackHistory.push(feedbackRecord);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackHistory));
    } catch (e) {
      console.warn('[PassengerFeedbackService] Storage write error:', e);
    }

    return feedbackRecord;
  },

  getRecentFeedback(passengerId = 'usr-pass-001') {
    return feedbackHistory.filter((f) => !f.passengerId || f.passengerId === passengerId);
  },
};
