const mysql = require('mysql2/promise')

const dbConfig = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'data_bobross',
});

module.exports = db;