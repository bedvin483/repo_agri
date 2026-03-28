const mysql   = require('mysql2');
require('dotenv').config()

const optionDB = {
    host:process.env.db_host,
    port:process.env.db_port,
    user:process.env.db_user,
    password:process.env.db_pw,
    database:process.env.db_name
};

const db = mysql.createPool(optionDB)

module.exports = db.promise();