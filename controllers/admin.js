
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
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
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, imageUrl, description, null , req.user._id)
  product.save()
 
  /* // with sequelize 
  // user hasMany Product so createProduct, it will add userId in Product table automatically
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }) */
  .then(_ => {
      console.log('Product created');
      res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  // create will automatically save, build() create object but we need to save it manually
 /*  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
  .then(_ => {
      console.log('Product created');
      res.redirect('/admin/products');
  })
  .catch(err => console.log(err)); */

  /* const product = new Product(null, title, imageUrl, description, price);
  product.save()
  .then(_ => {
    res.redirect('/');

  })
  .catch(err => console.log(err)); */
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  
  // with mongodb
  Product.findById(prodId)
  .then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });

  /* // with sequelize
  req.user.getProducts( {where: {id: prodId}})
  // Product.findByPk(prodId)
  .then(products => {
    const product = products[0];
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }); */

  /* Product.findById(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  }); */
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // using mongoDB
  const product = new Product(updatedTitle, updatedPrice, updatedImageUrl, updatedDesc, prodId );
  product.save()
  .then(value => {
    console.log('PRODUCT UPDATED.');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));
  /*
  // using sequelize 
  Product.findByPk(prodId)
  .then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.imageURL = updatedImageUrl;
    product.description = updatedDesc;
    return product.save()
  })
  .then(value => {
    console.log('PRODUCT UPDATED.');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err)); */
  
  /* const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products'); */
};



exports.getProducts = (req, res, next) => {
  // with mongodb
    Product.findAll()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));

    /*    // with sequelize 
  req.user.getProducts()
  // Product.findAll()
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err)); */
  /* Product.fetchAll()
  .then(([products]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err)); */
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
 // using mongoDB
  Product.deleteById(prodId)
  .then(_ =>{
    console.log('PRODUCT DESTROYED');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));

 // using sequelize
  /* Product.findByPk(prodId)
  .then(product => {
    return product.destroy()
  }).then(_ =>{
    console.log('PRODUCT DESTROYED');
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err)); */

  /* Product.destroy({
    where: {id: prodId}
  })
  .then(response => {
    console.log('PRODUCT DESTROYED');
    res.redirect('/admin/products');
  }); */
  /* Product.deleteById(prodId);
  res.redirect('/admin/products'); */
};