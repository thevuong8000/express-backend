const express = require('express');
const router = express.Router();
const {
	createUser,
	getUsers,
	getUsersById,
	updateUser,
	deleteUser
} = require('../../controllers/users');

router.get('/', getUsers);
router.post('/', createUser);
router.get('/:id', getUsersById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
