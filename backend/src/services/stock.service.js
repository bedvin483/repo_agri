const stockModel = require('../models/stock.model');
const produitService = require('./produit.service');

const getByVend = async (id_vend=0)=>{
    return await stockModel.findByVend(id_vend);
}

const createOne = async (new_stock={})=>{
    const vendeurService = require('./vendeur.service');
    let vend = await vendeurService.getById(new_stock['id_vend']);
    if (vend.length === 0 ){
        throw {status:404,message:'vendeur inexistant'};
    }
    let produit = await produitService.getByName(new_stock['nom_prod']);
    if (produit.length == 0){
        let {nom_prod} = new_stock;
        let new_produit = {nom_prod};
        await produitService.createOne(new_produit);
        //produit = await produitService.getByName(new_stock['nom_prod']);
        while (produit.length == 0) {
            produit = await produitService.getByName(new_stock['nom_prod']);
        }
    }
    new_stock['id_prod'] = parseInt(produit[0]['id_prod']);
    let stock_vend = await getByVend(vend[0]['id_vend']);
    if (stock_vend.length > 0){
        for (let elt of stock_vend){
            if (elt['id_prod'] == new_stock['id_prod']){
                throw {status:409,message:'ce vendeur a déjà ce produit en stock'};
            }
        }
    }
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

const deleteByVend = async (id_vend=0)=>{
    await stockModel.removeByVend(id_vend);
}
module.exports = { getByVend, createOne, changeInfo, deleteOne, deleteByVend };