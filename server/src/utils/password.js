import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash plaintext password securely using bcrypt
 */
export async function hashPassword(plaintext) {
  if (!plaintext || typeof plaintext !== 'string') {
    throw new Error('Password must be a valid string');
  }
  return await bcrypt.hash(plaintext, SALT_ROUNDS);
}

/**
 * Compare candidate plaintext password against stored bcrypt hash
 */
export async function comparePassword(candidate, hashed) {
  if (!candidate || !hashed) return false;
  return await bcrypt.compare(candidate, hashed);
}

export default { hashPassword, comparePassword };
