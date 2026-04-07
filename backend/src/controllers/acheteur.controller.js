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

const getAcheteurById = async (req,res)=>{
    try {
        const id_ach = req.id_ach;
        if(!id_ach){
            return res.status(404).json({message: 'acheteur inexistant'})
        }
        const acheteur = await acheteurService.getById(id_ach);
        return res.status(200).json(acheteur);
    } catch (err) {
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

const getAcheteurByNameAndPsw = async (req,res)=>{
    try {
        const {nom_ach, mdp_ach} = req.query;
        let nom_psw = {nom_ach, mdp_ach};
        const token = await acheteurService.getByNameAndPsw(nom_psw);
        return res.status(200).json({token});
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const createAcheteur = async (req,res)=>{
    try{
        let acheteur = req.body;
        const token = await acheteurService.createOne(acheteur);
        return res.status(201).json({token: token, message: 'acheteur ajouté'});
    }
    catch (err){
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const changeInfoAcheteur = async (req,res)=>{
    try{
        let new_info = req.body;
        let id_ach = req.id_ach;
        if(!id_ach){
            return res.status(404).json({message: 'acheteur inexistant'})
        }
        await acheteurService.changeInfo(id_ach,new_info);
        return res.status(200).json({'message': 'acheteur modifié'});
    }
    catch (err){
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const deleteAcheteur = async (req,res)=>{
    let id_ach = req.id_ach;
    if(!id_ach){
        return res.status(404).json({message: 'acheteur inexistant'})
    }
    try{
        await acheteurService.deleteOne(id_ach);
        return res.status(204).send();
    }
    catch (err){
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

module.exports = {getAllAcheteurs, getAcheteurById, getAcheteurByNameAndPsw, getAcheteurByname, createAcheteur, changeInfoAcheteur, deleteAcheteur};