const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and operations
 */
const {
	createUser,
	getUsers,
	getUsersById,
	updateUser,
	deleteUser,
	loginUser,
	refreshToken
} = require('@controllers/users');

/**
 * @swagger
 * /users:
 *  get:
 *   summary: Retrieve all users
 *   description: Retrieve a list of all users.
 *   tags:
 *     - User
 *   responses:
 *     200:
 *       description: A list of users
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/User'
 *     400:
 *       description: The specified user ID is not valid
 */
router.get('/', getUsers);

/**
 * @swagger
 * /users:
 *  post:
 *   summary: Create new user.
 *   description: Create a new user with username and password.
 *   tags:
 *     - User
 *   responses:
 *     201:
 *       description: A list of users
 */
router.post('/', createUser);

/**
 * @swagger
 * /users/{id}:
 *  get:
 *   summary: Get specific user.
 *   description: Get the specific user with id.
 *   tags:
 *     - User
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: String
 *   responses:
 *     200:
 *       description: A list of users
 */
router.get('/:id', getUsersById);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *   summary: Update user.
 *   description: Update user with new data.
 *   tags:
 *     - User
 *   responses:
 *     200:
 *       description: A list of users
 */
router.put('/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *   summary: Delete user.
 *   description: Update user with new data.
 *   tags:
 *     - User
 *   responses:
 *     200:
 *       description: A list of users
 */
router.delete('/:id', deleteUser);

/**
 * @swagger
 * /users/login:
 *  post:
 *   summary: User login
 *   description: Update user with new data.
 *   tags:
 *     - User
 *   responses:
 *     200:
 *       description: A list of users
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /users/refresh:
 *  post:
 *   summary: Refresh token.
 *   description: Update user with new data.
 *   tags:
 *     - User
 *   responses:
 *     200:
 *       description: A list of users
 */
router.post('/refresh', refreshToken);

module.exports = router;
