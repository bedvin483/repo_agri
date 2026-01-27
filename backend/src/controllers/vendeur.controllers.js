const vendeurService = require('../services/vendeur.service');

const getAllVendeurs = async (req,res)=>{
    try{
        const vendeurs = await vendeurService.getAll();
        return res.json(vendeurs);
    }
    catch (err) {
        return res.status(500).json({'erreur': err.message});
    }
};

const createVendeur = async (req,res)=>{
    try{
        vendeur = req.body;
        await vendeurService.createOne(vendeur);
        return res.json({'message': 'vendeur ajouté'});
    }
    catch (err){
        return res.status(500).json({'erreur': err});
    }
};

const changeInfoVendeur = async (req,res)=>{    
    let new_info = req.body;
    let id = parseInt(req.params.id);
    try{
        await vendeurService.changeInfo(id,new_info);
        return res.json({'message': 'vendeur modifié'});
    }
    catch (err){
        return res.status(500).json({'erreur': err});
    }
};

const deleteVendeur = async (req,res)=>{
    let id = parseInt(req.params.id)
    try{
        await vendeurService.deleteOne(id);
        return res.json({'message': 'vendeur supprimé'});
    }
    catch (err){
        return res.status(500).json({'erreur': err});
    }
};

module.exports = {getAllVendeurs, createVendeur, changeInfoVendeur, deleteVendeur};