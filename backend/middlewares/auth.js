const { verifyToken } = require('@utils/helper');

const notAuthPaths = ['/', '/login', '/refresh-token', '/test-token'];

module.exports = (req, res, next) => {
	/* For easy dev, disable token verification for development mode */
	// if (process.env.NODE_ENV === 'development') return next();

	/* Skip authentication for login */
	if (notAuthPaths.includes(req.path)) return next();

	/* Resolve OPTIONS request */
	if (req.method === 'OPTIONS') return res.status(200).send('Pre-flight resolved!');

	try {
		const token = req.headers.authorization.split(' ').pop();
		const decodedToken = verifyToken(token);
		return next();
	} catch (error) {
		return next(error);
	}
};
