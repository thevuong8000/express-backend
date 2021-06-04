import './mongodb/mongodb-config';
import express, { Application } from 'express';
import cors from 'cors';
import swaggerRoutes from './swagger/swagger';
import { CORS_CONFIGS } from './constants/config';
import routes from './routes';

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

// Rest-API
app.use(routes);

export default app;
