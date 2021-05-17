const { verifyToken } = require('../utils/helper');

const notAuthPaths = ['/', '/login'];

module.exports = (req, res, next) => {
	if (notAuthPaths.includes(req.path)) return next();
	try {
		const token = req.headers.authorization.split(' ').pop();
		const decodedToken = verifyToken(token);
	} catch (error) {
		next(error);
	}
};
