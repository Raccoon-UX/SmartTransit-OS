/**
 * SmartTransit OS — Multi-Option Journey Planner Dataset
 */

export const MOCK_JOURNEY_PLANS = [
  {
    id: 'jp-opt-1',
    title: 'Option 1 — Fastest Transit',
    badge: 'RECOMMENDED',
    totalDuration: '32 mins',
    departureTime: '10:15 AM',
    arrivalTime: '10:47 AM',
    walkingDuration: '4 mins',
    transitDuration: '28 mins',
    transfersCount: 0,
    fare: '₹25',
    occupancyPercent: 78,
    occupancyStatus: 'HIGH',
    segments: [
      { type: 'WALK', instruction: 'Walk 350m to Borivali Station Platform A', duration: '4 min', icon: 'Walk' },
      { type: 'BUS', busNumber: 'Bus 245', routeCode: 'RT-108', instruction: 'Board Bus 245 toward Andheri West Exchange', duration: '24 min', stopsCount: 5, icon: 'Bus' },
      { type: 'WALK', instruction: 'Alight at Western Highway Exchange & walk to destination', duration: '4 min', icon: 'Walk' },
    ],
  },
  {
    id: 'jp-opt-2',
    title: 'Option 2 — Fewer Transfers (Direct Feeder)',
    badge: 'LESS CROWDED',
    totalDuration: '38 mins',
    departureTime: '10:20 AM',
    arrivalTime: '10:58 AM',
    walkingDuration: '6 mins',
    transitDuration: '32 mins',
    transfersCount: 0,
    fare: '₹20',
    occupancyPercent: 42,
    occupancyStatus: 'LOW',
    segments: [
      { type: 'WALK', instruction: 'Walk 500m to Metro Interchange Terminal', duration: '6 min', icon: 'Walk' },
      { type: 'BUS', busNumber: 'Bus 312', routeCode: 'RT-204', instruction: 'Board Bus 312 toward Airport Terminal', duration: '28 min', stopsCount: 4, icon: 'Bus' },
      { type: 'WALK', instruction: 'Alight at Aviation Gate South', duration: '4 min', icon: 'Walk' },
    ],
  },
  {
    id: 'jp-opt-3',
    title: 'Option 3 — Minimal Walking',
    badge: 'EASY ACCESS',
    totalDuration: '41 mins',
    departureTime: '10:12 AM',
    arrivalTime: '10:53 AM',
    walkingDuration: '2 mins',
    transitDuration: '39 mins',
    transfersCount: 1,
    fare: '₹35',
    occupancyPercent: 58,
    occupancyStatus: 'MEDIUM',
    segments: [
      { type: 'WALK', instruction: 'Walk 100m to City Center Hub', duration: '2 min', icon: 'Walk' },
      { type: 'BUS', busNumber: 'Bus 118', routeCode: 'RT-302', instruction: 'Board Bus 118 toward Tech Park', duration: '35 min', stopsCount: 8, icon: 'Bus' },
      { type: 'WALK', instruction: 'Arrive at Silicon Boulevard Gate', duration: '4 min', icon: 'Walk' },
    ],
  },
];
