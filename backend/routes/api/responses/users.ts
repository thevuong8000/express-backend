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
 *         displayName:
 *           type: string
 *         email:
 *           type: string
 *         avatar:
 *           type: string
 *         status:
 *           type: string
 *       required:
 *         - account
 *         - displayName
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
 *         accessToken:
 *           type: string
 *         refreshToken:
 *           type: string
 *         tokenType:
 *           type: string
 *       required:
 *         - account
 *         - displayName
 *         - tokenType
 */
type TokenType = 'Bearer';
export interface UserToken {
  accessToken: string;
  refreshToken: string;
  tokenType: TokenType;
}

export class UserErrorResponse {
  static notFound() {
    return new BadRequestError('User not found!');
  }

  static invalidPassword() {
    return new BadRequestError('Password is not correct!');
  }
}

export class UserSuccessResponse {
  static updateAccount() {
    return new Message('Successfully modified!');
  }

  static deleteAccount() {
    return new Message('Successfully deleted!');
  }

  static changePassword() {
    return new Message('Password has been updated!');
  }
}
