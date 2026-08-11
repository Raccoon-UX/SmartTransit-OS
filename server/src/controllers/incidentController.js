import mongoose from 'mongoose';
import { Incident, User, AuditLog } from '../models/index.js';

export const incidentController = {
  /**
   * GET /api/v1/incidents
   * Role-aware filtering:
   * - SOC / ADMIN: view all incidents
   * - DRIVER: view route & vehicle incidents or own reported incidents
   * - PASSENGER: view public-facing disruptions
   */
  async getIncidents(req, res, next) {
    try {
      const { status, severity, busNumber } = req.query;
      const query = {};

      if (status) query.status = status;
      if (severity) query.severity = severity;
      if (busNumber) query.busNumber = busNumber;

      if (req.user?.role === 'PASSENGER') {
        // Passengers only see open disruptions / major events
        query.status = { $in: ['OPEN', 'INVESTIGATING'] };
      } else if (req.user?.role === 'DRIVER') {
        // Drivers see their own reports or open route incidents
        query.$or = [
          { reportedBy: req.user._id },
          { busNumber: req.user.driverProfile?.assignedBusId ? undefined : null },
          { status: { $in: ['OPEN', 'INVESTIGATING', 'RESOLVED'] } },
        ].filter(Boolean);
      }

      const incidents = await Incident.find(query)
        .populate('reportedBy', 'name email role driverProfile.badgeId')
        .populate('timeline.actorId', 'name role')
        .sort({ createdAt: -1 })
        .lean();

      res.status(200).json({
        success: true,
        data: incidents,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/v1/incidents/:id
   */
  async getIncidentById(req, res, next) {
    try {
      const { id } = req.params;
      const query = mongoose.isValidObjectId(id)
        ? { _id: id }
        : { incidentCode: id.trim().toUpperCase() };

      const incident = await Incident.findOne(query)
        .populate('reportedBy', 'name email role driverProfile.badgeId')
        .populate('timeline.actorId', 'name role')
        .lean();

      if (!incident) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'INCIDENT_NOT_FOUND',
            message: `Transit incident '${id}' was not found.`,
          },
        });
      }

      res.status(200).json({
        success: true,
        data: incident,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/v1/incidents
   * Roles: DRIVER, ADMIN, SOC
   */
  async createIncident(req, res, next) {
    try {
      const { title, severity, type, location, busNumber, message } = req.body;

      if (!title || !location) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Both title and location are required to file a transit incident report.',
          },
        });
      }

      const incidentCode = `INC-${new Date().getFullYear()}-${Date.now().toString().slice(-4)}`;
      const validSeverity = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(severity)
        ? severity
        : 'MEDIUM';

      const initialTimeline = [
        {
          timestamp: new Date(),
          status: 'OPEN',
          message: message || `Incident reported by ${req.user.name} (${req.user.role}).`,
          actorId: req.user._id,
        },
      ];

      const newIncident = await Incident.create({
        incidentCode,
        title: title.trim(),
        severity: validSeverity,
        type: type || 'OPERATIONAL',
        location: location.trim(),
        busNumber: busNumber || null,
        reportedBy: req.user._id,
        status: 'OPEN',
        timeline: initialTimeline,
      });

      // Record Audit Log
      await AuditLog.create({
        actorId: req.user._id,
        role: req.user.role,
        action: 'RESOLVE_INCIDENT',
        targetResource: 'Incident',
        targetResourceId: incidentCode,
        ipAddress: req.ip || '127.0.0.1',
        metadata: { severity: validSeverity, title },
      });

      const populated = await Incident.findById(newIncident._id)
        .populate('reportedBy', 'name email role driverProfile.badgeId');

      res.status(201).json({
        success: true,
        data: populated,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * PATCH /api/v1/incidents/:id/status
   * Roles: ADMIN, SOC, DRIVER (own incident)
   */
  async updateIncidentStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, resolutionNote } = req.body;

      const validStatuses = ['OPEN', 'INVESTIGATING', 'RESOLVED'];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_STATUS',
            message: `Status must be one of: [${validStatuses.join(', ')}].`,
          },
        });
      }

      const query = mongoose.isValidObjectId(id)
        ? { _id: id }
        : { incidentCode: id.trim().toUpperCase() };

      const incident = await Incident.findOne(query);

      if (!incident) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'INCIDENT_NOT_FOUND',
            message: `Incident '${id}' was not found.`,
          },
        });
      }

      // Check ownership if caller is DRIVER
      if (
        req.user.role === 'DRIVER' &&
        incident.reportedBy?.toString() !== req.user._id.toString()
      ) {
        return res.status(403).json({
          success: false,
          error: {
            code: 'FORBIDDEN_INCIDENT_MUTATION',
            message: 'Drivers are only authorized to update incidents they personally reported.',
          },
        });
      }

      incident.status = status;
      incident.timeline.push({
        timestamp: new Date(),
        status,
        message: resolutionNote || `Status updated to ${status} by ${req.user.name}.`,
        actorId: req.user._id,
      });

      await incident.save();

      // Audit Log
      await AuditLog.create({
        actorId: req.user._id,
        role: req.user.role,
        action: 'RESOLVE_INCIDENT',
        targetResource: 'Incident',
        targetResourceId: incident.incidentCode,
        ipAddress: req.ip || '127.0.0.1',
        metadata: { newStatus: status, resolutionNote },
      });

      res.status(200).json({
        success: true,
        data: incident,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default incidentController;
