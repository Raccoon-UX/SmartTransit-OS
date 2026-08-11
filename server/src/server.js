import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import config from './config/env.js';
import { connectDatabase, closeDatabase } from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import fleetRoutes from './routes/fleetRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import stopRoutes from './routes/stopRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import incidentRoutes from './routes/incidentRoutes.js';
import alertRoutes from './routes/alertRoutes.js';
import socRoutes from './routes/socRoutes.js';
import plannerRoutes from './routes/plannerRoutes.js';
import { authenticate } from './middleware/authMiddleware.js';
import { authorizeRoles } from './middleware/rbacMiddleware.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Security Headers & CORS configuration
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body and Cookie parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

import aiRoutes from './routes/aiRoutes.js';

// API v1 Operational REST Routes
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/fleet', fleetRoutes);
app.use('/api/v1/routes', routeRoutes);
app.use('/api/v1/stops', stopRoutes);
app.use('/api/v1/trips', tripRoutes);
app.use('/api/v1/incidents', incidentRoutes);
app.use('/api/v1/alerts', alertRoutes);
app.use('/api/v1/soc', socRoutes);
app.use('/api/v1/planner', plannerRoutes);
app.use('/api/v1/ai', aiRoutes);

// Protected RBAC Diagnostic Test Routes (For verification)
app.get('/api/v1/test/driver-only', authenticate, authorizeRoles('DRIVER'), (req, res) => {
  res.json({ success: true, message: `Authorized for DRIVER (${req.user.name})` });
});
app.get('/api/v1/test/admin-only', authenticate, authorizeRoles('ADMIN'), (req, res) => {
  res.json({ success: true, message: `Authorized for ADMIN (${req.user.name})` });
});
app.get('/api/v1/test/soc-only', authenticate, authorizeRoles('SOC'), (req, res) => {
  res.json({ success: true, message: `Authorized for SOC (${req.user.name})` });
});

// Root baseline route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'SmartTransit OS Metropolitan Backend Service (API v1)',
    healthCheck: '/api/v1/health',
  });
});

// 404 Catch-All Route Handler
app.use((req, res, next) => {
  const error = new Error(`Cannot ${req.method} ${req.originalUrl} - Endpoint not found`);
  error.status = 404;
  error.code = 'ENDPOINT_NOT_FOUND';
  next(error);
});

import http from 'http';
import { initSocketServer } from './sockets/telemetrySocket.js';

// Centralized Error Middleware
app.use(errorHandler);

// Create HTTP and WebSocket Server
const httpServer = http.createServer(app);
const io = initSocketServer(httpServer);

// Start Server & Connect Database
let serverInstance = null;

async function startServer() {
  await connectDatabase();

  serverInstance = httpServer.listen(config.port, () => {
    console.log(`[Server] SmartTransit OS backend running on http://localhost:${config.port}`);
    console.log(`[Server] Health Endpoint available at: http://localhost:${config.port}/api/v1/health`);
    console.log(`[Server] Realtime WebSocket gateway ready at: ws://localhost:${config.port}`);
    console.log(`[Server] Allowed CORS Origin: ${config.corsOrigin}`);
  });
}

// Graceful Shutdown Handlers
async function handleShutdown(signal) {
  console.log(`\n[Server] Received ${signal}. Initiating graceful shutdown...`);
  if (serverInstance) {
    serverInstance.close(async () => {
      console.log('[Server] HTTP and Socket.IO server closed.');
      await closeDatabase();
      console.log('[Server] Graceful shutdown complete.');
      process.exit(0);
    });
  } else {
    await closeDatabase();
    process.exit(0);
  }
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

startServer();

export { app, httpServer, io };
export default app;
