const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *       required:
 *         - _id
 *         - name
 */
const userSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

userSchema.methods.getPublicInfo = function () {
	const { username, _id } = this;
	return { username, _id };
};

module.exports = mongoose.model('User', userSchema);
