const Product = require('../models/product');
// const Cart = require('../models/cart');


exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      // send shop.html file with dynamic content
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));

  /* Product.fetchAll()
  .then(([products]) => {
    // send shop.html file with dynamic content
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err)); */


  // send static html file
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  // res.send('<h1>Hi Express</h1>');
}

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  /*
  // with sequelize
  Product.findByPk(prodId)
  .then(product => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.log(err)); */

  // with mongodb
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));

  /* 
    // with sequelize
    Product.findAll({
      where:
        { id: prodId }
    })
      .then(product => {
        res.render('shop/product-detail', {
          product: product[0],
          pageTitle: product[0].title,
          path: '/products'
        });
      })
      .catch(err => console.log(err)); */

  /* Product.findById(prodId)
  .then(([product]) => {
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.log(err)); */
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
  /* Product.fetchAll()
  .then(([rows,fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err)); */
};


exports.getCart = (req, res, next) => {
  // console.log(req.user.cart); // null
  req.user.getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));

  /* // using sequelize 
  req.user.getCart()
    .then(cart => {
      cart.getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));

    })
    .catch(err => console.log(err)); */
  /*  Cart.getCart(cart => {
     if(cart){
       Product.fetchAll(products => {
         const cartProducts = [];
         for (product of products) {
           const cartProductData = cart.products.find(
             prod => prod.id === product.id
           );
           if (cartProductData) {
             cartProducts.push({ productData: product, qty: cartProductData.qty });
           }
         }
         res.render('shop/cart', {
           path: '/cart',
           pageTitle: 'Your Cart',
           products: cartProducts
         });
       });
     }else{
       res.render('shop/cart', {
         path: '/cart',
         pageTitle: 'Your Cart',
         products: []
       });
     }
     
   }); */
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
  /* // using sequlie 
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) { // update old quantity
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      })
    })
    .then(_ => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err)); */
  /* Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart'); */
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.deleteItemFromCart(prodId)
    .then(_ => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
  /*
  // using sequelize
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(_ => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err)); */
  /* Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  }); */
};

exports.postOrder = (req, res, next) => {
  console.log('POST ORDER');
  let fetchedCart;
  req.user.addOrder()
    .then(cart => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
  /*
  // using sequelize
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts()
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
          }))
        })
        .then(result => {
          return fetchedCart.setProducts(null);
        })
        .then(result => {
          res.redirect('/orders');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err)); */
};

exports.getOrders = (req, res, next) => {

   // eager loading of products
   req.user.getOrders()
   .then(orders => {
     console.log(orders)
     res.render('shop/orders', {
       path: '/orders',
       pageTitle: 'Your Orders',
       orders: orders
     });
   })
   .catch(err => console.log(err));

 /*  
//  using sequelize
 // eager loading of products
  req.user.getOrders({ include: ['products'] })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err)); */

};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

