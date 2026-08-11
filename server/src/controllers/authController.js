import { User } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/jwt.js';

// Safe mapping for demo 1-click role logins
const DEMO_ROLE_EMAIL_MAP = {
  PASSENGER: 'passenger@smarttransit.city',
  DRIVER: 'driver@smarttransit.city',
  ADMIN: 'admin@smarttransit.city',
  SOC: 'soc.admin@smarttransit.city',
};

// Standard HttpOnly cookie options for refresh tokens
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
    driverProfile: user.driverProfile || {},
    commuterProfile: user.commuterProfile || {},
    isActive: user.isActive,
    createdAt: user.createdAt,
  };
}

export const authController = {
  /**
   * POST /api/v1/auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Both email and password are required for login.',
          },
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Find user and explicitly select passwordHash
      const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

      if (!user) {
        // Generic timing-safe security message
        return res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password.',
          },
        });
      }

      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'ACCOUNT_DEACTIVATED',
            message: 'Account is deactivated. Please contact transit dispatch.',
          },
        });
      }

      const isMatch = await comparePassword(password, user.passwordHash);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid email or password.',
          },
        });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      // Set secure HttpOnly cookie for refresh token
      res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

      res.status(200).json({
        success: true,
        data: {
          accessToken,
          user: sanitizeUser(user),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/v1/auth/demo-login
   */
  async demoLogin(req, res, next) {
    try {
      const { role } = req.body;
      const normalizedRole = (role || 'PASSENGER').toUpperCase();

      const targetEmail = DEMO_ROLE_EMAIL_MAP[normalizedRole];

      if (!targetEmail) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_DEMO_ROLE',
            message: `Role '${role}' is not a valid demo role. Allowed: [PASSENGER, DRIVER, ADMIN, SOC].`,
          },
        });
      }

      const user = await User.findOne({ email: targetEmail });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: {
            code: 'DEMO_USER_NOT_FOUND',
            message: `Demonstration account for role '${normalizedRole}' was not found. Please ensure database is seeded.`,
          },
        });
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

      res.status(200).json({
        success: true,
        data: {
          accessToken,
          user: sanitizeUser(user),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/v1/auth/register
   * Passenger self-registration ONLY.
   */
  async register(req, res, next) {
    try {
      const { name, email, password, commuterProfile } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Name, email, and password are required for registration.',
          },
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'WEAK_PASSWORD',
            message: 'Password must contain at least 6 characters.',
          },
        });
      }

      const normalizedEmail = email.trim().toLowerCase();

      // Check duplicate email
      const existingUser = await User.findOne({ email: normalizedEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'DUPLICATE_EMAIL',
            message: 'An account with this email address is already registered.',
          },
        });
      }

      const hashedPassword = await hashPassword(password);

      // Force role = PASSENGER to prevent privilege escalation
      const newUser = await User.create({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash: hashedPassword,
        role: 'PASSENGER',
        commuterProfile: commuterProfile || {},
        isActive: true,
      });

      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      res.cookie('refreshToken', refreshToken, REFRESH_COOKIE_OPTIONS);

      res.status(201).json({
        success: true,
        data: {
          accessToken,
          user: sanitizeUser(newUser),
        },
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/v1/auth/refresh
   */
  async refreshToken(req, res, next) {
    try {
      const token = req.cookies?.refreshToken || req.body?.refreshToken;

      if (!token) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'REFRESH_TOKEN_REQUIRED',
            message: 'Refresh token is required to renew session.',
          },
        });
      }

      const decoded = verifyRefreshToken(token);
      const user = await User.findById(decoded.sub);

      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          error: {
            code: 'USER_INACTIVE_OR_DELETED',
            message: 'User session is no longer active.',
          },
        });
      }

      const newAccessToken = generateAccessToken(user);

      res.status(200).json({
        success: true,
        data: {
          accessToken: newAccessToken,
        },
      });
    } catch (error) {
      const statusCode = error.status || 401;
      return res.status(statusCode).json({
        success: false,
        error: {
          code: error.code || 'REFRESH_FAILED',
          message: error.message || 'Failed to refresh token.',
        },
      });
    }
  },

  /**
   * GET /api/v1/auth/me
   */
  async getMe(req, res) {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  },
};

export default authController;
