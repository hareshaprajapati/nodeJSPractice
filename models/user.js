const mongodb = require('mongodb');
const getDB = require('../util/database').getDB;
class User {
    constructor(username, email, cart, id) {
        this.username = username;
        this.email = email;
        this.cart = cart; // {items : []}
        this._id = id;
    }

    save() {
        return getDB().collection('users').insertOne(this);

    }

    addToCart(product) {
        // find index of the product in cart
        const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString());
        let newQuantity = 1;
        // copy the cart items 
        const updatedcartProductItems = [...this.cart.items];
        if (cartProductIndex >= 0) {
            // update the quantity by 1
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedcartProductItems[cartProductIndex].quantity = newQuantity;
        } else {
            updatedcartProductItems.push({ productId: new mongodb.ObjectID(product._id), quantity: newQuantity })
        }
        // set the cart with items
        const updatedCart = { items: updatedcartProductItems };

        // const updatedCart = { items: [{...product, quantity: 1}]};
        return getDB().collection('users').updateOne(
            { _id: new mongodb.ObjectID(this._id) },
            { $set: { cart: updatedCart } }
        );
    }

    deleteItemFromCart(productId) {
        const updatedcartProductItems = this.cart.items.filter(cp => cp.productId.toString() !== productId.toString());
        // set the cart with items
        const updatedCart = { items: updatedcartProductItems };

        return getDB().collection('users').updateOne(
            { _id: new mongodb.ObjectID(this._id) },
            { $set: { cart: updatedCart } }
        );
    }

    getCart() {
        const productIds = this.cart.items.map(product => product.productId)
        return getDB().collection('products')
            .find({ _id: { $in: productIds } })
            .toArray()
            .then(products => {
                return products.map(product => {
                    return { ...product, quantity: this.cart.items.find(i => i.productId.toString() === product._id.toString()).quantity }
                });
            })
            .catch(err => console.log(err));
    }

    addOrder() {
        return this.getCart()
            .then(products => {
                const order = {
                    items: products,
                    user: {
                        _id: new mongodb.ObjectID(this._id),
                        username: this.username,
                        email: this.email
                    }
                }
                getDB().collection('orders')
                    .insertOne(order)
            })
            .then(results => {
                this.cart = { items: [] }
                return getDB().collection('users').updateOne(
                    { _id: new mongodb.ObjectID(this._id) },
                    { $set: { cart: { items: [] } } }
                );
            })
    }

    getOrders() {
        return getDB().collection('orders').find({'user._id' : new mongodb.ObjectID(this._id) }).toArray();
    }

    static findById(userId) {
        // return getDB().collection('users').find({_id : new mongodb.ObjectID(userId) }).next() // find will return cursor then .next will return the object
        return getDB().collection('users').findOne({ _id: new mongodb.ObjectID(userId) }) // will return object directly
            .then(user => {
                return user;
            })
            .catch(err => console.log(err));
    }
}
/* const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
}); */

module.exports = User;