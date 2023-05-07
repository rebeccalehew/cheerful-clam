require('dotenv').config();
const mysql = require('mysql2');

// Database connection
const bookstore = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  database: process.env.DB_NAME,
});

module.exports = bookstore;