/**
 * SmartTransit OS — Isolated Driver Mock Assignment
 */

export const MOCK_DRIVER_ASSIGNMENT = {
  busNumber: 'Bus 245',
  busSerial: 'NY-TR-8042',
  vehicleType: 'Electric AC Double-Decker',
  routeCode: 'RT-108',
  routeName: 'Metro Coastal Express Line',
  origin: 'Borivali Central Hub',
  destination: 'Andheri West Exchange',
  shiftTiming: '05:30 AM – 02:00 PM',
  scheduledDeparture: '10:15 AM',
  totalStops: 32,
  completedStopsCount: 8,
  currentStopName: 'Dahisar Check Naka (BST-024)',
  nextStopName: 'Magathane Junction (BST-048)',
  nextStopDistance: '1.2 km',
  nextStopEta: '3 min',
  nextStopWaitingPassengers: 18,
  etaToDestination: '18 min',
  tripProgressPercent: 42,
  operationalStatus: 'READY FOR DEPARTURE', // READY FOR DEPARTURE | EN ROUTE | DELAYED | AT STOP
  vehicleDiagnostics: {
    gpsStatus: 'ONLINE',
    engineStatus: 'NORMAL',
    networkStatus: 'CONNECTED',
    tripSync: 'ACTIVE',
    batteryLevel: '84%',
    tirePressure: '36 PSI (All Wheels)',
    telemetryLatency: '42ms',
    odometer: '18,420 km',
  },
};
