/**
 * SmartTransit OS — Isolated Dispatch Center Dataset
 */

export const MOCK_ADMIN_DISPATCH = {
  pendingAssignments: [
    { id: 'dsp-p1', routeCode: 'RT-520', routeName: 'Tech Corridor Loop', departureTime: '11:30 AM', requiredType: 'Electric AC Single', priority: 'HIGH' },
    { id: 'dsp-p2', routeCode: 'RT-108', routeName: 'Metro Coastal Express', departureTime: '11:45 AM', requiredType: 'Double-Decker AC', priority: 'NORMAL' },
  ],
  unassignedVehicles: [
    { busNumber: 'Bus 108', serial: 'NY-TR-1190', depot: 'BKC Tech Depot #1', battery: '100%', status: 'READY' },
    { busNumber: 'Bus 520', serial: 'NY-TR-5510', depot: 'Central Depot #1', battery: '95%', status: 'STANDBY' },
  ],
  unassignedDrivers: [
    { driverId: 'PLT-501', name: 'Rajesh V.', shift: 'Standby Morning', depot: 'Central Depot #1' },
  ],
  delayedTrips: [
    { tripId: 'trp-415-02', busNumber: 'Bus 504', routeCode: 'RT-415', delayMinutes: 6, cause: 'Airoli Toll Congestion' },
  ],
};
