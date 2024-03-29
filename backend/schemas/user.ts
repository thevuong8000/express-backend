import { UserID } from 'routes/api/responses/users';
import { IUserAuthJSON } from '@api/responses/users';
import { Model, Document } from 'mongoose';
import { IUserUpdatable } from '@api/requests/users';

type UserStatus = 'active' | 'deactive' | 'locked';
export interface IUserBase {
  account?: string;
  displayName?: string;
  email?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDataToken {
  userId: UserID;
}

export interface IUserDocument extends Document, IUserBase {
  status: UserStatus;
  hashedPassword: string;

  /**
   * Get auth information to send.
   */
  toAuthJSON(): IUserAuthJSON;
}

export interface IUserModel extends Model<IUserDocument> {
  /**
   * Find user with specific id.
   * @param id id of target user
   */
  getById(id: UserID): Promise<IUserDocument>;

  /**
   * Filter to only updatable props
   * @param data data to update
   */
  getUpdatableProps(data: object): IUserUpdatable;
}
