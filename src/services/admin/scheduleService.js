/**
 * SmartTransit OS — Transport Admin Schedule Dispatcher Service
 */

import { MOCK_ADMIN_SCHEDULES } from '../../data/admin/adminSchedules.js';

let schedulesState = [...MOCK_ADMIN_SCHEDULES];

export const scheduleService = {
  getSchedules(day = 'TODAY') {
    return schedulesState.filter((s) => s.day === day || day === 'ALL');
  },

  createSchedule({ routeCode, routeName, departureTime, arrivalTime, busNumber, driverName, day = 'TODAY' }) {
    const newSch = {
      id: `sch-${Math.floor(1000 + Math.random() * 9000)}`,
      routeCode: routeCode || 'RT-108',
      routeName: routeName || 'Metro Coastal Express',
      scheduledDeparture: departureTime || '11:00 AM',
      scheduledArrival: arrivalTime || '12:15 PM',
      assignedBus: busNumber || 'Bus 245',
      assignedDriver: driverName || 'Vikram Jadhav (PLT-042)',
      status: 'SCHEDULED',
      day,
    };
    schedulesState = [newSch, ...schedulesState];
    return newSch;
  },

  cancelSchedule(scheduleId) {
    schedulesState = schedulesState.filter((s) => s.id !== scheduleId);
    return [...schedulesState];
  },
};

export default scheduleService;
