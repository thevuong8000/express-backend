import { IUserDataToken } from './user';
import { Request } from 'express';

export interface AuthRequest extends Request {
  authData: IUserDataToken;
}