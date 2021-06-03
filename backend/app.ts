import './mongodb/mongodb-config';
import express, { Application } from 'express';
import cors from 'cors';
import auth from './middlewares/auth';
import authRoutes from './routes/api/auth';
import userRoutes from './routes/api/users';
import swaggerRoutes from './swagger/swagger';
import { errorHandler } from './middlewares/error-handler';
import { CORS_CONFIGS } from './constants/config';

const app: Application = express();

/* Swagger REST-api document */
app.use('/docs', swaggerRoutes);

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* CORS allow */
app.use(cors(CORS_CONFIGS));

// middlewares
app.use(auth);

// Rest-API
app.use('/users', userRoutes);
app.use('/', authRoutes);

// Error handler
app.use(errorHandler);

export default app;
