// Users routers

const express = require('express');
const router = express.Router();
const db = require('../db/db');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// get user from username for login
router.get('/:username', (req, res) => {
	const username = req.params;
	res.send('Welcome to ' + username.username);
});
// post user, register user
router.post('/register', async (req, res) => {
	const { email, username, password, first_name, last_name } = req.body;
	const text =
		'INSERT INTO users(email,username, password, first_name, last_name) VALUES($1,$2,$3,$4,$5) RETURNING *';
	if (!email || !username || !password || !first_name || !last_name) {
		res.status(400);
		res.send('Your missing some values');
	}
	// faltaria agregar que se verifique que el username y email sean unicos
	// mediante una consulta a la bd
	const values = [email, username, password, first_name, last_name];
	try {
		const resDB = await db.query(text, values);
		res.status(201);
		res.send(resDB.rows[0]);
	} catch (error) {
		console.error(error.stack);
		res.status(400);
		res.send('Error add user to db');
	}
});

module.exports = router;
