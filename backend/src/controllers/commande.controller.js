const commandeService = require('../services/commande.service');

const getCommandeByVend = async (req,res)=>{
    try{
        let id_vend = parseInt(req.params.id);
        const commande = await commandeService.getByVend(id_vend);
        return res.status(200).json(commande);
    }
    catch(err){
        return res.status(err.status || 500).json({erreur: err.message || err});
    }
};

const getCommandeByAch = async (req,res)=>{
    try {
        let id_ach = parseInt(req.params.id);
        const commande = await commandeService.getByAch(id_ach);
        return res.status(200).json(commande);
    } catch (err) {
        return res.status(err.status || 500).json({erreur: err.message || err});
    }
};

const createCommande = async (req,res)=>{
    try {
        let new_commande = req.body;
        await commandeService.createOne(new_commande);
        return res.status(201).json({message: 'commande ajouté'});
    } catch (err) {
        return res.status(err.status || 500).json({erreur: err.message || err});
    }
};

const changeInfoCommande = async (req,res)=>{
    try {
        let id_cmd = req.params.id;
        let new_info = req.body;
        await commandeService.changeInfo(id_cmd,new_info);
        return res.status(200).json({message:'commande modifié'});
    } catch (err) {
        return res.status(err.status || 500).json({erreur: err.message || err});
    }
};

const deleteCommande = async (req,res)=>{
    try {
        let id_cmd = req.params.id;
        await commandeService.deleteOne(id_cmd);
        return res.status(204).send();
    } catch (err) {
        return res.status(err.status || 500).json({erreur: err.message || err});
    }
};

module.exports = {getCommandeByAch, getCommandeByVend, createCommande, changeInfoCommande, deleteCommande};