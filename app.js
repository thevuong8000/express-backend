const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./src/swagger/api.json');

const app = express();
const userRoutes = require('./src/routes/api/users');

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
app.use('/users', userRoutes);

module.exports = app;
