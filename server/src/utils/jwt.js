import jwt from 'jsonwebtoken';
import config from '../config/env.js';

/**
 * Generate a short-lived Access Token (15 minutes)
 */
export function generateAccessToken(user) {
  const payload = {
    sub: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

/**
 * Generate a long-lived Refresh Token (7 days)
 */
export function generateRefreshToken(user) {
  const payload = {
    sub: user._id.toString(),
    tokenType: 'REFRESH',
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.refreshTokenExpiresIn,
  });
}

/**
 * Verify Access Token
 */
export function verifyAccessToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const err = new Error('Access token has expired');
      err.code = 'TOKEN_EXPIRED';
      err.status = 401;
      throw err;
    }
    const err = new Error('Invalid access token signature');
    err.code = 'INVALID_TOKEN';
    err.status = 401;
    throw err;
  }
}

/**
 * Verify Refresh Token
 */
export function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    if (decoded.tokenType !== 'REFRESH') {
      const err = new Error('Token is not a valid refresh token');
      err.code = 'INVALID_REFRESH_TOKEN';
      err.status = 401;
      throw err;
    }
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      const err = new Error('Refresh token has expired. Please log in again.');
      err.code = 'REFRESH_TOKEN_EXPIRED';
      err.status = 401;
      throw err;
    }
    const err = new Error('Invalid refresh token signature');
    err.code = 'INVALID_REFRESH_TOKEN';
    err.status = 401;
    throw err;
  }
}

export default {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
