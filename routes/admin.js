const path = require('path');

const express = require('express');
const rootDir = require('../util/path');
const productsController = require('../controllers/products');

const router = express.Router();

// match only /add-product middleware
router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

exports.routes = router;
