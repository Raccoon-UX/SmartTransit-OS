import mongoose from 'mongoose';
import { Stop } from '../models/Stop.js';

export const stopController = {
  /**
   * GET /api/v1/stops
   * PUBLIC
   */
  async getStops(req, res, next) {
    try {
      const { zone, routeId } = req.query;
      const query = {};

      if (zone) {
        query.zone = { $regex: zone.trim(), $options: 'i' };
      }
      if (routeId) {
        query.connectedRoutes = mongoose.isValidObjectId(routeId) ? routeId : undefined;
      }

      const stops = await Stop.find(query)
        .populate('connectedRoutes', 'routeCode routeName color origin destination')
        .lean();

      res.status(200).json({
        success: true,
        data: stops,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/v1/stops/:id
   * PUBLIC
   */
  async getStopById(req, res, next) {
    try {
      const { id } = req.params;
      const query = mongoose.isValidObjectId(id)
        ? { _id: id }
        : { code: id.trim().toUpperCase() };

      const stop = await Stop.findOne(query)
        .populate('connectedRoutes', 'routeCode routeName color origin destination')
        .lean();

      if (!stop) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'STOP_NOT_FOUND',
            message: `Transit stop '${id}' was not found.`,
          },
        });
      }

      res.status(200).json({
        success: true,
        data: stop,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default stopController;
