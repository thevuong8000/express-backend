import { UserID } from 'routes/api/responses/users';

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
