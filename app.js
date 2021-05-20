require('./src/mongodb/mongodb-config');
const express = require('express');
const app = express();
const auth = require('@middlewares/auth');
const userRoutes = require('@api/users');
const swaggerRoutes = require('@swagger/swagger');
const cors = require('@middlewares/cors');

/* Swagger REST-api document */
app.use('/docs', swaggerRoutes);

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);
app.use(auth);

// Rest-API
app.use('/users', userRoutes);

module.exports = app;
