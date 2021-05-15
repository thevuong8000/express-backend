const express = require('express');
// const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const apiDocs = require('./src/swagger/api.json');

const app = express();
const port = 8000;

const SWAGGER_OPTIONS = {
	explorer: true
};
app.use('/docs', swaggerUI.serve, swaggerUI.setup(apiDocs, SWAGGER_OPTIONS));

app.get('/', (req, res) => {
	res.send('I Love you');
});

app.get('/foo', (req, res) => {
	res.send({ foo: 1, bar: 'bar' });
});

app.get('/bar', (req, res) => {
	res.send({ foo: 'foo', bar: 1 });
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
