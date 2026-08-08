/**
 * SmartTransit OS — Driver Service
 * Manages driver credentials, assignments, and vehicle diagnostics.
 */

import { MOCK_DRIVER_PROFILE } from '../../data/driver/driverProfile.js';
import { MOCK_DRIVER_ASSIGNMENT } from '../../data/driver/driverAssignment.js';

export const driverService = {
  async getProfile() {
    await new Promise((res) => setTimeout(res, 80));
    return { ...MOCK_DRIVER_PROFILE };
  },

  async getAssignment() {
    await new Promise((res) => setTimeout(res, 100));
    return { ...MOCK_DRIVER_ASSIGNMENT };
  },

  async getVehicleDiagnostics() {
    await new Promise((res) => setTimeout(res, 50));
    return { ...MOCK_DRIVER_ASSIGNMENT.vehicleDiagnostics };
  },
};

export default driverService;
