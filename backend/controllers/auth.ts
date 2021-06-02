import { AuthRequest } from './../schemas/http-request';
import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { TOKEN } from '../constants/global';
import User from '../models/User';
import { generateToken, decodeToken } from '../utils/helper';
import { IUserDataToken, UserToken } from '../schemas/user';
import { UnauthorizedError } from '../schemas/error';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ account: username });
    if (!user) return next(new UnauthorizedError('User not found!'));

    const validPassword = await compare(password, user.hashed_password);
    if (!validPassword) return next(new UnauthorizedError('Incorrect password'));

    const tokens: UserToken = {
      access_token: generateToken({ userId: user._id }, { expiresIn: TOKEN.ACCESS_EXPIRES }),
      refresh_token: generateToken({ userId: user._id }, { expiresIn: TOKEN.REFRESH_EXPIRES }),
      token_type: 'Bearer'
    };
    res.status(200).json({ result: tokens });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const { refresh_token } = <{ refresh_token: string }>req.body;
  try {
    const { userId } = <IUserDataToken>decodeToken(refresh_token);
    const token: UserToken = {
      access_token: generateToken({ userId }, { expiresIn: TOKEN.ACCESS_EXPIRES }),
      refresh_token,
      token_type: 'Bearer'
    };
    res.status(200).json({ result: token });
  } catch (error) {
    next(error);
  }
};

export const testToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.authData;
    const user = await User.getById(userId);
    if (!user) return next(new UnauthorizedError('Not authenticated!'));

    return res.status(200).json({ result: user.getPublicInfo() });
  } catch (error) {
    return next(error);
  }
};
