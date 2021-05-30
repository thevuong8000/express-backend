import { Secret } from 'jsonwebtoken';

// Json-web-token
export const JWT_KEY: Secret = process.env.JWT_SECRET_KEY;
export const JWT_SALT: number = 10;

// MongoDB
export const MONGODB_USERNAME: string = process.env.MONGODB_USERNAME;
export const MONGODB_PASSWORD: string = process.env.MONGODB_PASSWORD;
export const MONGODB_SERVICE: string = process.env.MONGODB_SERVICE;
export const MONGODB_SERVICE_PORT: string = process.env.MONGODB_SERVICE_PORT;
export const MONGO_INITDB_DATABASE: string = process.env.MONGO_INITDB_DATABASE;
