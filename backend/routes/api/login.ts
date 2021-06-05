import { login, testToken } from '@controllers/login';
import { Router } from 'express';
const router = Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /login:
 *  post:
 *   summary: User login.
 *   description: User login with username and password.
 *   tags:
 *     - Authentication
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/UserAuthentication'
 *   responses:
 *     200:
 *       description: A list of users
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserToken'
 *     400:
 *       description: Failed to login
 */
router.post('/', login);

/**
 * @swagger
 * /login/test-token:
 *  post:
 *   summary: Test access token.
 *   description: Verify if access token is still valid.
 *   tags:
 *     - Authentication
 *   responses:
 *     200:
 *       description: Verify stored access token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     400:
 *       description: Access token is not valid
 */
router.post('/test-token', testToken);

export default router;
