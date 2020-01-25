const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// _ for variable using internally only
let _db;

const mongoConnect = (callback) => {
    // if shop database does not exist then mongo will create automatically
    MongoClient.connect('mongodb+srv://root:root123@nodejspractice-ewgam.mongodb.net/shop?retryWrites=true&w=majority')
    .then(result => {
        console.log('Connected');
        _db = result.db(); // use connection pool
        callback();
    })
    .catch(err => console.log(err));
}

const getDB = () => {
    if(_db){
        return _db;
    }
    throw "No database found"
}

module.exports.mongoConnect = mongoConnect;
module.exports.getDB = getDB;

/* const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('nodejspractice', 'root', 'root123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize; */

/* const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejspractice',
    password: 'root123'
});

module.exports = pool.promise(); */