/**
 * SmartTransit OS — Driver Occupancy Service
 * Manages passenger counts, density levels, and quick occupancy presets.
 */

import { INITIAL_DRIVER_OCCUPANCY } from '../../data/driver/driverOccupancy.js';

let occupancyState = { ...INITIAL_DRIVER_OCCUPANCY };
let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb({ ...occupancyState }));
}

function calculateStatus(percent) {
  if (percent < 50) return 'LOW';
  if (percent <= 75) return 'MEDIUM';
  if (percent <= 90) return 'HIGH';
  return 'FULL';
}

export const occupancyService = {
  getOccupancy() {
    return { ...occupancyState };
  },

  subscribeOccupancy(callback) {
    subscribers.push(callback);
    callback({ ...occupancyState });
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  setPassengerCount(count) {
    const validCount = Math.max(0, Math.min(occupancyState.totalCapacity, count));
    const percent = Math.round((validCount / occupancyState.totalCapacity) * 100);
    const status = calculateStatus(percent);

    occupancyState = {
      ...occupancyState,
      totalPassengers: validCount,
      seatedPassengers: Math.min(38, validCount),
      standingPassengers: Math.max(0, validCount - 38),
      occupancyPercent: percent,
      occupancyStatus: status,
    };
    notify();
    return { ...occupancyState };
  },

  incrementPassengers(delta = 1) {
    return this.setPassengerCount(occupancyState.totalPassengers + delta);
  },

  decrementPassengers(delta = 1) {
    return this.setPassengerCount(occupancyState.totalPassengers - delta);
  },

  setPreset(level) {
    // level: 'LOW' | 'MEDIUM' | 'HIGH' | 'FULL'
    let count = 13; // ~25%
    if (level === 'MEDIUM') count = 26; // 50%
    if (level === 'HIGH') count = 41; // ~78%
    if (level === 'FULL') count = 52; // 100%

    return this.setPassengerCount(count);
  },
};

export default occupancyService;
