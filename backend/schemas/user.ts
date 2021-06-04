import { UserID } from 'routes/api/responses/users';
import { IUserAuthJSON } from '../routes/api/responses/users';
import { Model, Document } from 'mongoose';
import { IUserUpdatable } from '../routes/api/requests/users';

type UserStatus = 'active' | 'deactive' | 'locked';
export interface IUserBase {
  account?: string;
  display_name?: string;
  email?: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
  status?: UserStatus;
}

export interface IUserDataToken {
  userId: UserID;
}

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
  getById(id: UserID): Promise<IUserDocument>;

  /**
   * Filter to only updatable props
   * @param data data to update
   */
  getUpdatableProps(data: object): IUserUpdatable;
}
