const db = require('../config/db');
const req = require('../utils/sql.request');

const view = 'liste_produit';
const table = 'stock';
const columns = ['id_vend','id_prod','categorie','image_prod','quantite','prix'];
const id_table = ['id_vend','id_prod'];
const select_column = 'id_vend';

const findAll = async ()=>{
    const [rows] = await req.Select(db,view);
    return rows;
}

const findByVend = async (id_vend=0) => {
    const [rows] = await req.SelectByColumn(db,view,select_column,id_vend);
    return rows;
}

const create = async (values={})=>{
    await req.Insert(db,table,columns,values);
}

const change = async (id_vend_prod=[],values={})=>{
    let [id_vend,id_prod,...colonne] = columns;
    await req.UpdateBycolumns(db,table,colonne,id_table,id_vend_prod,values)
}

const remove = async (id=[]) => {
    await req.DeleteByColumns(db,table,id_table,id);
}

const removeByVend = async (id_vend=0)=>{
    await req.Delete(db,table,'id_vend',id_vend);
}


module.exports = { findAll, findByVend, create, change, remove, removeByVend };