const { verifyToken } = require('@utils/helper');

const notAuthPaths = ['/', '/login', '/refresh-token'];

module.exports = (req, res, next) => {
	/* Skip authentication for login */
	if (notAuthPaths.includes(req.path)) return next();

	/* Resolve OPTIONS request */
	if (req.method === 'OPTIONS') return next();

	try {
		const token = req.headers.authorization.split(' ').pop();
		req.authData = verifyToken(token);
		return next();
	} catch (error) {
		return next(error);
	}
};
