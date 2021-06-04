import { JWT_KEY } from '../constants/config';
import { sign, verify, SignOptions } from 'jsonwebtoken';

/**
 * The data being signed in the JWT token should be in format: { payload: object }
 * The example decoded data would be { payload: object, exp: 12345678, iss: 12345678, etc... }
 * PURPOSE: Get pure encoded data without being blended with jwt-props
 */
interface TokenData {
  payload?: object;
}

/**
 * Generate token with payload.
 * @param payload The data would be hash.
 * @param options JWT options.
 */
export const generateToken = (
  payload: string | object,
  { expiresIn = '2h', ...restOptions }: SignOptions = {}
): string => {
  return sign({ payload }, JWT_KEY, { expiresIn, ...restOptions });
};

/**
 * Verify and decode JWT token.
 * @param token JWT token to be verified.
 * @returns Data by input token.
 */
export const decodeToken = (token: string, getFullData: boolean = false): string | object => {
  const data = <TokenData>verify(token, JWT_KEY);
  return getFullData ? data : data.payload;
};
