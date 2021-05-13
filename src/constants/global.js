module.exports = {
	HTTP_CODE: {
		OK: 200,
		CREATED: 201,
		ACCEPTED: 202,

		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403,
		NOT_FOUND: 404,

		INTERNAL_SERVER_ERROR: 500,
		BAD_GATEWAY: 502
	},

	ROUTE: {
		ROOT: {
			DEFAULT: '/'
		},
		USERS: {
			ROOT: '/users',
			ID: '/users/:id',
			VERIFY: '/users/verify'
		}
	}
};
