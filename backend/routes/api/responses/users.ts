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
 *         updatedAt:
 *           type: string
 *         createdAt:
 *           type: string
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
  static duplicatedUsername() {
    return new BadRequestError('Username has already been taken!');
  }

  static notFound() {
    return new BadRequestError('User not found!');
  }

  static invalidPassword() {
    return new BadRequestError('Password is not correct!');
  }
}

export class UserSuccessResponse {
  static createAccount() {
    return new Message('Successfully created!');
  }

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
