const jwt = require('jsonwebtoken');

exports.generateToken = (
	payload,
	{ secretKey = 'random_secret', expiresIn = '2h', ...restOptions }
) => jwt.sign(payload, secretKey, { expiresIn, ...restOptions });

exports.verifyToken = (token) => {};
