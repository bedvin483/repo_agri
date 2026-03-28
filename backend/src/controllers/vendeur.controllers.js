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
        const id_vend = req.id_vend;
        if(!id_vend){
            return res.status(404).json({message: 'vendeur inexistant'})
        }
        const vendeur = await vendeurService.getById(id_vend);
        return res.status(200).json(vendeur);
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const getVendeurByNameAndPsw = async (req,res)=>{
    try {
        const {nom_vend, mdp_vend} = req.query;
        let nom_psw = {nom_vend, mdp_vend};
        const token = await vendeurService.getByNameAndPsw(nom_psw);
        return res.status(200).json({token});
    } catch (err) {
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const createVendeur = async (req,res)=>{
    try{
        let vendeur = req.body;
        const token = await vendeurService.createOne(vendeur);
        return res.status(201).json({token: token, message: 'vendeur ajouté'});
    }
    catch (err){
        return res.status(err.status || 500).json({erreur: err.message || err});
    }
};

const changeInfoVendeur = async (req,res)=>{
    try{
        let new_info = req.body;
        let id_vend = req.id_vend;
        if(!id_vend){
            return res.status(404).json({message: 'vendeur inexistant'})
        }
        await vendeurService.changeInfo(id_vend,new_info);
        return res.status(200).json({'message': 'vendeur modifié'});
    }
    catch (err){
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

const deleteVendeur = async (req,res)=>{
    try{
        let id_vend = req.id_vend;
        if(!id_vend){
            return res.status(404).json({message: 'vendeur inexistant'})
        }
        await vendeurService.deleteOne(id_vend);
        return res.send(204).send();
    }
    catch (err){
        return res.status(err.status || 500).json({message: err.message || err});
    }
};

module.exports = {getAllVendeurs, getVendeurById, getVendeurByNameAndPsw, createVendeur, changeInfoVendeur, deleteVendeur};