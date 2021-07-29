import {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_SERVICE,
  MONGODB_SERVICE_PORT,
  MONGO_INITDB_DATABASE
} from '@constants/config';
import mongoose from 'mongoose';

const MONGO_URI = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}\
@${MONGODB_SERVICE}:${MONGODB_SERVICE_PORT}/${MONGO_INITDB_DATABASE}?authSource=admin`;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => console.log('Connect mongoDB successfully!'))
  .catch((error) => console.log('Fail to connect mongoDB!', error));
