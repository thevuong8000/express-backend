import { hash } from 'bcrypt';
import { Schema, model, Document, Model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { JWT_SALT } from '../constants/config';
import { NextFunction } from 'express';
import { IUserUpdate } from '../schemas/user';

export interface IUserPublicInfo {
  id: string;
  account: string;
  display_name: string;
  email: string | null;
}

export interface IUserDocument extends Document {
  account: string;
  hashed_password: string;
  display_name: string;
  email?: string;

  password?: string;

  /**
   * Get information to send.
   */
  getPublicInfo(): IUserPublicInfo;
}

export interface IUserModel extends Model<IUserDocument> {
  /**
   * Find user with specific id.
   * @param id id of target user
   */
  getUserById(id: string): Promise<IUserDocument>;

  /**
   * Filter to only updatable props
   * @param data data to update
   */
  getUpdatableProps(data: object): IUserUpdate;
}

const userSchema = new Schema<IUserDocument, IUserModel>({
  account: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
  display_name: { type: String, required: true },
  email: { type: String }
});

userSchema.plugin(uniqueValidator);

userSchema.methods.getPublicInfo = function (): IUserPublicInfo {
  const { account, display_name, email, _id: id } = this;
  return { id, account, display_name, email: email ?? null };
};

userSchema.statics.getUpdatableProps = function (data: object): IUserUpdate {
  const { display_name, email } = <IUserUpdate>data;
  return { display_name, email };
};

userSchema.statics.getUserById = async function (id: string): Promise<IUserDocument> {
  return this.findOne({ _id: id });
};

userSchema.pre('save', async function (next: NextFunction) {
  if (!this.isModified('hashed_password')) return next();
  this.hashed_password = await hash(this.hashed_password, JWT_SALT);
  next();
});

export default model<IUserDocument, IUserModel>('User', userSchema);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *       required:
 *         - id
 *         - name
 */
