import express from 'express';
import cors from 'cors';
import swaggerRoutes from './swagger/swagger';
import routes from 'routes';
import { CORS_CONFIGS } from '@constants/config';
import { IS_STANDALONE } from './constants/config';

console.log('IS_STANDALONE:', IS_STANDALONE);
console.log('ENV:', process.env.NODE_ENV);

if (!IS_STANDALONE) import('./database/mongodb-config');

const app = express();

app.get('/', (req, res, next) => {
  res.send("Hello world");
})

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
