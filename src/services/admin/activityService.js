/**
 * SmartTransit OS — Dispatch Activity Feed Log Service
 */

import { INITIAL_DISPATCH_ACTIVITY } from '../../data/admin/adminActivity.js';

let activityState = [...INITIAL_DISPATCH_ACTIVITY];
let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb([...activityState]));
}

export const activityService = {
  getActivity() {
    return [...activityState];
  },

  subscribe(callback) {
    subscribers.push(callback);
    callback([...activityState]);
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  logActivity({ actor = 'System Dispatcher', action = 'OPERATIONAL_EVENT', details = '' }) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAct = {
      id: `act-${Math.floor(100 + Math.random() * 900)}`,
      timestamp,
      actor,
      action,
      details,
      status: 'SUCCESS',
    };
    activityState = [newAct, ...activityState];
    notify();
    return newAct;
  },
};

export default activityService;
