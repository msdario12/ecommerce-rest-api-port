// Manage routes for orders items
const express = require('express');
const router = express.Router();

// get all orders
router.get('/', (req, res) => {
	res.send(`Welcome to orders king!`);
});
// get order by id
router.get('/:order_id', (req, res) => {
	const order_id = req.params.order_id;
	res.send(`El id que buscas es ${order_id} REYY`);
});
// add orders
router.post('/', (req, res) => {
	const body = req.body;
	res.send('order recibido king');
	console.log(body);
});
// modified a order by id
router.put('/:order_id', (req, res) => {
	const body = req.body;
});
// delete a order by id
router.delete('/:order_id', (req, res) => {});
module.exports = router;
