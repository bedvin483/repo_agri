const vendeurModel = require('../models/vendeur.model');

exports.getAll = async ()=>{
    return await vendeurModel.findAll()
}