/**
 * SmartTransit OS — Passenger Complaint & Issue Reporting Service
 * 
 * Manages complaint submission, validation, backend persistence, dynamic ID generation,
 * lifecycle tracking, and status retrieval.
 */

import { apiClient } from '../api/apiClient.js';
import { INITIAL_PASSENGER_COMPLAINTS, COMPLAINT_CATEGORIES } from '../../data/passenger/mockComplaints.js';

const STORAGE_KEY = 'smarttransit_passenger_complaints';

let complaintsState = [...INITIAL_PASSENGER_COMPLAINTS];
let subscribers = [];

// Try to restore saved complaints from localStorage
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      complaintsState = parsed;
    }
  }
} catch (e) {
  console.warn('[PassengerComplaintService] Storage read error:', e);
}

function notifySubscribers() {
  subscribers.forEach((cb) => cb([...complaintsState]));
}

function persistState(state) {
  complaintsState = state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[PassengerComplaintService] Storage write error:', e);
  }
  notifySubscribers();
}

export const passengerComplaintService = {
  getCategories() {
    return [...COMPLAINT_CATEGORIES];
  },

  /**
   * Fetches user's complaints
   */
  async getComplaints(passengerId = 'usr-pass-001') {
    try {
      const data = await apiClient.get('/complaints/my');
      if (Array.isArray(data) && data.length > 0) {
        complaintsState = data;
        persistState(data);
        return [...complaintsState];
      }
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerComplaintService] Fetch API warning:', e);
      }
    }
    // Filter by passengerId for ownership safety
    return complaintsState.filter((c) => !c.passengerId || c.passengerId === passengerId);
  },

  /**
   * Fetches a specific complaint by ID
   */
  async getComplaintById(complaintId) {
    try {
      const data = await apiClient.get(`/complaints/${encodeURIComponent(complaintId)}`);
      if (data) return data;
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerComplaintService] Single fetch warning:', e);
      }
    }
    return complaintsState.find((c) => c.id === complaintId) || null;
  },

  /**
   * Submits a new passenger complaint
   */
  async submitComplaint({
    category,
    subject,
    description,
    vehicle = null,
    route = null,
    journeyId = null,
    passengerId = 'usr-pass-001',
    passengerName = 'Aarav Sharma',
    evidenceFile = null,
  }) {
    if (!category || !subject || !description) {
      throw new Error('Category, subject, and description are required.');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const complaintId = `ST-${randomSuffix}`;
    const isoDate = new Date().toISOString();

    const newComplaint = {
      id: complaintId,
      category,
      categoryCode: category.toUpperCase().replace(/[^A-Z0-9]/g, '_'),
      subject: subject.trim(),
      description: description.trim(),
      vehicle: vehicle || null,
      route: route || null,
      journeyId: journeyId || null,
      passengerId,
      passengerName,
      status: 'SUBMITTED',
      severity: category.toLowerCase().includes('safety') ? 'HIGH' : 'MEDIUM',
      createdAt: isoDate,
      updatedAt: isoDate,
      timeline: [
        {
          status: 'SUBMITTED',
          timestamp: isoDate,
          message: 'Complaint submitted by passenger through Mobile Portal.',
        },
      ],
      evidenceName: evidenceFile ? evidenceFile.name : null,
      resolutionNote: null,
    };

    // 1. Attempt Backend API persistence
    try {
      await apiClient.post('/complaints', newComplaint);
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerComplaintService] Submit API warning:', e);
      }
    }

    // 2. Persist locally to complaints list
    const updated = [newComplaint, ...complaintsState];
    persistState(updated);
    return newComplaint;
  },

  /**
   * Subscribes to complaint changes
   */
  subscribe(callback) {
    subscribers.push(callback);
    callback([...complaintsState]);
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },
};
