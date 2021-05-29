import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/helper';

const notAuthPaths = ['/', '/login', '/refresh-token', '/users/create'];

export default (req: Request, res: Response, next: NextFunction) => {
  /* ======== Need Delete ========= */
  return next();
  /* Skip authentication for non-authorized requests */
  // if (notAuthPaths.includes(req.path)) return next();

  // /* Resolve OPTIONS request */
  // if (req.method === 'OPTIONS') return next();

  // try {
  //   const token = req.headers.authorization.split(' ').pop();
  //   req.authData = verifyToken(token);
  //   return next();
  // } catch (error) {
  //   return next(error);
  // }
};
