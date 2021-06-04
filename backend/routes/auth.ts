import { AuthRequest } from 'schemas/http-request';
import { Response, NextFunction } from 'express';
import { decodeToken } from '@utils/token';
import { IUserDataToken } from 'schemas/user';

const AUTHENTICATION_EXCLUDES = ['/', '/login', '/users/refresh-token', '/users/create'];

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  /* Skip authentication for non-authorized requests */
  if (AUTHENTICATION_EXCLUDES.includes(req.path)) return next();

  /* Resolve OPTIONS request */
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ').pop();
    req.auth = <IUserDataToken>decodeToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};
export default auth;
