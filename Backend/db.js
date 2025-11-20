// db.js
require('dotenv').config(); // para uso local

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || "localhost",
    port: parseInt(process.env.MYSQLPORT || "3306"),
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "HealthQuest",
    connectionLimit: 10
});

module.exports = pool;
