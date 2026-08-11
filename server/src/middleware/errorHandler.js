/**
 * SmartTransit OS — Centralized Error Handling Middleware
 * Ensures consistent JSON response structure:
 * { success: false, error: { code: string, message: string } }
 */

export function errorHandler(err, req, res, next) {
  const statusCode = err.status || err.statusCode || 500;
  const errorCode = err.code || (statusCode === 404 ? 'RESOURCE_NOT_FOUND' : 'INTERNAL_SERVER_ERROR');
  const message = err.message || 'An unexpected error occurred on the transit server.';

  // Log error stack internally in development
  if (process.env.NODE_ENV === 'development') {
    console.error(`[API Error] [${req.method} ${req.originalUrl}] ${statusCode} - ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: message,
    },
  });
}

export default errorHandler;
