const express = require('express');
const router = express.Router();

const User = require('../../models/user');

router.get('/', (req, res, next) => {
	User.find()
		.then((users) => res.status(200).json({ users }))
		.catch((error) => res.status(400).json({ error }));
});

router.post('/', (req, res, next) => {
	const { username, password } = req.body;
	const user = new User({ username, password });
	user
		.save()
		.then((result) => res.status(201).json({ user: result, message: 'ok' }))
		.catch((error) => res.status(400).json({ error }));
});

router.get('/:id', (req, res, next) => {
	const { id } = req.params;
	User.findOne({ _id: id })
		.then((user) => res.status(200).json({ user }))
		.catch((error) => res.status(400).json({ error }));
});

router.put('/:id', (req, res, next) => {
	const { id } = req.params;
	const { username, password } = req.body;

	const newUser = new User({ _id: id, username, password });
	User.updateOne({ _id: id }, newUser)
		.then(() => res.status(200).json({ message: 'Successfully modified' }))
		.catch((error) => res.status(400).json({ error }));
});

router.delete('/:id', (req, res, next) => {
	const { id } = req.params;

	User.deleteOne({ _id: id })
		.then((result) => res.status(200).json({ message: 'Successfully deleted' }))
		.catch((error) => res.status(400).json({ error }));
});

module.exports = router;
