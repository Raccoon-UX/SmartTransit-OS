import mongoose from 'mongoose';
import { Alert, AuditLog } from '../models/index.js';

export const alertController = {
  /**
   * GET /api/v1/alerts
   * PUBLIC / Authenticated
   */
  async getAlerts(req, res, next) {
    try {
      const { isActive, severity, affectedRouteCode } = req.query;
      const query = {};

      if (isActive !== undefined) {
        query.isActive = isActive === 'true' || isActive === true;
      }
      if (severity) query.severity = severity.toUpperCase();
      if (affectedRouteCode) query.affectedRouteCode = affectedRouteCode.toUpperCase();

      const alerts = await Alert.find(query)
        .sort({ createdAt: -1 })
        .lean();

      res.status(200).json({
        success: true,
        data: alerts,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/v1/alerts/:id
   */
  async getAlertById(req, res, next) {
    try {
      const { id } = req.params;
      const query = mongoose.isValidObjectId(id)
        ? { _id: id }
        : { alertId: id.trim().toUpperCase() };

      const alert = await Alert.findOne(query).lean();

      if (!alert) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'ALERT_NOT_FOUND',
            message: `Advisory alert '${id}' was not found.`,
          },
        });
      }

      res.status(200).json({
        success: true,
        data: alert,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/v1/alerts
   * Roles: ADMIN, SOC
   */
  async createAlert(req, res, next) {
    try {
      const { title, message, severity, category, affectedRouteCode } = req.body;

      if (!title || !message) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Both title and message are required to broadcast an alert.',
          },
        });
      }

      const alertId = `ALT-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
      const validSeverity = ['INFO', 'WARNING', 'CRITICAL'].includes(severity)
        ? severity
        : 'INFO';

      const alert = await Alert.create({
        alertId,
        title: title.trim(),
        message: message.trim(),
        severity: validSeverity,
        category: category || 'TRANSIT_ADVISORY',
        affectedRouteCode: affectedRouteCode ? affectedRouteCode.toUpperCase() : null,
        isActive: true,
      });

      // Audit Log
      await AuditLog.create({
        actorId: req.user._id,
        role: req.user.role,
        action: 'CREATE_ALERT',
        targetResource: 'Alert',
        targetResourceId: alertId,
        ipAddress: req.ip || '127.0.0.1',
        metadata: { title, severity: validSeverity, affectedRouteCode },
      });

      res.status(201).json({
        success: true,
        data: alert,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /api/v1/alerts/:id
   * Roles: ADMIN, SOC
   */
  async updateAlert(req, res, next) {
    try {
      const { id } = req.params;
      const { title, message, severity, isActive } = req.body;

      const query = mongoose.isValidObjectId(id)
        ? { _id: id }
        : { alertId: id.trim().toUpperCase() };

      const updateData = {};
      if (title !== undefined) updateData.title = title.trim();
      if (message !== undefined) updateData.message = message.trim();
      if (severity !== undefined) updateData.severity = severity.toUpperCase();
      if (isActive !== undefined) updateData.isActive = isActive;

      const alert = await Alert.findOneAndUpdate(query, { $set: updateData }, { new: true });

      if (!alert) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'ALERT_NOT_FOUND',
            message: `Alert '${id}' not found.`,
          },
        });
      }

      // Audit Log
      await AuditLog.create({
        actorId: req.user._id,
        role: req.user.role,
        action: 'CREATE_ALERT',
        targetResource: 'Alert',
        targetResourceId: alert.alertId,
        ipAddress: req.ip || '127.0.0.1',
        metadata: { updateData },
      });

      res.status(200).json({
        success: true,
        data: alert,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default alertController;
