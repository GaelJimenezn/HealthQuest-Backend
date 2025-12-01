// db.js
require('dotenv').config();

// CAMBIO IMPORTANTE: Quitamos "/promise" para usar callbacks clásicos
const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || "localhost",
    port: parseInt(process.env.MYSQLPORT || "3306"),
    user: process.env.MYSQLUSER || "root",
    password: process.env.MYSQLPASSWORD || "",
    database: process.env.MYSQLDATABASE || "HealthQuest",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportamos el pool directamente
module.exports = pool;