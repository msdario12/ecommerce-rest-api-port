// Manage routes for products items
const express = require('express');
const router = express.Router();

// get all products
router.get('/', (req, res) => {
	res.send(`Welcome to products king!`);
});
// get product by id
router.get('/:product_id', (req, res) => {
	const product_id = req.params.product_id;
	res.send(`El id que buscas es ${product_id} REYY`);
});
// add products
router.post('/', (req, res) => {
	const body = req.body;
	res.send('Producto recibido king');
	console.log(body);
});
// modified a product by id
router.put('/:product_id', (req, res) => {
	const body = req.body;
});
// delete a product by id
router.delete('/:product_id', (req, res) => {});
module.exports = router;
