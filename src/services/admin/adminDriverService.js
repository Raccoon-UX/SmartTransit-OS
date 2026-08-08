/**
 * SmartTransit OS — Transport Admin Driver Service
 */

import { MOCK_ADMIN_DRIVERS } from '../../data/admin/adminDrivers.js';

let driversState = [...MOCK_ADMIN_DRIVERS];

export const adminDriverService = {
  getDrivers() {
    return [...driversState];
  },

  getDriverById(driverId) {
    return (
      driversState.find(
        (d) => d.id === driverId || d.name.toLowerCase().includes(driverId.toLowerCase())
      ) || driversState[0]
    );
  },

  assignVehicle({ driverId, busNumber, routeCode }) {
    driversState = driversState.map((d) => {
      if (d.id === driverId) {
        return {
          ...d,
          assignedBus: busNumber || d.assignedBus,
          assignedRoute: routeCode || d.assignedRoute,
          status: 'ACTIVE',
        };
      }
      return d;
    });
    return driversState.find((d) => d.id === driverId);
  },
};

export default adminDriverService;
