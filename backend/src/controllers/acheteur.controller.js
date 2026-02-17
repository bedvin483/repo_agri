const acheteurService = require('../services/acheteur.service');

const getAllAcheteurs = async (req,res)=>{
    try{
        const acheteur = await acheteurService.getAll();
        return res.status(200).json(acheteur);
    }
    catch (err) {
        return res.status(500).json({'erreur': err.message});
    }
};

const createAcheteur = async (req,res)=>{
    try{
        let acheteur = req.body;
        await acheteurService.createOne(acheteur);
        return res.status(201).json({'message': 'acheteur ajouté'});
    }
    catch (err){
        return res.status(err.status || 500).json({'erreur': err.message});
    }
};

const changeInfoAcheteur = async (req,res)=>{
    try{
        let new_info = req.body;
        let id = parseInt(req.params.id);
        await acheteurService.changeInfo(id,new_info);
        return res.status(200).json({'message': 'acheteur modifié'});
    }
    catch (err){
        return res.status(500).json({'erreur': err});
    }
};

const deleteAcheteur = async (req,res)=>{
    let id = parseInt(req.params.id)
    try{
        await acheteurService.deleteOne(id);
        return res.status(204).send();
    }
    catch (err){
        return res.status(500).json({'erreur': err});
    }
};

module.exports = {getAllAcheteurs, createAcheteur, changeInfoAcheteur, deleteAcheteur};