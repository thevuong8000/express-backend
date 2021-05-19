const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and operations
 */
const userSchema = mongoose.Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
