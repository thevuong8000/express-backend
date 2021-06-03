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
export interface ICreateUser {
  username: string;
  password: string;
}

export interface IUserUpdate {
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
