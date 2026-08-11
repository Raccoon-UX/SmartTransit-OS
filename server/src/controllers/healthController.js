import { getDatabaseStatus } from '../config/db.js';

const startTime = Date.now();

export const healthController = {
  getHealth(req, res) {
    const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    const dbStatus = getDatabaseStatus();

    res.status(200).json({
      success: true,
      data: {
        api: 'UP',
        database: dbStatus,
        uptime: `${uptimeSeconds}s`,
        timestamp: new Date().toISOString(),
      },
    });
  },
};

export default healthController;
