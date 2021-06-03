import { hash } from 'bcrypt';
import { Schema, model, Document, Model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { JWT_SALT } from '../constants/config';
import { NextFunction } from 'express';
import { IUserUpdate, IUserPublicInfo } from 'schemas/user';

export interface IUserDocument extends Document {
  account: string;
  hashed_password: string;
  display_name: string;
  email?: string;

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
  getById(id: string): Promise<IUserDocument>;

  /**
   * Filter to only updatable props
   * @param data data to update
   */
  getUpdatableProps(data: object): IUserUpdate;
}

const UserSchema = new Schema<IUserDocument, IUserModel>({
  account: { type: String, required: true, unique: true },
  hashed_password: { type: String, required: true },
  display_name: { type: String, required: true },
  email: { type: String }
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.getPublicInfo = function (): IUserPublicInfo {
  const { account, display_name, email, _id: id } = this;
  return { id, account, display_name, email: email ?? null };
};

UserSchema.statics.getUpdatableProps = function (data: object): IUserUpdate {
  const { display_name, email } = <IUserUpdate>data;
  return { display_name, email };
};

UserSchema.statics.getById = async function (id: string): Promise<IUserDocument> {
  return this.findOne({ _id: id });
};

/**
 * Hash password before saving into DB
 */
UserSchema.pre('save', async function (next: NextFunction) {
  if (!this.isModified('hashed_password')) return next();
  this.hashed_password = await hash(this.hashed_password, JWT_SALT);
  next();
});

export default model<IUserDocument, IUserModel>('User', UserSchema);
