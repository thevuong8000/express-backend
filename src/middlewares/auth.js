const { verifyToken } = require('../utils/helper');

const notAuthPaths = ['/', '/login'];

module.exports = (req, res, next) => {
	/* For easy dev, disable token verification for development mode */
	if (process.env.NODE_ENV === 'development') return next();

	/* Skip authentication for login */
	if (notAuthPaths.includes(req.path)) return next();

	try {
		const token = req.headers.authorization.split(' ').pop();
		const decodedToken = verifyToken(token);
	} catch (error) {
		next(error);
	}
};
