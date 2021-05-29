const errorHandler = (err, req, res, next) => {
	res.status(err.code || 400).send({ message: err.message });
};

module.exports = { errorHandler };
