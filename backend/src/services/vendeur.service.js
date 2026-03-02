const vendeurModel = require('../models/vendeur.model');
const psw = require('../utils/psw.manage');


const getAll = async ()=>{
    return await vendeurModel.findAll()
}

const getById = async (id_vend=0)=>{
    return await vendeurModel.findById(id_vend);
}

const getByName = async (nom_vend='')=>{
    return await vendeurModel.findByName(nom_vend);
}
const createOne = async (vendeur={})=>{
    let nom_vend = vendeur['nom_vend'];
    let vend = await getByName(nom_vend);
    if (vend.length === 0){
        vendeur.mdp_vend = await psw.chiffrer(vendeur.mdp_vend);
        let {tel_vend} = vendeur;
        if (tel_vend.length != 9){
            throw {status: 400,message:'le numéro doit avoir exactement 9 chiffres'};
        }
        try{
            await vendeurModel.create(vendeur);
        }
        catch(err){
            throw err;
        }
    }
    else{
        throw {status:409, message:'Le nom du vendeur doit être unique'};
    }
};

const changeInfo = async (id=0,new_info={})=>{
    new_info.mdp_vend = await psw.chiffrer(new_info.mdp_vend);
    await vendeurModel.change(id,new_info)
};

const deleteOne = async (id_vend=0)=>{
    const commandeService = require('./commande.service');
    const stockService = require('./stock.service');
    
    await stockService.deleteByVend(id_vend);
    await commandeService.deleteByVend(id_vend)
    await vendeurModel.remove(id_vend);
};

module.exports = {getAll, getById, getByName, deleteOne, createOne, changeInfo};