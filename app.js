const express = require('express');
const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./src/swagger/api.json');

const app = express();

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

module.exports = app;
