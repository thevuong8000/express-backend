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
	name: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

userSchema.methods.getPublicInfo = function () {
	const { name, _id } = this;
	return { name, _id };
};

userSchema.statics.getUserById = function (userId) {
	return this.findOne({ _id: userId });
};

module.exports = mongoose.model('User', userSchema);
