const bcrypt = require('bcrypt');
const User = require('@models/User');
const { JWT_SALT } = require('@constants/config');
const { UnauthorizedError } = require('schemas/error');

exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		return res.status(200).json({ users: users.map((user) => user.getPublicInfo()) });
	} catch (error) {
		return next(error);
	}
};

exports.createUser = async (req, res, next) => {
	const { username, password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	try {
		const newUser = await new User({ name: username, password: hash }).save();
		return res.status(201).json({ result: newUser.getPublicInfo() });
	} catch (error) {
		return next(error);
	}
};

exports.getUsersById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const targetUser = await User.findOne({ _id: id });
		return res.status(200).json({ result: targetUser.getPublicInfo() });
	} catch (error) {
		return next(error);
	}
};

exports.updateUser = async (req, res, next) => {
	const { id } = req.params;
	const { email } = req.body;

	const newUser = new User({ _id: id, email });
	try {
		await User.updateOne({ _id: id }, newUser);
		return res.status(200).json({ message: 'Successfully modified' });
	} catch (error) {
		return next(error);
	}
};

exports.deleteUser = async (req, res, next) => {
	const { id } = req.params;
	try {
		await User.deleteOne({ _id: id });
		return res.status(200).json({ message: 'Successfully deleted' });
	} catch (error) {
		return next(error);
	}
};

exports.changePassword = async (req, res, next) => {
	const { id } = req.params;
	const { current_password, new_password } = req.body;

	const user = await User.getUserById(id);
	if (!user) return next(new UnauthorizedError('User not found!'));

	const validPassword = await bcrypt.compare(current_password, user.password);
	if (!validPassword) return next(new UnauthorizedError('Password is not correct!'));

	const hash = await bcrypt.hash(new_password, JWT_SALT);
	try {
		await User.updateOne({ _id: id }, new User({ _id: id, password: hash }));
		return res.status(200).json({ message: 'Password has been updated!' });
	} catch (error) {
		return next(error);
	}
};
