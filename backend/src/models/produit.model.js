const db = require('../config/db');
const req = require('../utils/sql.request');

const table = 'produit';
const columns = ['nom_prod'];
const id_table = 'id_prod';
const select_columns = 'nom_prod';

const findAll = async ()=>{
    const [rows] = await req.Select(db,table);
    return rows;
}

const findByName = async (value='')=>{
    const [rows] = await req.SelectByColumn(db,table,select_columns,value);
    return rows;
}

const create = async (produit={})=>{
    await req.Insert(db,table,columns,produit);
}

const change = async (id=0,new_produit={})=>{
    await req.Update(db,table,columns,id_table,id,new_produit);
}

const remove = async (id=0)=>{
    await req.Delete(db,table,id_table,id);
}

module.exports = { findAll, findByName, create, change, remove };

/*const f = async (value)=>{
    const res = await findByName(value);
    console.log(res);
}

f('Orange');
f('mang');*/