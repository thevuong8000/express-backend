import { Secret } from 'jsonwebtoken';
import cors from 'cors';

// Json-web-token
export const JWT_KEY: Secret = process.env.JWT_SECRET_KEY;
export const JWT_SALT: number = 10;

// MongoDB
export const MONGODB_USERNAME: string = process.env.MONGODB_USERNAME;
export const MONGODB_PASSWORD: string = process.env.MONGODB_PASSWORD;
export const MONGODB_SERVICE: string = process.env.MONGODB_SERVICE;
export const MONGODB_SERVICE_PORT: string = process.env.MONGODB_SERVICE_PORT;
export const MONGO_INITDB_DATABASE: string = process.env.MONGO_INITDB_DATABASE;

export const IS_STANDALONE = process.env.IS_STANDALONE.toLowerCase() === 'true';

// CORS allow
const CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:8000'];
export const CORS_CONFIGS: cors.CorsOptions = {
  origin: CORS_ORIGINS,
  optionsSuccessStatus: 200
};
