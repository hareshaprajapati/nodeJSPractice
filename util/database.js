const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejspractice',
    password: 'root123'
});

module.exports = pool.promise();