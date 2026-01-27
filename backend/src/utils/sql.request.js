
const Select = (db,table)=> db.query(`select * from ${table}`);

const Delete = (db,table,[id_key,id]) => db.query(`delete from ${table} where ${id_key}=?`,[id]);

module.exports = {Select, Delete};