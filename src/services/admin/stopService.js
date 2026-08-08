/**
 * SmartTransit OS — Transport Admin Stop Service
 */

import { MOCK_ADMIN_STOPS } from '../../data/admin/adminStops.js';

let stopsState = [...MOCK_ADMIN_STOPS];

export const stopService = {
  getStops() {
    return [...stopsState];
  },

  getStopById(stopId) {
    return (
      stopsState.find(
        (s) => s.id === stopId || s.code.toLowerCase() === stopId.toLowerCase()
      ) || stopsState[0]
    );
  },

  toggleStopStatus(stopId) {
    stopsState = stopsState.map((s) => {
      if (s.id === stopId) {
        const nextStatus = s.status === 'ACTIVE' ? 'CLOSED' : 'ACTIVE';
        return { ...s, status: nextStatus };
      }
      return s;
    });
    return stopsState.find((s) => s.id === stopId);
  },
};

export default stopService;
