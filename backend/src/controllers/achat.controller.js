const achatService = require('../services/achat.service');

const getAchatsByCommannde = async (req,res)=>{
    try {
        const id_cmd = parseInt(req.params.id);
        const achats = await achatService.getByCommande(id_cmd);
        return res.status(200).json(achats);
    } catch (err) {
        res.status(err.message || 500).json({message: err.message || err});
    }
};

const createAchat = async (req,res)=>{
    try {
        const new_achat = req.body;
        await achatService.createOne(new_achat);
        return res.status(201).json({message:'achat ajouté'});
    } catch (err) {
        return res.status(err.status || 500).json(err.message || err);
    }
};

const changeInfoAchat = async (req,res)=>{
    try {
        const new_info = req.body;
        await achatService.changeInfo(new_info);
        return res.status(200).json({message:'achat modifié'});
    } catch (err) {
        return res.status(err.status || 500).json(err.message || err);
    }
};

const deleteAchat = async (req,res)=>{
    try {
        const {id_cmd,id_prod} = req.query;
        let id = {id_cmd,id_prod}
        await achatService.deleteOne(id);
        return res.status(204).send()
    } catch (err) {
        return res.status(err.status || 500).json(err.message || err);
    }
};

module.exports = {getAchatsByCommannde, createAchat, changeInfoAchat, deleteAchat};