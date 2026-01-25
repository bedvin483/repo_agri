const mysql   = require('mysql2');
const myconnexion = require('express-myconnection');

optionDB = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'1234',
    database:'agri'
};

const db = mysql.createPool(optionDB)
//const [row] = db.query("select * from stock",[]);

module.exports = db.promise();