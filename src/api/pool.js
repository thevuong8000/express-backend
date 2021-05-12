const { Pool } = require('pg');

const pool = new Pool({
	user: 'dante',
	host: 'localhost',
	database: 'api',
	password: 'Manh1749635@',
	port: 5432
});

module.exports = pool;
