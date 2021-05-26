const bcrypt = require('bcrypt');
const User = require('@models/User');
const { JWT_SALT } = require('@constants/config');

exports.getUsers = (req, res, next) => {
	User.find()
		.then((users) => res.status(200).json({ users: users.map((user) => user.getPublicInfo()) }))
		.catch((error) => res.status(400).json({ error }));
};

exports.createUser = async (req, res, next) => {
	const { username, password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	const user = new User({ name: username, password: hash });
	user
		.save()
		.then((result) => res.status(201).json({ result: result.getPublicInfo() }))
		.catch((error) => res.status(400).json({ error }));
};

exports.getUsersById = (req, res, next) => {
	const { id } = req.params;
	User.findOne({ _id: id })
		.then((user) => res.status(200).json({ user: user.getPublicInfo() }))
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

exports.changePassword = async (req, res, next) => {
	const { id } = req.params;
	const { current_password, new_password } = req.body;

	const user = await User.getUserById(id);
	if (!user) return res.status(401).json({ error: 'User not found!' });

	const validPassword = await bcrypt.compare(current_password, user.password);
	if (!validPassword) return res.status(401).json({ error: 'Password is not correct!' });

	const hash = await bcrypt.hash(new_password, JWT_SALT);
	User.updateOne({ _id: id }, new User({ _id: id, password: hash }))
		.then(() => res.status(200).json({ message: 'Password has been updated!' }))
		.catch((error) => res.status(500).json({ error }));
};
