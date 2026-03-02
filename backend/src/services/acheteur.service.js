const acheteurModel = require('../models/acheteur.model');
const psw = require('../utils/psw.manage');

const getAll = async ()=>{
    return await acheteurModel.findAll()
};

const getByName = async (nom_ach='')=>{
    return await acheteurModel.findByName(nom_ach);
};

const getById = async (id_ach=0)=>{
    return await acheteurModel.findById(id_ach);
};

const createOne = async (acheteur={})=>{
    let nom_ach = acheteur['nom_ach'];
    let ach = await getByName(nom_ach);
    if (ach.length === 0){
        acheteur.mdp_ach = await psw.chiffrer(acheteur.mdp_ach);
        let {tel_ach} = acheteur;
        if (tel_ach.length != 9){
            throw {'status': 400,'message':'le numéro doit avoir exactement 9 chiffres'};
        }
        try {
            await acheteurModel.create(acheteur);
        } catch (err) {
            throw err;
        }
    }
    else{
        throw {status:409,message:'le nom de l\'acheteur doit être unique'};
    }
};

const changeInfo = async (id=0,new_info={})=>{
    new_info.mdp_ach = await psw.chiffrer(new_info.mdp_ach);
    await acheteurModel.change(id,new_info)
};

const deleteOne = async (id=0)=>{
    const commandeService = require('./commande.service');
    
    await commandeService.deleteByAch(id);
    await acheteurModel.remove(id);
};

module.exports = {getAll, getById, getByName, deleteOne, createOne, changeInfo};