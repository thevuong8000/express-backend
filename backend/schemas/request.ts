import { IUserDataToken } from './user';
import { Request } from 'express';

/**
 * Authenticated User Information stored in Request
 */
export interface AuthRequest extends Request {
  auth: IUserDataToken;
}
