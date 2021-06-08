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
 *     UserChangePassword:
 *       properties:
 *         currentPassword:
 *           type: string
 *         newPassword:
 *           type: string
 *       required:
 *         - currentPassword
 *         - newPassword
 */
export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UserUpdate:
 *       properties:
 *         displayName:
 *           type: string
 *         email:
 *           type: string
 */
export interface IUserUpdatable {
  displayName?: string;
  email?: string;
}
