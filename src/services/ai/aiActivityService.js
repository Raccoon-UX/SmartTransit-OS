/**
 * SmartTransit OS — AI Activity Audit Log Service
 */
import { aiEngine } from './aiEngine.js';

export const aiActivityService = {
  subscribe(callback) {
    return aiEngine.subscribe((snapshot) => {
      callback({
        activityLog: snapshot.activityLog,
      });
    });
  },
};

export default aiActivityService;
