import { IUserDataToken } from './../schemas/user';
import { JWT_KEY } from '../constants/config';
import { sign, verify, SignOptions } from 'jsonwebtoken';

export const generateToken = (
  payload: IUserDataToken,
  { expiresIn = '2h', ...restOptions }: SignOptions = {}
): string => {
  return sign(payload, JWT_KEY, { expiresIn, ...restOptions });
};

export const verifyToken = (token: string): IUserDataToken => {
  return <IUserDataToken>verify(token, JWT_KEY)
};
