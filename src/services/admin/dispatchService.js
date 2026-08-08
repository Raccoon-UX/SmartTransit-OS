/**
 * SmartTransit OS — Dispatch Center & Queue Service
 */

import { MOCK_ADMIN_DISPATCH } from '../../data/admin/adminDispatch.js';
import { activityService } from './activityService.js';

let dispatchState = { ...MOCK_ADMIN_DISPATCH };

export const dispatchService = {
  getDispatchQueue() {
    return { ...dispatchState };
  },

  assignPendingVehicle(pendingId, busNumber, driverId) {
    const item = dispatchState.pendingAssignments.find((p) => p.id === pendingId);
    dispatchState.pendingAssignments = dispatchState.pendingAssignments.filter((p) => p.id !== pendingId);

    activityService.logActivity({
      actor: 'Dispatcher Admin',
      action: 'ASSIGNED_BUS',
      details: `${busNumber} assigned to line ${item?.routeCode || 'RT-108'} with pilot ${driverId || 'PLT-042'}`,
    });

    return { ...dispatchState };
  },

  holdTrip(tripId) {
    activityService.logActivity({
      actor: 'Dispatcher Admin',
      action: 'TRIP_HELD',
      details: `Trip ${tripId} placed on operational hold`,
    });
  },

  resumeTrip(tripId) {
    activityService.logActivity({
      actor: 'Dispatcher Admin',
      action: 'TRIP_RESUMED',
      details: `Trip ${tripId} resumed service schedule`,
    });
  },
};

export default dispatchService;
