const { refreshToken, login, testToken } = require('@controllers/auth');
const express = require('express');
const router = express.Router();
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
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *   responses:
 *     200:
 *       description: A list of users
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               access_token:
 *                 type: string
 *               refresh_token:
 *                 type: string
 *     400:
 *       description: Can not create user
 */
router.post('/login', login);

/**
 * @swagger
 * /refresh-token:
 *  post:
 *   summary: Refresh token.
 *   description: Refresh access token using refresh token.
 *   tags:
 *     - Authentication
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             refresh_token:
 *               type: string
 *   responses:
 *     200:
 *       description: Get new access_token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               access_token:
 *                 type: string
 *     400:
 *       description: Refresh token is not valid
 */
router.post('/refresh-token', refreshToken);

/**
 * @swagger
 * /test-token:
 *  post:
 *   summary: Test access token.
 *   description: Verify if access token is still valid.
 *   tags:
 *     - Authentication
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             access_token:
 *               type: string
 *   responses:
 *     200:
 *       description: Get new access_token
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     400:
 *       description: Access token is not valid
 */
router.post('/test-token', testToken);

module.exports = router;