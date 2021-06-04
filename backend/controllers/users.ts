import { Request, Response, NextFunction } from 'express';
import { hash as _hash, compare } from 'bcrypt';
import User from '@models/User';
import { IUserDataToken } from '@schemas/user';
import { decodeToken, generateToken } from '@utils/token';
import { TOKEN } from '@constants/global';
import { IUserCreate, IUserUpdatable, IChangePassword } from '@api/requests/users';
import { UserErrorResponse, UserSuccessResponse, UserToken } from '@api/responses/users';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users: users.map((user) => user.toAuthJSON()) });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = <IUserCreate>req.body;
  try {
    const newUser = await User.create({
      account: username,
      hashed_password: password,
      display_name: username
    });
    return res.status(201).json(newUser.toAuthJSON());
  } catch (error) {
    return next(error);
  }
};

export const getUsersById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const targetUser = await User.getById(id);
    return res.status(200).json(targetUser.toAuthJSON());
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data: IUserUpdatable = User.getUpdatableProps(req.body);

  try {
    await User.updateOne({ _id: id }, data);
    return res.status(200).json(UserSuccessResponse.Update());
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await User.deleteOne({ _id: id });
    return res.status(200).json(UserSuccessResponse.Delete());
  } catch (error) {
    return next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { current_password, new_password } = <IChangePassword>req.body;

  const user = await User.getById(id);
  if (!user) return next(UserErrorResponse.UserNotFound());

  const validPassword = await compare(current_password, user.hashed_password);
  if (!validPassword) return next(UserErrorResponse.PasswordInvalid());

  try {
    /* Saving by assigning to hash password before saving to DB */
    user.hashed_password = new_password;
    await user.save();

    return res.status(200).json(UserSuccessResponse.ChangePassword());
  } catch (error) {
    return next(error);
  }
};

export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
  const { refresh_token } = <{ refresh_token: string }>req.body;
  try {
    const payload = <IUserDataToken>decodeToken(refresh_token);
    const tokens: UserToken = {
      access_token: generateToken(payload, { expiresIn: TOKEN.ACCESS_EXPIRES }),
      refresh_token,
      token_type: 'Bearer'
    };
    res.status(200).json(tokens);
  } catch (error) {
    next(error);
  }
};
