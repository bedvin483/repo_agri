const stockService = require('../services/stock.service');

const getStockByVend = async (req,res)=>{
    try {
        let id_vendeur = req.id_vend;
        if(!id_vendeur){
            throw {status:401,message:'token invalide'}
        }
        let stock = await stockService.getByVend(id_vendeur);
        return res.status(200).json(stock);
    } catch (err) {
        return res.status(500).json({'erreur': err});
    }
}

const createStock = async (req,res)=>{
    try {
        let new_stock = req.body;
        new_stock['id_vend'] = req.id_vend;
        if(!new_stock['id_vend']){
            throw {status:401,message:'token invalide'}
        }
        /*  body must contains id_prod, categorie, image_prod,  quantite, prix*/
        await stockService.createOne(new_stock);
        return res.status(201).json({'message': 'produit ajouté'});
    } catch (err) {
        return res.status(err.status || 500).json({'erreur': err.message || err});
    }
}

const changeInfoStock = async (req,res)=>{
    try {
        let new_info = req.body;
        new_info['id_vend'] = req.id_vend;
        if(!new_info['id_vend']){
            throw {status:401,message:'token invalide'}
        }
        await stockService.changeInfo(new_info);
        return res.status(200).json({'message': 'produit modifié'});
    } catch (err) {
        return res.status(err.status || 500).json({'erreur': err.message || err});
    }
}

const deleteStock = async (req,res)=>{
    try {
        let id_vend = req.id_vend;
        if(!id_vend){
            throw {status:401,message:'token invalide'}
        }
        let {id_prod} = req.query;
        let id = {id_vend, id_prod};
        await stockService.deleteOne(id);
        return res.status(204).send();
    } catch (err) {
        return res.status(500).json({'erreur': err});
    }
}

module.exports = {getStockByVend, createStock, changeInfoStock, deleteStock};