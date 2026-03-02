const acheteurService = require('../services/acheteur.service');

const getAllAcheteurs = async (req,res)=>{
    try{
        const acheteur = await acheteurService.getAll();
        return res.status(200).json(acheteur);
    }
    catch (err) {
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const getAcheteurByname = async (req,res)=>{
    try {
        const {nom_ach} = req.query;
        const acheteur = await acheteurService.getByName(nom_ach);
        return res.status(200).json(acheteur);
        return 
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const createAcheteur = async (req,res)=>{
    try{
        let acheteur = req.body;
        await acheteurService.createOne(acheteur);
        return res.status(201).json({'message': 'acheteur ajouté'});
    }
    catch (err){
        return res.status(err.status || 500).json({message: err.message || err});
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
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const deleteAcheteur = async (req,res)=>{
    let id = parseInt(req.params.id)
    try{
        await acheteurService.deleteOne(id);
        return res.status(204).send();
    }
    catch (err){
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

module.exports = {getAllAcheteurs, getAcheteurByname, createAcheteur, changeInfoAcheteur, deleteAcheteur};