const db = require('../config/db');
const req = require('../utils/sql.request');

const table = 'acheteur';
const columns = ['nom_ach','tel_ach','mdp_ach'];
const id_table = 'id_ach';

const findAll = async ()=>{
    const [rows] = await req.Select(db,table);
    return rows
}

const findByName = async (nom_ach='')=>{
    const [rows] = await req.SelectByColumn(db,table,'nom_ach',nom_ach);
    return rows;
};

const findById = async (id_ach=0)=>{
    const [rows] = await req.SelectByColumn(db,table,'id_ach',id_ach);
    return rows;
};

const create = async (acheteur={})=>{
    await req.Insert(db,table,columns,acheteur);
};

const change = async (id=0,info_acheteur={})=>{
    await req.Update(db,table,columns,id_table,id,info_acheteur);
};

const remove = async (id=0)=>{
    await req.Delete(db,table,id_table,id);
};

module.exports = {findAll, findById, findByName, create, change, remove};