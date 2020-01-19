const Product = require('../models/product');



exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  // res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
  // res.sen d('<body><form action="/admin/add-product" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form></body>');
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    // sned shop.html file with dynamic content
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });


  // send static html file
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // res.send('<h1>Hi Express</h1>');
}
