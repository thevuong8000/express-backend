const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./src/swagger/api.json');

const app = express();

const User = require('./src/models/user');

const mongoUser = 'dante';
const mongoPassword = 'fWd5BIGTlsmCwC2Q';
const databaseName = 'userManagement';
const MONGO_URI = `mongodb+srv://${mongoUser}:${mongoPassword}@test-mongo.e76gm.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log('mongo connected');
	})
	.catch((err) => console.log('err'));

// swagger api docs
const SWAGGER_OPTIONS = {
	explorer: true
};
app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiDocs, SWAGGER_OPTIONS));

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS rules
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

// Rest-API
app.get('/users', (req, res, next) => {
	User.find()
		.then((users) => res.status(200).json({ users }))
		.catch((error) => res.status(400).json({ error }));
});

app.post('/users', (req, res, next) => {
	const { username, password } = req.body;
	const user = new User({ username, password });
	user
		.save()
		.then((result) => res.status(201).json({ user: result, message: 'ok' }))
		.catch((error) => res.status(400).json({ error }));
});

app.get('/users/:id', (req, res, next) => {
	const { id } = req.params;
	User.findOne({ _id: id })
		.then((user) => res.status(200).json({ user }))
		.catch((error) => res.status(400).json({ error }));
});

app.put('/users/:id', (req, res, next) => {
	const { id } = req.params;
	const { username, password } = req.body;

	const newUser = new User({ _id: id, username, password });
	User.updateOne({ _id: id }, newUser)
		.then(() => res.status(200).json({ message: 'Successfully modified' }))
		.catch((error) => res.status(400).json({ error }));
});

app.delete('/users/:id', (req, res, next) => {
	const { id } = req.params;

	User.deleteOne({ _id: id })
		.then((result) => res.status(200).json({ message: 'Successfully deleted' }))
		.catch((error) => res.status(400).json({ error }));
});

module.exports = app;
