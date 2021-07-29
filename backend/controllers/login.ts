import { AuthRequest } from '@schemas/request';
import { Request, Response, NextFunction } from 'express';
import { compare } from 'bcrypt';
import { TOKEN } from '@constants/global';
import User from '@models/User';
import { generateToken } from '@utils/token';
import { UserToken } from '@api/responses/users';
import { LoginErrorResponse } from '@api/responses/login';
import { IUserLogin } from '@api/requests/login';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = <IUserLogin>req.body;
  try {
    const user = await User.findOne({ account: username });
    if (!user) return next(LoginErrorResponse.failedToVerify());

    const validPassword = await compare(password, user.hashedPassword);
    if (!validPassword) return next(LoginErrorResponse.failedToVerify());

    const tokens: UserToken = {
      accessToken: generateToken({ userId: user._id }, { expiresIn: TOKEN.ACCESS_EXPIRES }),
      refreshToken: generateToken({ userId: user._id }, { expiresIn: TOKEN.REFRESH_EXPIRES }),
      tokenType: 'Bearer'
    };
    res.status(200).json(tokens);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const testToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.auth;
    const user = await User.getById(userId);
    if (!user) return next(LoginErrorResponse.invalidToken());

    return res.status(200).json(user.toAuthJSON());
  } catch (error) {
    return next(error);
  }
};
