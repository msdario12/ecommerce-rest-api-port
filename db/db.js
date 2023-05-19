// db operations with node-postgresql
require('dotenv').config();
const { Pool, Client } = require('pg');

// pools will use environment variables
// for connection information
const pool = new Pool();

async function selectAll() {
	try {
		const res = await pool.query('SELECT * FROM users');
		console.log(res.rows);
	} catch (error) {
		console.error(error);
	}
	pool.end();
}

async function insertUser(email, username, password, first_name, last_name) {
	const text =
		'INSERT INTO users(email,username, password, first_name, last_name) VALUES($1,$2,$3,$4,$5) RETURNING *';
	const values = [email, username, password, first_name, last_name];

	try {
		const res = await pool.query(text, values);
		console.log(res.rows);
	} catch (error) {
		console.error('Error DB', error.stack);
	}
	pool.end();
}
// insertUser('email god', 'elbubu', '123456', 'DUKITO', 'GODDDD');
// selectAll();

function selectUserByUsername(username) {
	const text = 'SELECT * FROM users WHERE username = $1';
	const value = [username];
	pool.query(text, value, (err, result) => {
		if (err) {
			return console.error('Error executing query', err.stack);
		}
		if (!result.rows[0]) {
			return console.log('Not found');
		}
		console.log(result.rows[0]);
	});
	pool.end();
}

// selectUserByUsername('elbubu3');

module.exports = {
	query: (text, params, callback) => {
		return pool.query(text, params, callback);
	},
};
