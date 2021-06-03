import './mongodb/mongodb-config';
import express, { Application } from 'express';
import cors from 'cors';
import auth from './middlewares/auth';
import loginRoutes from './routes/api/login';
import userRoutes from './routes/api/users';
import swaggerRoutes from './swagger/swagger';
import { errorHandler } from './middlewares/error-handler';
import { CORS_CONFIGS } from './constants/config';

const app: Application = express();

/* Swagger REST-api document in dev mode */
if (process.env.NODE_ENV === 'development') {
  app.use('/docs', swaggerRoutes);
}

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* CORS allow */
app.use(cors(CORS_CONFIGS));

// middlewares
app.use(auth);

// Rest-API
app.use('/login', loginRoutes);
app.use('/users', userRoutes);

// Error handler
app.use(errorHandler);

export default app;
