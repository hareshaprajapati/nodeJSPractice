const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');
const productsController = require('../controllers/products');



const router = express.Router();

// start with exact / , if we use .use() method then will match any url
router.get('/',productsController.getProducts);

module.exports = router;