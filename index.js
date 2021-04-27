const express = require('express');

const db = require('./queries');

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ type: 'success', message: 'Hello World!' });
});

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
