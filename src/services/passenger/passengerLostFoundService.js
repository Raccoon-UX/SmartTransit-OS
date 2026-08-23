/**
 * SmartTransit OS — Passenger Lost & Found Service
 */

import { apiClient } from '../api/apiClient.js';
import { INITIAL_LOST_FOUND_ITEMS, LOST_FOUND_CATEGORIES } from '../../data/passenger/mockLostFound.js';

const STORAGE_KEY = 'smarttransit_passenger_lost_found';

let lostFoundState = [...INITIAL_LOST_FOUND_ITEMS];
let subscribers = [];

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      lostFoundState = parsed;
    }
  }
} catch (e) {
  console.warn('[PassengerLostFoundService] Storage read error:', e);
}

function notifySubscribers() {
  subscribers.forEach((cb) => cb([...lostFoundState]));
}

function persistState(state) {
  lostFoundState = state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[PassengerLostFoundService] Storage write error:', e);
  }
  notifySubscribers();
}

export const passengerLostFoundService = {
  getCategories() {
    return [...LOST_FOUND_CATEGORIES];
  },

  async getLostItems(passengerId = 'usr-pass-001') {
    try {
      const data = await apiClient.get('/lost-found/my');
      if (Array.isArray(data) && data.length > 0) {
        lostFoundState = data;
        persistState(data);
        return [...lostFoundState];
      }
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerLostFoundService] Fetch API warning:', e);
      }
    }
    return lostFoundState.filter((item) => !item.passengerId || item.passengerId === passengerId);
  },

  async reportLostItem({
    category,
    itemName,
    description,
    vehicle = null,
    route = null,
    journeyId = null,
    approximateTime = 'Today',
    contactPreference = 'Phone & WhatsApp',
    contactDetails = '',
    passengerId = 'usr-pass-001',
  }) {
    if (!category || !itemName || !description) {
      throw new Error('Category, item name, and description are required.');
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reportId = `LF-2026-${randomSuffix}`;
    const isoDate = new Date().toISOString();

    const newReport = {
      id: reportId,
      passengerId,
      category,
      categoryCode: category.toUpperCase().replace(/[^A-Z0-9]/g, '_'),
      itemName: itemName.trim(),
      description: description.trim(),
      vehicle: vehicle || null,
      route: route || null,
      journeyId: journeyId || null,
      approximateTime,
      reportedDate: isoDate,
      status: 'REPORTED',
      contactPreference,
      contactDetails: contactDetails.trim(),
      depotLocation: 'Under Transit Custody Desk Inspection',
      matchNote: 'Report registered with Municipal Property Depots. Awaiting custody match.',
    };

    try {
      await apiClient.post('/lost-found', newReport);
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerLostFoundService] Submit API warning:', e);
      }
    }

    const updated = [newReport, ...lostFoundState];
    persistState(updated);
    return newReport;
  },

  subscribe(callback) {
    subscribers.push(callback);
    callback([...lostFoundState]);
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },
};
