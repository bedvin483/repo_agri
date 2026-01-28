const produitService = require('../services/produit.service');

const getAllProduit = async (req,res)=>{
    try{
        const produits = await produitService.getAll();
        return res.json(produits);
    }
    catch (err){
        return res.status(500).json({'erreur': err});
    }
}

const createProduit = async (req,res)=>{
    try {
        let produit = req.body;
        await produitService.createOne(produit);
        res.json({'message': 'produit ajouté'});
    } catch (err) {
        return res.status(500).json({'erreur': err});
    }
}

const changeInfoProduit = async (req,res)=>{
    try {
        let new_produit = req.body;
        let id_produit = parseInt(req.params.id);
        await produitService.changeInfo(id_produit,new_produit);
        return res.json({'message': 'produit modifié'});
    } catch (err) {
        return res.status(500).json({'erreur': err});
    }
}

const deleteProduit = async (req,res)=>{
    try {
        const id_produit = parseInt(req.params.id);
        await produitService.deleteOne(id_produit);
        return res.json({'message': 'produit supprimé'});
    } catch (err) {
        return res.status(500).json({'erreur': err});
    }
}

module.exports = { getAllProduit, createProduit, changeInfoProduit, deleteProduit };