const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'db_sammy',
    password: ''
});

module.exports = pool.promise();