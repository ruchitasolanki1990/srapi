const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
//  user: process.env.DB_USER || 'root',
//  password: process.env.DB_PASSWORD || 'Janki123',
  user: 'root',
  password: 'Janki123',
  database:process.env.DB_NAME || 'srtefcoat',
});


//  Enable Promises
const db = pool.promise();

module.exports = db;
