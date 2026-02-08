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

const create = async (vendeur)=>{
    //let {nom_vend,tel_vend,mdp_vend,ville_vend} = vendeur;
    //let reqSQL = "insert into vendeur(nom_vend,tel_vend,mdp_vend,ville_vend) values(?,?,?,?)";
    await req.Insert(db,table,columns,vendeur);
};

const change = async (id,info_vendeur)=>{
    //let {new_nom_vend,new_tel_vend,new_mdp_vend,new_ville_vend} = info_vendeur;
    await req.Update(db,table,columns,id_table,id,info_vendeur);
};

const remove = async (id)=>{
    await req.Delete(db,table,id_table,id);
};

module.exports = {findAll, findByName, create, change, remove}