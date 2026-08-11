import { apiClient } from '../api/apiClient.js';
import { MOCK_ADMIN_FLEET } from '../../data/admin/adminFleet.js';

let fleetState = [...MOCK_ADMIN_FLEET];
let subscribers = [];

function notify() {
  subscribers.forEach((cb) => cb([...fleetState]));
}

function normalizeAdminBus(b) {
  return {
    id: b.busNumber || b._id,
    busNumber: b.busNumber,
    serial: b.serial || 'NY-TR-8042',
    model: b.model || 'Volvo 9400 B11R Multi-Axle',
    routeId: b.routeId?.routeCode || b.routeId?._id || b.routeId || 'RT-108',
    routeName: b.routeId?.routeName || b.routeName || 'Metro Coastal Express Line',
    driverId: b.driverId?.driverProfile?.badgeId || b.driverId?._id || b.driverId || 'PLT-042',
    driverName: b.driverId?.name || b.driverName || 'Vikram Jadhav',
    status: b.status || 'ACTIVE',
    occupancyPercent: b.occupancyPercent !== undefined ? b.occupancyPercent : 68,
    occupancyStatus: b.occupancyStatus || 'MEDIUM',
    batteryFuel: b.batteryFuel || '88%',
    speed: `${b.speed || 42} km/h`,
    lastMaintenance: b.lastMaintenance || '2026-07-28',
    nextMaintenance: b.nextMaintenance || '2026-08-28',
    depot: b.depot || 'Western Express Depot (Bay 4)',
  };
}

export const fleetService = {
  async getFleet() {
    try {
      const data = await apiClient.get('/fleet');
      if (Array.isArray(data) && data.length > 0) {
        fleetState = data.map(normalizeAdminBus);
        return [...fleetState];
      }
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[AdminFleetService] Fetch warning:', error);
      }
    }
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
        (b) => b.id === busId || b.busNumber?.toLowerCase() === busId?.toLowerCase()
      ) || fleetState[0]
    );
  },

  async assignRouteAndDriver({ busId, routeId, routeName, driverId, driverName }) {
    try {
      await apiClient.post(`/fleet/${encodeURIComponent(busId)}/assign`, {
        routeId: routeId || 'RT-108',
        driverId: driverId || 'PLT-042',
      });
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[AdminFleetService] Assign warning:', error);
      }
    }

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

  async updateBusStatus(busId, status) {
    try {
      await apiClient.patch(`/fleet/${encodeURIComponent(busId)}/status`, { status });
    } catch (error) {
      if (!error.isFallbackEligible) {
        console.warn('[AdminFleetService] Status update warning:', error);
      }
    }

    fleetState = fleetState.map((b) => (b.id === busId || b.busNumber === busId ? { ...b, status } : b));
    notify();
    return fleetState.find((b) => b.id === busId || b.busNumber === busId);
  },
};

export default fleetService;
