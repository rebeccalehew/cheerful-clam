// Import & require express
const express = require('express');

// Import & require mysql2
const mysql = require('mysql2');

// Import & require dotenv to protect database credentials in .gitignore
const sequelize = require('./config/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

