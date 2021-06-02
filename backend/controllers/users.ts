import { Request, Response, NextFunction } from 'express';
import { hash as _hash, compare } from 'bcrypt';
import User from '../models/User';
import { BadRequestError } from '../schemas/error';
import { IChangePassword, ICreateUser, IUserUpdate } from '../schemas/user';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users: users.map((user) => user.getPublicInfo()) });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = <ICreateUser>req.body;
  try {
    const newUser = await User.create({
      account: username,
      hashed_password: password,
      display_name: username
    });
    return res.status(201).json({ result: newUser.getPublicInfo() });
  } catch (error) {
    return next(error);
  }
};

export const getUsersById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const targetUser = await User.getUserById(id);
    return res.status(200).json({ result: targetUser.getPublicInfo() });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const data: IUserUpdate = User.getUpdatableProps(req.body);

  try {
    await User.updateOne({ _id: id }, { ...data });
    return res.status(200).json({ message: 'Successfully modified' });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await User.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Successfully deleted' });
  } catch (error) {
    return next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { current_password, new_password } = <IChangePassword>req.body;

  const user = await User.getUserById(id);
  if (!user) return next(new BadRequestError('User not found!'));

  const validPassword = await compare(current_password, user.hashed_password);
  if (!validPassword) return next(new BadRequestError('Password is not correct!'));

  try {
    /* Saving by assigning to hash password before saving to DB */
    user.hashed_password = new_password;
    await user.save();

    return res.status(200).json({ message: 'Password has been updated!' });
  } catch (error) {
    return next(error);
  }
};
