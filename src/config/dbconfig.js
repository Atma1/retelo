const mysql = require("mysql2/promise");

const dbPool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    dateStrings: true,
})

module.exports = dbPool;