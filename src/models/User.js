const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *       required:
 *         - id
 *         - name
 */
const userSchema = mongoose.Schema({
	name: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

userSchema.methods.getPublicInfo = function () {
	const { name, _id: id } = this;
	return { id, name };
};

userSchema.statics.getUserById = function (userId) {
	return this.findOne({ _id: userId });
};

module.exports = mongoose.model('User', userSchema);
