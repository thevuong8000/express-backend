require('./mongodb/mongodb-config');
const express = require('express');
const app = express();
const auth = require('@middlewares/auth');
const authRoutes = require('@api/auth');
const userRoutes = require('@api/users');
const swaggerRoutes = require('@swagger/swagger');
const cors = require('@middlewares/cors');
const { errorHandler } = require('@middlewares/error-handler');

/* Swagger REST-api document */
app.use('/docs', swaggerRoutes);

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(cors);
app.use(auth);

// Rest-API
app.use('/users', userRoutes);
app.use('/', authRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
