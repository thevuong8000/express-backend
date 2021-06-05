import './database/mongodb-config';
import express, { Application } from 'express';
import cors from 'cors';
import swaggerRoutes from './swagger/swagger';
import routes from 'routes';
import { CORS_CONFIGS } from '@constants/config';

const app: Application = express();

/* Disable swagger-ui REST-api document in production mode */
if (process.env.NODE_ENV !== 'production') {
  app.use('/docs', swaggerRoutes);
}

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* CORS allow */
app.use(cors(CORS_CONFIGS));

// Rest-API
app.use(routes);

// Catch 404
app.use((req, res, next) => {
  res.status(404).send("You've called a non-existed endpoint!");
});

export default app;
