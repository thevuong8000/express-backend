const { Pool } = require('pg');
const { HTTP_CODE } = require('../constants/global');

const pool = new Pool({
  user: 'dante',
  host: 'localhost',
  database: 'api',
  password: 'Manh1749635@',
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(HTTP_CODE.OK).json(results.rows);
  });
};

const getUserById = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(HTTP_CODE.OK).json(results.rows);
  });
};

const createUser = (request, response) => {
  const { name, email } = request.body;
  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2)',
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response
        .status(HTTP_CODE.CREATED)
        .send(`User added with ID: ${results.id}`);
    },
  );
};

const updateUser = (request, response) => {
  const id = parseInt(request.params.id, 10);
  const { name, email } = request.body;

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(HTTP_CODE.OK).send(`User modified with ID: ${id}`);
    },
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id, 10);

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(HTTP_CODE.OK).send(`User deleted with ID: ${id}`);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
