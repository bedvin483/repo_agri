const vendeurService = require('../services/vendeur.service');

const getAllVendeurs = async (req,res)=>{
    try{
        const vendeurs = await vendeurService.getAll();
        return res.statu(200).json(vendeurs);
    }
    catch (err) {
        return res.status(500).json({'erreur': err.message});
    }
};

const createVendeur = async (req,res)=>{
    try{
        let vendeur = req.body;
        await vendeurService.createOne(vendeur);
        return res.status(201).json({'message': 'vendeur ajouté'});
    }
    catch (err){
        console.log(err);
        return res.status(err.status || 500).json({'erreur': err.message});
    }
};

const changeInfoVendeur = async (req,res)=>{
    try{
        let new_info = req.body;
        let id = parseInt(req.params.id);
        await vendeurService.changeInfo(id,new_info);
        return res.status(200).json({'message': 'vendeur modifié'});
    }
    catch (err){
        return res.status(500).json({'erreur': err});
    }
};

const deleteVendeur = async (req,res)=>{
    let id = parseInt(req.params.id)
    try{
        await vendeurService.deleteOne(id);
        return res.send(204).send();
    }
    catch (err){
        return res.status(500).json({'erreur': err});
    }
};

module.exports = {getAllVendeurs, createVendeur, changeInfoVendeur, deleteVendeur};