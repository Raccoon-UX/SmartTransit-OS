import { aiIntelligenceService } from '../services/aiIntelligenceService.js';
import { AuditLog } from '../models/AuditLog.js';
import { getIoInstance } from '../sockets/telemetrySocket.js';

export const aiController = {
  async getOverview(req, res, next) {
    try {
      const userRole = req.user?.role || 'PASSENGER';
      const overview = await aiIntelligenceService.getAiOverview(userRole);
      res.json({ success: true, data: overview });
    } catch (err) {
      next(err);
    }
  },

  async getEtaPredictions(req, res, next) {
    try {
      const busNumber = req.query.busNumber || null;
      const predictions = await aiIntelligenceService.getEtaPredictions(busNumber);
      res.json({ success: true, data: predictions });
    } catch (err) {
      next(err);
    }
  },

  async getOccupancyForecasts(req, res, next) {
    try {
      const forecasts = await aiIntelligenceService.getOccupancyForecasts();
      res.json({ success: true, data: forecasts });
    } catch (err) {
      next(err);
    }
  },

  async getAnomalies(req, res, next) {
    try {
      const anomalies = await aiIntelligenceService.getAnomalies();
      res.json({ success: true, data: anomalies });
    } catch (err) {
      next(err);
    }
  },

  async getRecommendations(req, res, next) {
    try {
      const recommendations = await aiIntelligenceService.getRecommendations();
      res.json({ success: true, data: recommendations });
    } catch (err) {
      next(err);
    }
  },

  async updateRecommendationStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status, reason } = req.body;

      if (!['APPROVED', 'REJECTED'].includes(status)) {
        return res.status(400).json({
          success: false,
          error: { code: 'INVALID_STATUS', message: 'Status must be APPROVED or REJECTED' },
        });
      }

      let result;
      if (status === 'APPROVED') {
        result = await aiIntelligenceService.approveRecommendation(id, req.user);
      } else {
        result = await aiIntelligenceService.rejectRecommendation(id, req.user, reason);
      }

      // Log human-authorized action to AuditLog
      await AuditLog.create({
        actorId: req.user._id || req.user.sub,
        role: req.user.role || 'ADMIN',
        action: 'DISPATCH_FLEET',
        targetResource: 'AI_INSIGHT',
        targetResourceId: id,
        metadata: { aiRecommendationStatus: status, reason: reason || 'N/A' },
      }).catch((e) => console.warn('[AIController] AuditLog error:', e));

      // Broadcast update to Admin and SOC realtime channels
      const io = getIoInstance();
      if (io) {
        io.to('room:admin').emit('ai:recommendation:updated', result);
      }

      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },
};

export default aiController;
