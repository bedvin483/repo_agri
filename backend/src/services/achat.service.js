const achatModel = require('../models/achat.model');
const commandeService = require('./commande.service');
const stockService = require('./stock.service');

const getByCommande = async (id_cmd=0)=>{
    return await achatModel.findByCommande(id_cmd);
}

const createOne = async (new_achat={})=>{
    let cmd = await commandeService.getById(new_achat['id_cmd']);
    if (cmd.length === 0){
        throw {status:404,message:'commande inexistante'}
    }
    let id_vend = cmd[0]['id_vend']
    let stock = await stockService.getByVend(id_vend);
    let id_prod = 'produit';
    let quantite = 0;
    let pasDeProduit = true;
    for (let i=0;i<stock.length;i++){
        id_prod = stock[i]['id_prod']
        if (id_prod == new_achat['id_prod']){
            quantite = stock[i]['quantite']
            if (quantite < new_achat['quantite']){
                throw {status:403,message:'quantite du produit insuffisant'};
            }
            pasDeProduit = false;
            break;
        }
    }
    if (pasDeProduit){
        throw{status:404,message:'le vendeur ne vend pas le produit'};
    }
    await achatModel.create(new_achat);
}

const changeInfo = async (new_info={})=>{
    let {id_cmd,id_prod,quantite} = new_info;
    let new_achat = {quantite};
    let id_cmd_prod = [id_cmd,id_prod];
    await achatModel.change(id_cmd_prod,new_achat);
}

const deleteOne = async (id={})=>{
    let {id_cmd,id_prod} = id;
    let id_cmd_prod = [id_cmd,id_prod];
    await achatModel.remove(id_cmd_prod);
}

const deleteByCommande = async (id_cmd=0)=>{
    await achatModel.removeByCommande(id_cmd);
}
module.exports = { getByCommande, createOne, changeInfo, deleteOne, deleteByCommande };