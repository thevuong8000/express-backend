import { Request, Response, NextFunction } from 'express';
import { hash as _hash, compare } from 'bcrypt';
import User from '../models/User';
import { JWT_SALT } from '../constants/config';
import { BadRequestError } from '../schemas/error';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.status(200).json({ users: users.map((user) => user.getPublicInfo()) });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const hash = await _hash(password, 10);
  try {
    const newUser = await new User({ name: username, password: hash }).save();
    return res.status(201).json({ result: newUser.getPublicInfo() });
  } catch (error) {
    return next(error);
  }
};

export const getUsersById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const targetUser = await User.findOne({ _id: id });
    return res.status(200).json({ result: targetUser.getPublicInfo() });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { email } = req.body;

  const newUser = new User({ _id: id, email });
  try {
    await User.updateOne({ _id: id }, newUser);
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
  const { current_password, new_password } = req.body;

  const user = await User.getUserById(id);
  if (!user) return next(new BadRequestError('User not found!'));

  const validPassword = await compare(current_password, user.password);
  if (!validPassword) return next(new BadRequestError('Password is not correct!'));

  const hash = await _hash(new_password, JWT_SALT);
  try {
    await User.updateOne({ _id: id }, new User({ _id: id, password: hash }));
    return res.status(200).json({ message: 'Password has been updated!' });
  } catch (error) {
    return next(error);
  }
};
