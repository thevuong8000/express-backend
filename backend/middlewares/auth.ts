import { AuthRequest } from 'schemas/http-request';
import { Response, NextFunction } from 'express';
import { decodeToken } from '../utils/helper';
import { IUserDataToken } from 'schemas/user';

const notAuthPaths = ['/', '/login', '/users/refresh-token', '/users/create'];

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  /* Skip authentication for non-authorized requests */
  if (notAuthPaths.includes(req.path)) return next();

  /* Resolve OPTIONS request */
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ').pop();
    req.authData = <IUserDataToken>decodeToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};
export default auth;
