import { verifyAccessToken } from '../utils/jwt.js';
import { User } from '../models/User.js';

/**
 * Authentication Middleware
 * Enforces valid Bearer JWT on protected endpoints and loads active user profile.
 */
export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'UNAUTHORIZED_MISSING_TOKEN',
          message: 'Access denied. No authentication token provided.',
        },
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    // Load active user from database
    const user = await User.findById(decoded.sub);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'Authentication failed. Account no longer exists.',
        },
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'ACCOUNT_DEACTIVATED',
          message: 'Your account has been deactivated. Please contact transit operations.',
        },
      });
    }

    // Attach sanitized user to request context
    req.user = {
      _id: user._id,
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
      driverProfile: user.driverProfile,
      commuterProfile: user.commuterProfile,
      isActive: user.isActive,
    };

    next();
  } catch (error) {
    const statusCode = error.status || 401;
    return res.status(statusCode).json({
      success: false,
      error: {
        code: error.code || 'INVALID_AUTH_TOKEN',
        message: error.message || 'Invalid authentication token.',
      },
    });
  }
}

export default authenticate;
