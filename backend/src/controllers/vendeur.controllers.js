const vendeurService = require('../services/vendeur.service');

const getAllVendeurs = async (req,res)=>{
    try{
        const vendeurs = await vendeurService.getAll();
        return res.status(200).json(vendeurs);
    }
    catch (err) {
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const getVendeurById = async (req,res)=>{
    try {
        const id_vend = req.params.id;
        const vendeur = await vendeurService.getById(id_vend);
        return res.status(200).json(vendeur);
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const getVendeurByName = async (req,res)=>{
    try {
        const {nom_vend} = req.query;
        const vendeur = await vendeurService.getByName(nom_vend);
        return res.status(200).json(vendeur);
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message || err});
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
        return res.status(err.status || 500).json({erreur: err.message || err});
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
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const deleteVendeur = async (req,res)=>{
    let id = parseInt(req.params.id)
    try{
        await vendeurService.deleteOne(id);
        return res.send(204).send();
    }
    catch (err){
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

module.exports = {getAllVendeurs, getVendeurById, getVendeurByName, createVendeur, changeInfoVendeur, deleteVendeur};