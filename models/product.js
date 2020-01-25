const mongodb = require('mongodb');

const getDB = require('../util/database').getDB;

class Product {
  constructor(title, price, imageURL, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageURL = imageURL;
    this.description = description;
    if(id){
      this._id = new mongodb.ObjectID(id);
    }
   this.userId = userId;
  }

  save() {
    const db = getDB();
    let dbOP;
    if(this._id){
      // update docuemnt
      dbOP = db.collection('products').updateOne({_id: this._id}, {$set : this});
      // dbOP = db.collection('products').updateOne({_id: this._id}, {$set : {title: this.title, price: this.price}});
    }else{ // create new one
      dbOP = db.collection('products').insertOne(this);
    }
    return dbOP
      .then(result => {
      })
      .catch(err => console.log(err));
    // db.collection('products').insertMany([])
  }

  static findAll() {
    // find return cursor then we need to do pagination because of million of records
    return getDB().collection('products').find().toArray()
      .then(products => {
        return products;
      })
      .catch(err => console.log(err)); 
    // return db.collection('products').find({title: 'test'});
  }

  static findById(prodID){
    // mongodb store _id as a object of ObjectID()
    return getDB().collection('products').find({_id: new mongodb.ObjectId(prodID)}).next()
      .then(product => {
        return product;
      })
      .catch(err => console.log(err)); 
  }

  static deleteById(prodID){
    return getDB().collection('products').deleteOne({_id: new mongodb.ObjectId(prodID)}) 
    .then(product => {
    })
    .catch(err => console.log(err)); 
  }

}
/* const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageURL: Sequelize.STRING,
  description: Sequelize.STRING
}); */

module.exports = Product;

/* const db = require('../util/database')

const Cart = require('./cart')


module.exports = class Product {

    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
      }

      save() {
        return db.execute('INSERT INTO products (title,price,description,imageURL) values(?,?,?,?)',
        [this.title, this.price, this.description, this.imageUrl]);
      }

      static deleteById(id) {
      }

    static fetchAll() {
      return db.execute('SELECT * FROM products');
    }

    static findById(id) {
      return db.execute('SELECT * FROM products where id=?', [id]);
    }
} */

/* const fs = require('fs');
const path = require('path');

const db = require('../util/database')

const rootDir = require('../util/path');
const Cart = require('./cart')

const p = path.join(rootDir,'data','products.json');

const getProductsFromFile = cb => {
    fs.readFile(p, (error, fileContent) => {
        let products = [];
        if(!error && fileContent.length > 0 ){
            products = JSON.parse(fileContent);
        }
        cb(products);
    });
}

module.exports = class Product {

    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
      }

      save() {
        getProductsFromFile(products => {
          if (this.id) {
            const existingProductIndex = products.findIndex(
              prod => prod.id === this.id
            );
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
              console.log(err);
            });
          } else {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          }
        });
      }

      static deleteById(id) {
        getProductsFromFile(products => {
          const product = products.find(prod => prod.id === id);
          const updatedProducts = products.filter(prod => prod.id !== id);
          fs.writeFile(p, JSON.stringify(updatedProducts), err => {
            if (!err) {
              Cart.deleteProduct(id, product.price);
            }
          });
        });
      }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
} */