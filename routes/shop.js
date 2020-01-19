const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');


const router = express.Router();

// start with exact / , if we use .use() method then will match any url
router.get('/', (req, res, next) => {

    const products = adminData.products;
    // sned shop.html file with dynamic content
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
    // send static html file
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // res.send('<h1>Hi Express</h1>');
});

module.exports = router;