const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../utils/helper');

exports.getUsers = (req, res, next) => {
	User.find()
		.then((users) => res.status(200).json({ users }))
		.catch((error) => res.status(400).json({ error }));
};

exports.createUser = async (req, res, next) => {
	const { username, password, email } = req.body;
	const hash = await bcrypt.hash(password, 10);
	const user = new User({ username, password: hash, email });
	user
		.save()
		.then((result) => res.status(201).json({ result, message: 'ok' }))
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
	const { email } = req.body;

	const newUser = new User({ _id: id, email });
	User.updateOne({ _id: id }, newUser)
		.then(() => res.status(200).json({ message: 'Successfully modified' }))
		.catch((error) => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
	const { id } = req.params;

	User.deleteOne({ _id: id })
		.then(() => res.status(200).json({ message: 'Successfully deleted' }))
		.catch((error) => res.status(400).json({ error }));
};

exports.loginUser = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username });
		if (!user) return res.status(401).json({ error: 'User not found!' });

		const validPassword = await bcrypt.compare(password, user.password);
		return validPassword
			? res
					.status(200)
					.json({ userId: user._id, access_token: generateToken({ userId: user._id }) })
			: res.status(401).json({ error: 'Incorrect password' });
	} catch (error) {
		return res.status(500).json({ error });
	}
};
