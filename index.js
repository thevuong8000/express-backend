const express = require('express');
const { ROUTE } = require('./src/constants/global');

const db = require('./src/query/queries');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ type: 'success', message: 'Hello World!' });
});

app.get(ROUTE.USERS.ROOT, db.getUsers);
app.post(ROUTE.USERS.ROOT, db.createUser);

app.get(ROUTE.USERS.ID, db.getUserById);
app.put(ROUTE.USERS.ID, db.updateUser);
app.delete(ROUTE.USERS.ID, db.deleteUser);

app.listen(port, () => {
  console.log(`Back-end is listening at http://localhost:${port}`);
});
