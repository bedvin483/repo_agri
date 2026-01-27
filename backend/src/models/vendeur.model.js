const db = require('../config/db');
const req = require('../utils/sql.request');

const findAll = async ()=>{
    const [rows] = await req.Select(db,'vendeur');
    return rows
}

const create = async (vendeur)=>{
    let {nom_vend,tel_vend,mdp_vend,ville_vend} = vendeur;
    let reqSQL = "insert into vendeur(nom_vend,tel_vend,mdp_vend,ville_vend) values(?,?,?,?)";
    await db.query(reqSQL,[nom_vend,tel_vend,mdp_vend,ville_vend]);
};

const change = async (id,info_vendeur)=>{
    let {new_nom_vend,new_tel_vend,new_mdp_vend,new_ville_vend} = info_vendeur;
    await db.query(`
        update vendeur 
        set nom_vend=?, tel_vend=?, mdp_vend=?, ville_vend=?
        where id_vend=?`,[new_nom_vend,new_tel_vend,new_mdp_vend,new_ville_vend,id])
};

const remove = async (id)=>{
    await req.Delete(db,'vendeur',['id_vend',id]);
};

module.exports = {findAll, create, change, remove};