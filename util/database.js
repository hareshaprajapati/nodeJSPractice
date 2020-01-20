const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('nodejspractice', 'root', 'root123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

/* const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejspractice',
    password: 'root123'
});

module.exports = pool.promise(); */