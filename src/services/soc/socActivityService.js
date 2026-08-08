/**
 * SmartTransit OS — Central SOC Audit Event Stream Service
 */

import { INITIAL_SOC_ACTIVITY } from '../../data/soc/socActivity.js';

let activityState = [...INITIAL_SOC_ACTIVITY];
let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb([...activityState]));
}

export const socActivityService = {
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

  logActivity({ actor = 'System Watchdog', action = 'SOC_EVENT', details = '', status = 'INFO' }) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAct = {
      id: `soc-act-${Math.floor(100 + Math.random() * 900)}`,
      timestamp,
      actor,
      action,
      details,
      status,
    };
    activityState = [newAct, ...activityState];
    notify();
    return newAct;
  },
};

export default socActivityService;
