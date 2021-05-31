import { AuthRequest } from './../schemas/http-request';
import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { TOKEN } from '../constants/global';
import User from '../models/User';
import { generateToken, verifyToken } from '../utils/helper';
import { IUserDataToken } from '../types/schemas/user';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ name: username });
    if (!user) return res.status(401).json({ error: 'User not found!' });

    const validPassword = await compare(password, user.password);
    return validPassword
      ? res.status(200).json({
          ...user.getPublicInfo(),
          access_token: generateToken({ userId: user._id }, { expiresIn: TOKEN.ACCESS_EXPIRES }),
          refresh_token: generateToken({ userId: user._id }, { expiresIn: TOKEN.REFRESH_EXPIRES })
        })
      : res.status(401).json({ error: 'Incorrect password' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const { refresh_token } = req.body;
  try {
    const { userId } = <IUserDataToken>verifyToken(refresh_token);
    const token = generateToken({ userId }, { expiresIn: TOKEN.ACCESS_EXPIRES });
    res.status(200).json({ access_token: token });
  } catch (error) {
    next(error);
  }
};

export const testToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const { id } = req.body;
  try {
    const { userId } = req.authData;
    if (userId !== id) return res.status(401).json({ message: 'Not authenticate!' });

    const user = await User.getUserById(userId);
    if (!user) return res.status(401).json({ message: 'Not authenticate!' });

    return res.status(200).json({ message: 'Authenticated' });
  } catch (error) {
    return next(error);
  }
};
