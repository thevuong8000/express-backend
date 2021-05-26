const { JWT_KEY } = require('@constants/config');
const jwt = require('jsonwebtoken');

/**
 * Generate jwt token
 * @param {object} payload
 * @param {object} options
 * @returns {string}
 */
exports.generateToken = (payload, { expiresIn = '2h', ...restOptions } = {}) =>
	jwt.sign(payload, JWT_KEY, { expiresIn, ...restOptions });

/**
 * Verify jwt token
 * @param {string} token
 * @returns {object}
 */
exports.verifyToken = (token) => jwt.verify(token, JWT_KEY);
