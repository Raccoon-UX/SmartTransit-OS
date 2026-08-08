/**
 * SmartTransit OS — Centralized Shared Entity Constants
 * Maintains strict cross-module entity consistency across Passenger, Driver, Admin, SOC, and AI.
 */

export const SHARED_ENTITIES = {
  PRIMARY_BUS: {
    id: 'b-245',
    busNumber: 'Bus 245',
    serial: 'NY-TR-8042',
    routeId: 'RT-108',
    routeName: 'Metro Coastal Express Line',
    driverId: 'PLT-042',
    driverName: 'Vikram Jadhav',
    depot: 'Western Express Depot #4',
    currentLocation: 'Dahisar Check Naka',
    nextStop: 'Magathane Junction',
    nextStopCode: 'BST-048',
    scheduledEta: '10:42',
    telemetryEta: '10:43',
    aiPredictedEta: '10:44',
  },
  AIRPORT_BUS: {
    id: 'b-312',
    busNumber: 'Bus 312',
    serial: 'NY-TR-9914',
    routeId: 'RT-204',
    routeName: 'Airport Superfast Highway Link',
    driverId: 'PLT-108',
    driverName: 'Ramesh K.',
    depot: 'Central Aviation Depot #2',
    currentLocation: 'Vile Parle Flyover',
    nextStop: 'Aviation Gate South',
    nextStopCode: 'BST-208',
  },
  CBD_BUS: {
    id: 'b-118',
    busNumber: 'Bus 118',
    serial: 'NY-TR-4402',
    routeId: 'RT-302',
    routeName: 'Central Business District Feeder',
    driverId: 'PLT-212',
    driverName: 'Sanjay M.',
    depot: 'CBD Transit Hub Depot #1',
    currentLocation: 'BKC Junction',
    nextStop: 'Tech Park Station',
  },
  EXPRESS_BUS: {
    id: 'b-504',
    busNumber: 'Bus 504',
    serial: 'NY-TR-3381',
    routeId: 'RT-415',
    routeName: 'Suburban Ring Expressway',
    driverId: 'PLT-315',
    driverName: 'Anil P.',
    depot: 'Eastern Harbor Depot #3',
    currentLocation: 'Airoli Toll Plaza',
    nextStop: 'Vashi Sector 17',
  },
};

