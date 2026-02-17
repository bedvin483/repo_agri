const db = require('../config/db');
const req = require('../utils/sql.request');

const table = 'vendeur';
const id_table = 'id_vend';
const columns = ['nom_vend','tel_vend','mdp_vend','ville_vend'];
const findAll = async ()=>{
    const [rows] = await req.Select(db,table);
    return rows
}

const findByName = async (nom_vend='')=>{
    const [rows] = await req.SelectByColumn(db,table,'nom_vend',nom_vend);
    return rows;
}

const create = async (vendeur={})=>{
    await req.Insert(db,table,columns,vendeur);
};

const change = async (id=0,info_vendeur={})=>{
    await req.Update(db,table,columns,id_table,id,info_vendeur);
};

const remove = async (id=0)=>{
    await req.Delete(db,table,id_table,id);
};

module.exports = {findAll, findByName, create, change, remove}