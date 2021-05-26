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
	changePassword
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
 *   description: Create a new user with name and password.
 *   tags:
 *     - User
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             password:
 *               type: string
 *   responses:
 *     201:
 *       description: A list of users
 *     400:
 *       description: Can not create user
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
 *         type: string
 *   responses:
 *     200:
 *       description: Get user with specific id
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     400:
 *       description: The specified user ID is not valid
 */
router.get('/:id', getUsersById);

/**
 * @swagger
 * /users/{id}:
 *  put:
 *   summary: Update user information.
 *   description: Update user information.
 *   tags:
 *     - User
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *   responses:
 *     200:
 *       description: Update status message
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     400:
 *       description: Can not update user
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
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Successfully delete user
 *     400:
 *       description: Can not delete user
 */
router.delete('/:id', deleteUser);

/**
 * @swagger
 * /users/{id}/change-password:
 *  put:
 *   summary: Update user password.
 *   description: Update user password.
 *   tags:
 *     - User
 *   parameters:
 *     - name: id
 *       in: path
 *       required: true
 *       schema:
 *         type: string
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             current_password:
 *               type: string
 *             new_password:
 *               type: string
 *   responses:
 *     200:
 *       description: Update status message
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *     400:
 *       description: Can not change password
 */
router.put('/:id/change-password', changePassword);

module.exports = router;