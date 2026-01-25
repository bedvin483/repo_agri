const vendeurService = require('../services/vendeur.service');

exports.getAllVendeurs = async (req,res)=>{
    try{
        const vendeurs = await vendeurService.getAll();
        return res.json(vendeurs);
    }
    catch (err) {
        return res.status(500).json({'erreur': err.message});
    }
};