import { SocMetric, Bus, Trip, Incident, AuditLog } from '../models/index.js';

export const socController = {
  /**
   * GET /api/v1/soc/overview
   * Role: SOC ONLY
   */
  async getSocOverview(req, res, next) {
    try {
      const latestMetric = await SocMetric.findOne().sort({ timestamp: -1 }).lean();

      const activeBusesCount = await Bus.countDocuments({ status: { $in: ['ACTIVE', 'ON_TIME', 'DELAYED'] } });
      const activeTripsCount = await Trip.countDocuments({ status: 'ACTIVE' });
      const openIncidentsCount = await Incident.countDocuments({ status: { $in: ['OPEN', 'INVESTIGATING'] } });

      const overview = {
        globalStatus: latestMetric?.globalStatus || 'OPERATIONAL',
        apiLatencyMs: latestMetric?.apiLatencyMs || 14,
        activeBuses: activeBusesCount,
        activeTrips: activeTripsCount,
        openIncidents: openIncidentsCount,
        cpuUtilizationPercent: latestMetric?.cpuUtilizationPercent || 45,
        backpressureState: latestMetric?.backpressureState || 'NORMAL',
        serverNodesCount: latestMetric?.serverNodes?.length || 3,
        lastSnapshotTime: latestMetric?.timestamp || new Date(),
      };

      res.status(200).json({
        success: true,
        data: overview,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/v1/soc/nodes
   * Role: SOC ONLY
   */
  async getNodeCluster(req, res, next) {
    try {
      const latestMetric = await SocMetric.findOne().sort({ timestamp: -1 }).lean();

      res.status(200).json({
        success: true,
        data: latestMetric?.serverNodes || [],
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/v1/soc/surge
   * Role: SOC ONLY
   * Simulates sudden metropolitan transit query traffic surge.
   */
  async simulateSurge(req, res, next) {
    try {
      const surgeMetric = await SocMetric.create({
        timestamp: new Date(),
        globalStatus: 'WARNING',
        apiLatencyMs: 184,
        activeBusesCount: 4,
        cpuUtilizationPercent: 88,
        backpressureState: 'WARNING',
        serverNodes: [
          { nodeId: 'node-01', name: 'APP-NODE-01', status: 'WARNING', cpuPercent: 88, memoryPercent: 82 },
          { nodeId: 'node-02', name: 'APP-NODE-02', status: 'WARNING', cpuPercent: 86, memoryPercent: 79 },
          { nodeId: 'node-03', name: 'APP-NODE-03', status: 'CRITICAL', cpuPercent: 94, memoryPercent: 91 },
        ],
      });

      // Audit Log
      await AuditLog.create({
        actorId: req.user._id,
        role: req.user.role,
        action: 'UPDATE_BUS',
        targetResource: 'SOC',
        targetResourceId: 'CLUSTER-SURGE',
        ipAddress: req.ip || '127.0.0.1',
        metadata: { scenario: 'TRAFFIC_SURGE_INDUCED', latency: 184 },
      });

      res.status(200).json({
        success: true,
        message: 'High traffic surge simulated. API latency elevated to 184ms, backpressure WARNING.',
        data: surgeMetric,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/v1/soc/scale-out
   * Role: SOC ONLY
   * Simulates cluster scale-out recovery.
   */
  async scaleOutCluster(req, res, next) {
    try {
      const recoveredMetric = await SocMetric.create({
        timestamp: new Date(),
        globalStatus: 'OPERATIONAL',
        apiLatencyMs: 16,
        activeBusesCount: 4,
        cpuUtilizationPercent: 42,
        backpressureState: 'NORMAL',
        serverNodes: [
          { nodeId: 'node-01', name: 'APP-NODE-01', status: 'HEALTHY', cpuPercent: 42, memoryPercent: 54 },
          { nodeId: 'node-02', name: 'APP-NODE-02', status: 'HEALTHY', cpuPercent: 40, memoryPercent: 51 },
          { nodeId: 'node-03', name: 'APP-NODE-03', status: 'HEALTHY', cpuPercent: 44, memoryPercent: 56 },
          { nodeId: 'node-04', name: 'APP-NODE-04-AUTOSCALED', status: 'HEALTHY', cpuPercent: 38, memoryPercent: 48 },
        ],
      });

      // Audit Log
      await AuditLog.create({
        actorId: req.user._id,
        role: req.user.role,
        action: 'UPDATE_BUS',
        targetResource: 'SOC',
        targetResourceId: 'CLUSTER-SCALE-OUT',
        ipAddress: req.ip || '127.0.0.1',
        metadata: { scenario: 'AUTOSCALE_NODES_ADDED', newNodesCount: 4 },
      });

      res.status(200).json({
        success: true,
        message: 'Cluster autoscaled successfully. Latency normalized to 16ms, backpressure NORMAL.',
        data: recoveredMetric,
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/v1/soc/audit-logs
   * Roles: SOC, ADMIN
   */
  async getAuditLogs(req, res, next) {
    try {
      const { limit = 50 } = req.query;
      const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10)));

      const logs = await AuditLog.find()
        .populate('actorId', 'name email role')
        .sort({ timestamp: -1 })
        .limit(parsedLimit)
        .lean();

      res.status(200).json({
        success: true,
        data: logs,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default socController;
