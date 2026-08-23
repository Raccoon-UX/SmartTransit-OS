/**
 * SmartTransit OS — Passenger Safety & Trusted Contacts Service
 */

import { apiClient } from '../api/apiClient.js';
import {
  INITIAL_TRUSTED_CONTACTS,
  MUNICIPAL_SAFETY_HELPLINES,
  PASSENGER_SAFETY_GUIDELINES,
} from '../../data/passenger/mockSafetyContacts.js';

const STORAGE_KEY = 'smarttransit_trusted_contacts';

let contactsState = [...INITIAL_TRUSTED_CONTACTS];
let subscribers = [];

try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      contactsState = parsed;
    }
  }
} catch (e) {
  console.warn('[PassengerSafetyService] Storage read error:', e);
}

function notifySubscribers() {
  subscribers.forEach((cb) => cb([...contactsState]));
}

function persistState(state) {
  contactsState = state;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[PassengerSafetyService] Storage write error:', e);
  }
  notifySubscribers();
}

export const passengerSafetyService = {
  getHelplines() {
    return [...MUNICIPAL_SAFETY_HELPLINES];
  },

  getGuidelines() {
    return [...PASSENGER_SAFETY_GUIDELINES];
  },

  async getTrustedContacts(passengerId = 'usr-pass-001') {
    try {
      const data = await apiClient.get('/safety/contacts');
      if (Array.isArray(data) && data.length > 0) {
        contactsState = data;
        persistState(data);
        return [...contactsState];
      }
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerSafetyService] API warning:', e);
      }
    }
    return contactsState.filter((c) => !c.passengerId || c.passengerId === passengerId);
  },

  async addTrustedContact({
    name,
    relationship,
    phone,
    email = '',
    notifyOnSos = true,
    passengerId = 'usr-pass-001',
  }) {
    if (!name || !phone) {
      throw new Error('Contact name and phone number are required.');
    }

    const newContact = {
      id: `tc-${Date.now().toString().slice(-6)}`,
      passengerId,
      name: name.trim(),
      relationship: relationship ? relationship.trim() : 'Emergency Contact',
      phone: phone.trim(),
      email: email.trim(),
      notifyOnSos,
    };

    try {
      await apiClient.post('/safety/contacts', newContact);
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerSafetyService] Add contact API warning:', e);
      }
    }

    const updated = [newContact, ...contactsState];
    persistState(updated);
    return newContact;
  },

  async deleteTrustedContact(contactId) {
    try {
      await apiClient.delete(`/safety/contacts/${encodeURIComponent(contactId)}`);
    } catch (e) {
      if (!e.isFallbackEligible) {
        console.warn('[PassengerSafetyService] Delete contact API warning:', e);
      }
    }

    const updated = contactsState.filter((c) => c.id !== contactId);
    persistState(updated);
    return updated;
  },

  subscribe(callback) {
    subscribers.push(callback);
    callback([...contactsState]);
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },
};
