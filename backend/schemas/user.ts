export interface IUserPublicInfo {
  id: string;
  account: string;
  display_name: string;
  email: string | null;
}

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

type TokenType = 'Bearer';
export interface UserToken {
  access_token: string;
  refresh_token: string;
  token_type: TokenType;
}
