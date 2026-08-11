import mongoose from 'mongoose';
import { Route } from '../models/Route.js';

export const routeController = {
  /**
   * GET /api/v1/routes
   * PUBLIC
   */
  async getRoutes(req, res, next) {
    try {
      const { routeCode, origin, destination } = req.query;
      const query = {};

      if (routeCode) {
        query.routeCode = routeCode.trim().toUpperCase();
      }
      if (origin) {
        query.origin = { $regex: origin.trim(), $options: 'i' };
      }
      if (destination) {
        query.destination = { $regex: destination.trim(), $options: 'i' };
      }

      const routes = await Route.find(query).lean();

      res.status(200).json({
        success: true,
        data: routes,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/v1/routes/:id
   * PUBLIC
   */
  async getRouteById(req, res, next) {
    try {
      const { id } = req.params;
      const query = mongoose.isValidObjectId(id)
        ? { _id: id }
        : { routeCode: id.trim().toUpperCase() };

      const route = await Route.findOne(query).lean();

      if (!route) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'ROUTE_NOT_FOUND',
            message: `Route '${id}' was not found in transit network.`,
          },
        });
      }

      res.status(200).json({
        success: true,
        data: route,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default routeController;
