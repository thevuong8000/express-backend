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
