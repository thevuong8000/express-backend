import { AuthRequest } from './../schemas/http-request';
import { Response, NextFunction } from 'express';
import { verifyToken } from '../utils/helper';
import { IUserDataToken } from 'schemas/user';

const notAuthPaths = ['/', '/login', '/refresh-token', '/users/create'];

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  /* Skip authentication for non-authorized requests */
  return next();
  if (notAuthPaths.includes(req.path)) return next();

  /* Resolve OPTIONS request */
  if (req.method === 'OPTIONS') return next();

  try {
    const token = req.headers.authorization.split(' ').pop();
    req.authData = <IUserDataToken>verifyToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};
export default auth;
