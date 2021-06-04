import { hash } from 'bcrypt';
import { Schema, model, Document, Model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { JWT_SALT } from '../constants/config';
import { NextFunction } from 'express';
import { IUserUpdatable, IUserAuthJSON } from 'schemas/user';
import { IUserBase } from 'schemas/user';

export interface IUserDocument extends Document, IUserBase {
  hashed_password: string;

  /**
   * Get information to send.
   */
  toAuthJSON(): IUserAuthJSON;
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
  getUpdatableProps(data: object): IUserUpdatable;
}

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    account: { type: String, required: true, unique: true },
    display_name: { type: String, required: true },
    hashed_password: { type: String, required: true },
    email: { type: String, default: null },
    avatar: { type: String, default: null },
    status: { type: String, default: 'active' }
  },
  { timestamps: { createdAt: 'create_at', updatedAt: 'update_at' }, minimize: false }
);

UserSchema.plugin(uniqueValidator);

UserSchema.methods.toAuthJSON = function (): IUserAuthJSON {
  return {
    id: this._id,
    account: this.account,
    display_name: this.display_name,
    email: this.email,
    avatar: this.avatar,
    created_at: this.created_at,
    updated_at: this.updated_at,
    status: this.status
  };
};

UserSchema.statics.getUpdatableProps = function (data: object): IUserUpdatable {
  const { display_name, email } = <IUserUpdatable>data;
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
