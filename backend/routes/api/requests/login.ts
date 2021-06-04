/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       properties:
 *         username:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - username
 *         - password
 */
export interface IUserLogin {
  username: string;
  password: string;
}
