const bcrypt = require('bcrypt');
const { TOKEN } = require('@constants/global');
const User = require('@models/User');
const { generateToken, verifyToken } = require('@utils/helper');

exports.login = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ name: username });
		if (!user) return res.status(401).json({ error: 'User not found!' });

		const validPassword = await bcrypt.compare(password, user.password);
		return validPassword
			? res.status(200).json({
					...user.getPublicInfo(),
					access_token: generateToken({ userId: user._id }, { expiresIn: TOKEN.ACCESS_EXPIRES }),
					refresh_token: generateToken({ userId: user._id }, { expiresIn: TOKEN.REFRESH_EXPIRES })
			  })
			: res.status(401).json({ error: 'Incorrect password' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error });
	}
};

exports.refreshToken = async (req, res, next) => {
	const { refresh_token } = req.body;
	try {
		const { userId } = verifyToken(refresh_token);
		const token = generateToken({ userId });
		res.status(200).json({ access_token: token });
	} catch (error) {
		next(error);
	}
};
