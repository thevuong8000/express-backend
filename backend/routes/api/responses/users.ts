import { IUserBase } from '@schemas/user';
import { BadRequestError } from './errors';
import { Message } from '@schemas/message';

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
 *         avatar:
 *           type: string
 *         status:
 *           type: string
 *       required:
 *         - account
 *         - display_name
 *         - id
 *         - email
 *         - avatar
 *         - status
 */

export type UserID = string;
export interface IUserAuthJSON extends IUserBase {
  id: UserID;
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

export class UserErrorResponse {
  static UserNotFound() {
    return new BadRequestError('User not found!');
  }

  static PasswordInvalid() {
    return new BadRequestError('Password is not correct!');
  }
}

export class UserSuccessResponse {
  static Update() {
    return new Message('Successfully modified!');
  }

  static Delete() {
    return new Message('Successfully deleted!');
  }

  static ChangePassword() {
    return new Message('Password has been updated!');
  }
}
