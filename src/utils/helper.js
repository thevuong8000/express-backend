const jwt = require('jsonwebtoken');
const { APP_CONFIG } = require('@constants/config');

/**
 * Generate jwt token
 * @param {object} payload
 * @param {object} options
 * @returns {string}
 */
exports.generateToken = (payload, { expiresIn = '2h', ...restOptions } = {}) =>
	jwt.sign(payload, APP_CONFIG.JWT_KEY, { expiresIn, ...restOptions });

/**
 * Verify jwt token
 * @param {string} token 
 * @returns {object}
 */
exports.verifyToken = (token) => jwt.verify(token, APP_CONFIG.JWT_KEY);
