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

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         id:
 *           type: string
 *         account:
 *           type: string
 *         display_name:
 *           type: string
 *         email:
 *           type: string
 *       required:
 *         - account
 *         - display_name
 *         - id
 *         - email
 */

export type UserID = string;
export interface IUserAuthJSON extends IUserBase {
  id: UserID;
}

export interface IUserDataToken {
  userId: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserChangePassword:
 *       properties:
 *         current_password:
 *           type: string
 *         new_password:
 *           type: string
 *       required:
 *         - current_password
 *         - new_password
 */
export interface IChangePassword {
  current_password: string;
  new_password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserAuthentication:
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - username
 *         - password
 */
export interface IUserCreate {
  username: string;
  password: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       properties:
 *         display_name:
 *           type: string
 *         email:
 *           type: string
 */
export interface IUserUpdatable {
  display_name?: string;
  email?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserToken:
 *       properties:
 *         access_token:
 *           type: string
 *         refresh_token:
 *           type: string
 *         token_type:
 *           type: string
 *       required:
 *         - account
 *         - display_name
 *         - token_type
 */
type TokenType = 'Bearer';
export interface UserToken {
  access_token: string;
  refresh_token: string;
  token_type: TokenType;
}
