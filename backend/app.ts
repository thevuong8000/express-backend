import './mongodb/mongodb-config';
import express from 'express';
import auth from './middlewares/auth';
import authRoutes from './routes/api/auth';
import userRoutes from './routes/api/users';
import swaggerRoutes from './swagger/swagger';
import cors from './middlewares/cors';
import { errorHandler } from './middlewares/error-handler';

const app = express();

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

export default app;
