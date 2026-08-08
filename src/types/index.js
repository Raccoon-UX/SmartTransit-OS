/**
 * SmartTransit OS Data Contracts & Type Schemas
 * (Provides type references and structural templates for future API/WebSocket integration)
 */

/**
 * @typedef {Object} GeoLocation
 * @property {number} lat - Latitude
 * @property {number} lng - Longitude
 * @property {number} [heading] - Degrees from North (0-360)
 * @property {number} [speed] - Speed in km/h
 */

/**
 * @typedef {Object} BusStop
 * @property {string} id - Stop UUID
 * @property {string} name - e.g. "Metro Central Hub"
 * @property {string} code - e.g. "BST-104"
 * @property {GeoLocation} location - Coordinates
 * @property {string[]} routes - Route IDs serving this stop
 * @property {boolean} hasDigitalDisplay - Whether physical IoT display is bound
 */

/**
 * @typedef {Object} TransitBus
 * @property {string} id - Vehicle UUID
 * @property {string} vehicleNumber - e.g. "NY-TR-8042"
 * @property {string} routeId - Assigned Route ID
 * @property {string} driverId - Assigned Driver ID
 * @property {string} status - Fleet status enum
 * @property {GeoLocation} location - Real-time GPS coordinates
 * @property {number} currentOccupancy - Current passenger count
 * @property {number} maxCapacity - Maximum vehicle capacity
 * @property {number} batteryOrFuelLevel - Percentage (0-100)
 * @property {string} lastPing - ISO timestamp of latest telemetry frame
 */

/**
 * @typedef {Object} TelemetryPacket
 * @property {string} busId - Bus ID
 * @property {GeoLocation} location - Current coordinates
 * @property {number} speed - Speed in km/h
 * @property {number} occupancy - Count of passengers
 * @property {number} nextStopEta - Estimated seconds to next stop
 * @property {string} nextStopId - Stop ID
 * @property {string} timestamp - ISO timestamp
 */

export const TypeContractOverview = {
  version: '1.0.0',
  standard: 'GTFS-Realtime + SmartTransit OS Telemetry v1',
};
