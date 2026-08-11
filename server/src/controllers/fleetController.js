import mongoose from 'mongoose';
import { Bus, Route, User, AuditLog } from '../models/index.js';

function sanitizeBusForPassenger(bus) {
  return {
    id: bus._id.toString(),
    busNumber: bus.busNumber,
    serial: bus.serial,
    status: bus.status,
    occupancyPercent: bus.occupancyPercent,
    occupancyStatus: bus.occupancyStatus,
    coordinates: bus.coordinates,
    speed: bus.speed,
    heading: bus.heading,
    lastPing: bus.lastPing,
    route: bus.routeId
      ? {
          id: bus.routeId._id?.toString(),
          routeCode: bus.routeId.routeCode,
          routeName: bus.routeId.routeName,
          origin: bus.routeId.origin,
          destination: bus.routeId.destination,
          color: bus.routeId.color,
        }
      : null,
    driver: bus.driverId
      ? {
          name: bus.driverId.name,
          badgeId: bus.driverId.driverProfile?.badgeId,
        }
      : null,
  };
}

export const fleetController = {
  /**
   * GET /api/v1/fleet
   */
  async getFleet(req, res, next) {
    try {
      const { status, routeId, driverId } = req.query;
      const query = {};

      if (status) query.status = status;
      if (routeId) {
        query.routeId = mongoose.isValidObjectId(routeId) ? routeId : undefined;
      }
      if (driverId) {
        query.driverId = mongoose.isValidObjectId(driverId) ? driverId : undefined;
      }

      const buses = await Bus.find(query)
        .populate('routeId', 'routeCode routeName origin destination color')
        .populate('driverId', 'name email driverProfile.badgeId role')
        .lean();

      if (req.user?.role === 'PASSENGER') {
        return res.status(200).json({
          success: true,
          data: buses.map(sanitizeBusForPassenger),
        });
      }

      res.status(200).json({
        success: true,
        data: buses,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/v1/fleet/:id
   */
  async getBusById(req, res, next) {
    try {
      const { id } = req.params;
      const query = mongoose.isValidObjectId(id) ? { _id: id } : { busNumber: id };

      const bus = await Bus.findOne(query)
        .populate('routeId', 'routeCode routeName origin destination color stops')
        .populate('driverId', 'name email driverProfile role')
        .lean();

      if (!bus) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'BUS_NOT_FOUND',
            message: `Bus '${id}' was not found in transit fleet.`,
          },
        });
      }

      if (req.user?.role === 'PASSENGER') {
        return res.status(200).json({
          success: true,
          data: sanitizeBusForPassenger(bus),
        });
      }

      res.status(200).json({
        success: true,
        data: bus,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /api/v1/fleet/:id/status
   * Roles: ADMIN, SOC
   */
  async updateBusStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['ON_TIME', 'DELAYED', 'ACTIVE', 'OFFLINE'];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_STATUS',
            message: `Status must be one of: [${validStatuses.join(', ')}].`,
          },
        });
      }

      const query = mongoose.isValidObjectId(id) ? { _id: id } : { busNumber: id };
      const bus = await Bus.findOneAndUpdate(
        query,
        { $set: { status, lastPing: new Date() } },
        { new: true }
      )
        .populate('routeId', 'routeCode routeName')
        .populate('driverId', 'name driverProfile.badgeId');

      if (!bus) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'BUS_NOT_FOUND',
            message: `Bus '${id}' not found.`,
          },
        });
      }

      // Record audit log
      await AuditLog.create({
        actorId: req.user._id,
        role: req.user.role,
        action: 'UPDATE_BUS',
        targetResource: 'Bus',
        targetResourceId: bus.busNumber,
        ipAddress: req.ip || '127.0.0.1',
        metadata: { newStatus: status },
      });

      res.status(200).json({
        success: true,
        data: bus,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/v1/fleet/:id/assign
   * Role: ADMIN
   */
  async assignDriverRoute(req, res, next) {
    try {
      const { id } = req.params;
      const { routeId, driverId } = req.body;

      if (!routeId || !driverId) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Both routeId and driverId are required for vehicle dispatch assignment.',
          },
        });
      }

      // Validate Route
      const routeQuery = mongoose.isValidObjectId(routeId) ? { _id: routeId } : { routeCode: routeId };
      const routeDoc = await Route.findOne(routeQuery);
      if (!routeDoc) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'ROUTE_NOT_FOUND',
            message: `Target route '${routeId}' does not exist.`,
          },
        });
      }

      // Validate Driver User
      const driverQuery = mongoose.isValidObjectId(driverId)
        ? { _id: driverId }
        : { $or: [{ email: driverId }, { 'driverProfile.badgeId': driverId }] };

      const driverDoc = await User.findOne(driverQuery);
      if (!driverDoc) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'DRIVER_NOT_FOUND',
            message: `Target driver '${driverId}' does not exist.`,
          },
        });
      }

      if (driverDoc.role !== 'DRIVER') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_DRIVER_ROLE',
            message: `User '${driverDoc.name}' (${driverDoc.role}) is not authorized as a transit DRIVER.`,
          },
        });
      }

      const busQuery = mongoose.isValidObjectId(id) ? { _id: id } : { busNumber: id };
      const bus = await Bus.findOneAndUpdate(
        busQuery,
        {
          $set: {
            routeId: routeDoc._id,
            driverId: driverDoc._id,
            status: 'ACTIVE',
            lastPing: new Date(),
          },
        },
        { new: true }
      )
        .populate('routeId', 'routeCode routeName origin destination color')
        .populate('driverId', 'name email driverProfile.badgeId');

      if (!bus) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'BUS_NOT_FOUND',
            message: `Bus '${id}' not found for assignment.`,
          },
        });
      }

      // Update Driver assignedBusId
      await User.findByIdAndUpdate(driverDoc._id, {
        $set: { 'driverProfile.assignedBusId': bus._id },
      });

      // Record audit log
      await AuditLog.create({
        actorId: req.user._id,
        role: req.user.role,
        action: 'DISPATCH_FLEET',
        targetResource: 'Bus',
        targetResourceId: bus.busNumber,
        ipAddress: req.ip || '127.0.0.1',
        metadata: {
          routeCode: routeDoc.routeCode,
          driverBadge: driverDoc.driverProfile?.badgeId || driverDoc.name,
        },
      });

      res.status(200).json({
        success: true,
        data: bus,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default fleetController;
