export interface IUserDataToken {
  userId: string;
}

export interface IChangePassword {
  current_password: string;
  new_password: string;
}

export interface ICreateUser {
  username: string;
  password: string;
}

export interface IUserUpdate {
  display_name?: string;
  email?: string;
}
