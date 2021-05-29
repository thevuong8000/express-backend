class BadRequestError extends Error {
	constructor(message) {
		super(message);
		this.code = 400;
	}
}

class UnauthorizedError extends Error {
	constructor(message) {
		super(message);
		this.code = 401;
	}
}
