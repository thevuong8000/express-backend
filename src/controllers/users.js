const User = require('../models/User');

exports.getUsers = (req, res, next) => {
	User.find()
		.then((users) => res.status(200).json({ users }))
		.catch((error) => res.status(400).json({ error }));
};

exports.createUser = (req, res, next) => {
	const { username, password, email } = req.body;
	const user = new User({ username, password, email });
	user
		.save()
		.then((result) => res.status(201).json({ user: result, message: 'ok' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.getUsersById = (req, res, next) => {
	const { id } = req.params;
	User.findOne({ _id: id })
		.then((user) => res.status(200).json({ user }))
		.catch((error) => res.status(400).json({ error }));
};

exports.updateUser = (req, res, next) => {
	const { id } = req.params;
	const { password, email } = req.body;

	const newUser = new User({ _id: id, password, email });
	User.updateOne({ _id: id }, newUser)
		.then(() => res.status(200).json({ message: 'Successfully modified' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.deleteUser = (req, res, next) => {
	const { id } = req.params;

	User.deleteOne({ _id: id })
		.then((result) => res.status(200).json({ message: 'Successfully deleted' }))
		.catch((error) => res.status(400).json({ error }));
};
