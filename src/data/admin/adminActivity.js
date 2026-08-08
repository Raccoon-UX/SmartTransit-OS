/**
 * SmartTransit OS — Isolated Dispatch Activity Stream Dataset
 */

export const INITIAL_DISPATCH_ACTIVITY = [
  {
    id: 'act-01',
    timestamp: '09:58 AM',
    actor: 'Dispatcher #02',
    action: 'REASSIGNED_VEHICLE',
    details: 'Bus 312 reassigned to RT-204 Airport Link',
    status: 'SUCCESS',
  },
  {
    id: 'act-02',
    timestamp: '09:51 AM',
    actor: 'System Sensor',
    action: 'DELAY_DETECTED',
    details: 'RT-415 delayed by 6 min near Airoli Toll Plaza',
    status: 'WARNING',
  },
  {
    id: 'act-03',
    timestamp: '09:45 AM',
    actor: 'Pilot PLT-042',
    action: 'TRIP_STARTED',
    details: 'Bus 245 started trip on RT-108 Borivali → Andheri',
    status: 'SUCCESS',
  },
  {
    id: 'act-04',
    timestamp: '09:42 AM',
    actor: 'Dispatcher #01',
    action: 'ASSIGNED_BUS',
    details: 'Bus 245 assigned to RT-108 with Pilot PLT-042',
    status: 'SUCCESS',
  },
];
