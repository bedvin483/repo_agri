const db = require('../config/db');
const req = require('../utils/sql.request');

const view = 'achats_de_commande';
const table = 'achat';
const columns = ['id_cmd','id_prod','quantite'];
const id_table = ['id_cmd','id_prod'];
const select_column = 'id_cmd';

const findAll = async ()=>{
    const [rows] = await req.Select(db,view);
    return rows;
}

const findByCommande = async (id_cmd=0) => {
    const [rows] = await req.SelectByColumn(db,view,select_column,id_cmd);
    return rows;
}

const create = async (values={})=>{
    await req.Insert(db,table,columns,values);
}

const change = async (id_cmd_prod=[],values={})=>{
    let [id_cmd,id_prod,...colonne] = columns;
    await req.UpdateBycolumns(db,table,colonne,id_table,id_cmd_prod,values)
}

const remove = async (id=[]) => {
    await req.DeleteByColumns(db,table,id_table,id);
}

const removeByCommande = async (id_cmd=0)=>{
    await req.Delete(db,table,'id_cmd',id_cmd);
}


module.exports = { findAll, findByCommande, create, change, remove, removeByCommande };