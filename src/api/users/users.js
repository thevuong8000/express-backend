const { HTTP_CODE } = require('../../constants/global');
const pool = require('../pool');

const USERS = 'users';
const COL = {
	ID: 'id',
	NAME: 'username',
	PASSWORD: 'password'
};

const getUsers = (request, response) => {
	pool.query(`SELECT * FROM ${USERS}`, (error, results) => {
		if (error) return response.status(HTTP_CODE.BAD_REQUEST).send(error);
		return response.status(HTTP_CODE.OK).json(results.rows);
	});
};

const createUser = (request, response) => {
	const { username, password } = request.body;
	pool.query(
		`INSERT INTO ${USERS} (${COL.NAME}, ${COL.PASSWORD}) VALUES ($1, $2)`,
		[username, password],
		(error, results) => {
			if (error) return response.status(HTTP_CODE.BAD_REQUEST).send(error);
			return response.status(HTTP_CODE.CREATED).send(`User added with ID: ${results.id}`);
		}
	);
};

const changePassword = (request, response) => {
	const { id } = request.params;
	const { password } = request.body;

	pool.query(
		`UPDATE ${USERS} SET password = $1 WHERE id = $2`,
		[password, id],
		(error, results) => {
			if (error) return response.status(HTTP_CODE.BAD_REQUEST).send(error);
			return response.status(HTTP_CODE.OK).send(`User modified with ID: ${id}`);
		}
	);
};

const deleteUser = (request, response) => {
	const { id } = request.params;

	pool.query(`DELETE FROM ${USERS} WHERE id = $1`, [id], (error, results) => {
		if (error) return response.status(HTTP_CODE.BAD_REQUEST).send(error);
		return response.status(HTTP_CODE.OK).send(`User deleted with ID: ${id}`);
	});
};

const verifyUser = (request, response) => {
	const { username, password } = request.body;
	pool.query(
		`SELECT ${COL.NAME}, ${COL.PASSWORD} FROM ${USERS} WHERE username = $1`,
		[username],
		(error, results) => {
			if (error) return response.status(HTTP_CODE.BAD_REQUEST).send(error);

			const user = results.rows[0];
			if (!user || user.password !== password)
				return response.status(HTTP_CODE.BAD_REQUEST).json({ login: 'failed' });
			return response.status(HTTP_CODE.OK).json({ login: 'succeed' });
		}
	);
};

module.exports = {
	getUsers,
	createUser,
	changePassword,
	deleteUser,
	verifyUser
};
