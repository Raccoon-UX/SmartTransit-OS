/**
 * SmartTransit OS — Driver Occupancy State Model
 */

export const INITIAL_DRIVER_OCCUPANCY = {
  totalCapacity: 52,
  seatedPassengers: 38,
  standingPassengers: 3,
  totalPassengers: 41,
  occupancyPercent: 78,
  occupancyStatus: 'HIGH', // LOW (0-50%), MEDIUM (51-75%), HIGH (76-90%), FULL (91-100%)
  doorsState: 'CLOSED', // OPEN | CLOSED
  rampDeployed: false,
};
