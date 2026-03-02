const commandeModel = require('../models/commande.model');
const vendeurService = require('./vendeur.service');
const acheteurService = require('./acheteur.service');

const getByVend = async (id_vend=0)=>{
    return await commandeModel.findByVend(id_vend);
};

const getByAch = async (id_ach=0)=>{
    return await commandeModel.findByAch(id_ach);
};

const createOne = async (new_commande={})=>{
    try{
        let {id_vend, id_ach} = new_commande;
        let vendeur = await vendeurService.getById(id_vend);
        let acheteur = await acheteurService.getById(id_ach);
        if (vendeur.length === 0){
            throw {status:400,message:'ce vendeur n\'existe pas'};
        }
        if (acheteur.length === 0){
            throw {status:400,message:'cet acheteur n\'existe pas'};
        }
        await commandeModel.create(new_commande);
    }
    catch(err){
        throw err;
    }
};

const changeInfo = async (id_cmd=0,new_info={})=>{
    try{
        await commandeModel.change(id_cmd,new_info);
    }
    catch(err){
        throw err;
    }
};

const deleteOne = async (id_commande=0)=>{
    await commandeModel.remove(id_commande);
};

const deleteByVend = async (id_vend=0)=>{
    await commandeModel.removeByVend(id_vend);
};

const deleteByAch = async (id_ach=0)=>{
    await commandeModel.removeByAch(id_ach);
};
module.exports = {getByAch, getByVend, deleteByAch, deleteByVend, deleteOne, createOne, changeInfo};