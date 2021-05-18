const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const router = express.Router();

const swaggerUiOpts = {
	explorer: true
};

const swaggerDocOpts = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Rest API',
			version: '1.0.0'
		}
	},
	apis: ['../routes/api/*.js']
};

const specs = swaggerJsdoc(swaggerDocOpts);
router.use('/', swaggerUI.serve, swaggerUI.setup(specs, swaggerUiOpts));

module.exports = router;
