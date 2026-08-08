/**
 * SmartTransit OS — Transport Admin Fleet Service
 */

import { MOCK_ADMIN_FLEET } from '../../data/admin/adminFleet.js';

let fleetState = [...MOCK_ADMIN_FLEET];
let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb([...fleetState]));
}

export const fleetService = {
  getFleet() {
    return [...fleetState];
  },

  subscribeFleet(callback) {
    subscribers.push(callback);
    callback([...fleetState]);
    return () => {
      subscribers = subscribers.filter((cb) => cb !== callback);
    };
  },

  getBusById(busId) {
    return (
      fleetState.find(
        (b) => b.id === busId || b.busNumber.toLowerCase() === busId.toLowerCase()
      ) || fleetState[0]
    );
  },

  assignRouteAndDriver({ busId, routeId, routeName, driverId, driverName }) {
    fleetState = fleetState.map((b) => {
      if (b.id === busId || b.busNumber === busId) {
        return {
          ...b,
          routeId: routeId || b.routeId,
          routeName: routeName || b.routeName,
          driverId: driverId || b.driverId,
          driverName: driverName || b.driverName,
          status: 'ACTIVE',
        };
      }
      return b;
    });
    notify();
    return fleetState.find((b) => b.id === busId || b.busNumber === busId);
  },

  updateBusStatus(busId, status) {
    fleetState = fleetState.map((b) => (b.id === busId ? { ...b, status } : b));
    notify();
    return fleetState.find((b) => b.id === busId);
  },
};

export default fleetService;
