const stockService = require('../services/stock.service');

const getStockByVend = async (req,res)=>{
    try {
        let id_vendeur = parseInt(req.params.id);
        let stock = await stockService.getByVend(id_vendeur);
        return res.json(stock);
    } catch (err) {
        return res.status(500).json({'erreur': err});
    }
}

const createStock = async (req,res)=>{
    try {
        let new_stock = req.body;
        /*  body must contains id_vend, id_prod, categorie, image_prod,  quantite, prix*/
        stockService.createOne(new_stock);
        return res.json({'message': 'produit ajouté'});
    } catch (err) {
        return res.status(500).json({'erreur': err});
    }
}

const changeInfoStock = async (req,res)=>{
    try {
        let new_info = req.body;
        await stockService.changeInfo(new_info);
        return res.json({'message': 'produit modifié'});
    } catch (err) {
        return res.status(500).json({'erreur': err});
    }
}

const deleteStock = async (req,res)=>{
    try {
        let {id_vend, id_prod} = req.query;
        let id = {id_vend, id_prod};
        await stockService.deleteOne(id);
        return res.json({'message': 'produit supprimé'});
    } catch (err) {
        return res.status(500).json({'erreur': err});
    }
}

module.exports = {getStockByVend, createStock, changeInfoStock, deleteStock};