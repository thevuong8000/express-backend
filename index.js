const express = require('express');
const { ROUTE } = require('./src/constants/global');

const {
	getUsers,
	createUser,
	changePassword,
	deleteUser,
	verifyUser
} = require('./src/api/users/users');

const app = express();
const port = 8000;

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({ type: 'success', message: 'Hello World!' });
});

app.get(ROUTE.USERS.ROOT, getUsers);
app.post(ROUTE.USERS.ROOT, createUser);
app.post(ROUTE.USERS.VERIFY, verifyUser);
app.put(ROUTE.USERS.ID, changePassword);
app.delete(ROUTE.USERS.ID, deleteUser);

/* Start listening */
app.listen(port, () => {
	console.log(`Back-end is listening at http://localhost:${port}`);
});
