const db = require('../config/db');
const req = require('../utils/sql.request');

const table = 'commande';
const views = 'liste_commande'
const columns = ['id_vend','id_ach','dates','status'];
const id_table = 'id_cmd';
const select_column = 'id_vend';
const id_fk_key = ['id_vend','id_ach'];

const findByVend = async (id_vend=0)=>{
    const [rows] = await req.SelectByColumn(db,views,select_column,id_vend);
    return rows;
};

const findByAch = async (id_ach=0)=>{
    const [rows] = await req.SelectByColumn(db,views,'id_ach',id_vend);
    return rows;
};

const create = async (values={})=>{
    await req.Insert(db,table,columns,values);
};

const change = async (id_cmd=0,values={})=>{
    await req.Update(db,table,columns,id_table,id_cmd,values)
};

const remove = async (id_cmd=0) => {
    await req.Delete(db,table,id_table,id_cmd);
};

const removeByVend = async (id_vend=0)=>{
    await req.Delete(db,table,'id_vend',id_vend);
};

const removeByAch = async (id_ach=0)=>{
    await req.Delete(db,table,'id_ach',id_ach);
};

module.exports = {findByAch, findByVend, create, change, remove, removeByAch, removeByVend};