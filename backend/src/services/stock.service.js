const stockModel = require('../models/stock.model');
const produitService = require('./produit.service');

const getByVend = async (id_vend=0)=>{
    return await stockModel.findByVend(id_vend);
}

const createOne = async (new_stock={})=>{
    let produit = await produitService.getByName(new_stock['nom_prod']);
    if (produit.length===0){
        let new_produit = new_stock['nom_prod'];
        new_produit = {new_produit};
        produitService.createOne(new_produit);
        produit = await produitService.getByName(new_stock['nom_prod']);
        console.log(produit);
    }
    console.log(produit);
    console.log([].length);
    new_stock['id_prod'] = parseInt(produit[0]['id_prod']);
    let {id_vend, nom_prod,id_prod, categorie, image_prod,quantite,prix} = new_stock;
    let stock = {id_vend, id_prod, categorie, image_prod,quantite,prix}
    await stockModel.create(stock);
}

const changeInfo = async (new_info={})=>{
    let {id_vend,id_prod,categorie,image_prod,quantite,prix} = new_info;
    let new_stock = {categorie,image_prod,quantite,prix};
    let id_vend_prod = [id_vend,id_prod];
    await stockModel.change(id_vend_prod,new_stock);
}

const deleteOne = async (id={})=>{
    let {id_vend,id_prod} = id;
    let id_vend_prod = [id_vend,id_prod];
    await stockModel.remove(id_vend_prod)
}

module.exports = { getByVend, createOne, changeInfo, deleteOne };