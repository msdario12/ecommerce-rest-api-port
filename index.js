const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;
// middlewares
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db/db');
// Passport local strategy
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// get router files
const users = require('./routes/users');
const products = require('./routes/products');
const orders = require('./routes/orders');

// Session from express
app.use(
	session({
		secret: 'secret-key',
		resave: false,
		saveUninitialized: false,
		cookie: { secure: true },
	})
);

// morgan loggin
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms')
);

// parse application/json
app.use(bodyParser.json());

// passport login local
app.use(passport.initialize());
app.use(passport.session());

// Complete the serializeUser function below:
passport.serializeUser((user, done) => {
	done(null, user.email);
});

passport.deserializeUser((email, done) => {
	// Look up user id in database.
	const text = 'SELECT * FROM users WHERE email = $1';
	const value = [email];

	db.query(text, value, (err, res) => {
		if (err) return done(err);
		done(null, res.rows[0]);
	});
});

passport.use(
	new LocalStrategy(async function (username, password, done) {
		const text = 'SELECT * FROM users WHERE username = $1';
		const value = [username];

		// db.query(text, value, (err, res) => {
		// 	if (err) return done(err);
		// 	if (!res.rows[0]) return done(null, false);
		// 	if (res.rows[0].password !== password) return done(null, false);
		// 	return done(null, res.rows[0]);
		// });

		try {
			const resDB = await db.query(text, value);
			if (!resDB.rows[0]) return done(null, false);
			if (resDB.rows[0].password !== password) return done(null, false);
			return done(null, resDB.rows[0]);
		} catch (err) {
			return done(err);
		}
	})
);

// login user
app.post(
	'/login',
	passport.authenticate('local', { failureRedirect: '/login' }),
	(req, res, next) => {
		console.log(req.session.passport);
		res.send('Correct king');
		// res.redirect('profile');
	}
);
// Handle all routes to '/users'
app.use('/users', users);

// Handle all routes to '/products'
app.use('/products', products);

// Handle all routes to '/orders'
app.use('/orders', orders);

app.listen(port, () => console.log('Server listening in port ' + port));
