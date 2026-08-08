/**
 * SmartTransit OS — Driver Incident and Emergency SOS Models
 */

export const MOCK_INCIDENT_CATEGORIES = [
  { id: 'VEHICLE_BREAKDOWN', label: 'Vehicle Problem / Mechanical', description: 'Engine warning, tire pressure drop, door sensor fault' },
  { id: 'ROUTE_OBSTRUCTION', label: 'Route Problem / Road Hazard', description: 'Flooding, construction roadblock, fallen tree' },
  { id: 'PASSENGER_INCIDENT', label: 'Passenger Issue / Fare Dispute', description: 'Medical discomfort, disorderly conduct, lost luggage' },
  { id: 'TRAFFIC_GRIDLOCK', label: 'Severe Traffic Delay', description: 'Highway congestion causing > 15 min schedule deviation' },
  { id: 'WEATHER_HAZARD', label: 'Severe Weather / Heavy Rain', description: 'Reduced visibility, waterlogging on bus lane' },
  { id: 'OTHER_OPERATIONAL', label: 'Other Operational Issue', description: 'Ticketing kiosk malfunction, depot communication' },
];

export const INITIAL_DRIVER_INCIDENTS = [
  {
    id: 'INC-2026-0089',
    category: 'TRAFFIC_GRIDLOCK',
    title: 'Goregaon Flyover Traffic Slowdown',
    severity: 'MEDIUM',
    stop: 'Goregaon IT Park Hub',
    status: 'RESOLVED',
    timestamp: 'Yesterday at 04:30 PM',
    dispatchNotes: 'Transit controller adjusted departure interval by +3 mins.',
  },
];
