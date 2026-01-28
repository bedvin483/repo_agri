const db = require('../config/db');
const req = require('../utils/sql.request');

const table = 'produit';
const columns = ['nom_prod'];
const id_table = 'id_prod';

const findAll = async ()=>{
    const [rows] = await req.Select(db,table);
    return rows;
}

const create = async (produit)=>{
    await req.Insert(db,table,columns,produit);
}

const change = async (id,new_produit)=>{
    await req.Update(db,table,columns,id_table,id,new_produit);
}

const remove = async (id)=>{
    await req.Delete(db,table,id_table,id);
}

module.exports = { findAll, create, change, remove };