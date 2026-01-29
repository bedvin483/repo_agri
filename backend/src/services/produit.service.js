const produitModel = require('../models/produit.model');

const getAll = async ()=>{
    return await produitModel.findAll();
}

const getByName = async (name)=>{
    return await produitModel.findByName(name);
}

const createOne = async (produit)=>{
    await produitModel.create(produit);
}

const changeInfo = async (id,new_produit)=>{
    await produitModel.change(id,new_produit);
}

const deleteOne = async (id)=>{
    await produitModel.remove(id);
}

module.exports = { getAll, getByName, createOne, changeInfo, deleteOne };