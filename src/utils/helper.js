const jwt = require('jsonwebtoken');
const { APP_CONFIG } = require('../constants/config');

exports.generateToken = (payload, { expiresIn = '2h', ...restOptions } = {}) =>
	jwt.sign(payload, APP_CONFIG.JWT_KEY, { expiresIn, ...restOptions });

exports.verifyToken = (token) => {
	return jwt.verify(token, APP_CONFIG.JWT_KEY);
};
