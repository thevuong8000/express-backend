import { hash } from 'bcrypt';
import { Schema, model } from 'mongoose';
import { JWT_SALT } from '@constants/config';
import { NextFunction } from 'express';
import { IUserAuthJSON, UserID } from '@api/responses/users';
import { IUserUpdatable } from '@api/requests/users';
import { IUserDocument, IUserModel } from '@schemas/user';
import uniqueValidator from 'mongoose-unique-validator';

const UserSchema = new Schema<IUserDocument, IUserModel>(
  {
    account: { type: String, required: true, unique: true },
    display_name: { type: String, required: true },
    hashed_password: { type: String, required: true },
    email: { type: String, default: null },
    avatar: { type: String, default: null },
    status: { type: String, default: 'active' }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, minimize: false }
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

UserSchema.statics.getById = async function (id: UserID): Promise<IUserDocument> {
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
