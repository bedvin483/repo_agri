const db = require('../config/db');

exports.findAll = async ()=>{
    const [rows] = await db.query("select * from vendeur");
    return rows
}