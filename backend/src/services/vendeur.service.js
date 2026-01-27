const vendeurModel = require('../models/vendeur.model');

const getAll = async ()=>{
    return await vendeurModel.findAll()
}

const createOne = async (vendeur)=>{
    await vendeurModel.create(vendeur);
};

const changeInfo = async (id,new_info)=>{
    await vendeurModel.change(id,new_info)
};

const deleteOne = async (id)=>{
    await vendeurModel.remove(id);
};

module.exports = {getAll, deleteOne, createOne, changeInfo};