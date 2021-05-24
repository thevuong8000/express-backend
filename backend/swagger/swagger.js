const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const router = express.Router();

const swaggerUiOpts = {
	explorer: true
};

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'Rest API',
		version: '1.0.0',
		contact: {
			name: 'Manh Tran',
			url: 'https://thevuong8000.github.io/',
			email: 'ducmanh.tran2904@gmail.com'
		}
	}
};

const swaggerDocOpts = {
	swaggerDefinition,
	apis: ['./backend/routes/api/*.js', './backend/models/*.js']
};

const specs = swaggerJsdoc(swaggerDocOpts);
router.use('/', swaggerUI.serve, swaggerUI.setup(specs, swaggerUiOpts));

module.exports = router;
