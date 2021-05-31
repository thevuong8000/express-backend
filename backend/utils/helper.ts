import { JWT_KEY } from '../constants/config';
import { sign, verify, SignOptions } from 'jsonwebtoken';

/**
 * Generate token with payload.
 * @param payload The data would be hash.
 * @param options JWT options.
 */
export const generateToken = (
  payload: string | object | Buffer,
  { expiresIn = '2h', ...restOptions }: SignOptions = {}
): string => {
  return sign(payload, JWT_KEY, { expiresIn, ...restOptions });
};

/**
 * Verify JWT token. 
 * @param token JWT token to be verified.
 * @returns Data by input token.
 */
export const verifyToken = (token: string): string | object => {
  return verify(token, JWT_KEY);
};
