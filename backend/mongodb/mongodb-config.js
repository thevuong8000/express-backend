const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://root:mongoadmin@mongodb:27017/express?authSource=admin&w=1';

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => console.log('Connect mongoDB successfully!'))
	.catch((error) => console.log('Fail to connect mongoDB!', error));
