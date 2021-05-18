const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./src/swagger/api.json');

const app = express();
const auth = require('./src/middlewares/auth');
const userRoutes = require('./src/routes/api/users');
const cors = require('./src/middlewares/cors');

const mongoUser = 'dante';
const mongoPassword = 'fWd5BIGTlsmCwC2Q';
const databaseName = 'userManagement';
const MONGO_URI = `mongodb+srv://${mongoUser}:${mongoPassword}@test-mongo.e76gm.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log('Connect mongoDB successfully!'))
	.catch((error) => console.log('Fail to connect mongoDB!'));

// swagger api docs
const SWAGGER_OPTIONS = {
	explorer: true
};
app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiDocs, SWAGGER_OPTIONS));

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);
app.use(auth);

// Rest-API
app.use('/users', userRoutes);

module.exports = app;
