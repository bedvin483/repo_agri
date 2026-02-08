const vendeurModel = require('../models/vendeur.model');

const getAll = async ()=>{
    return await vendeurModel.findAll()
}

const getByName = async (nom_vend='')=>{
    return await vendeurModel.findByName(nom_vend);
}
const createOne = async (vendeur={})=>{
    let nom_vend = vendeur['nom_vend'];
    let vend = await getByName(nom_vend);
    if (vend==[]){
        await vendeurModel.create(vendeur);
    }
    else{
        return [];
    }
};

const changeInfo = async (id,new_info)=>{
    await vendeurModel.change(id,new_info)
};

const deleteOne = async (id)=>{
    await vendeurModel.remove(id);
};

module.exports = {getAll, deleteOne, createOne, changeInfo};