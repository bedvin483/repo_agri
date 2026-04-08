const acheteurModel = require('../models/acheteur.model');
const psw = require('../utils/psw.manage');
const createJwt = require('../utils/createJwt');


const getAll = async ()=>{
    return await acheteurModel.findAll()
};

const getByName = async (nom_ach='')=>{
    return await acheteurModel.findByName(nom_ach);
};

const getById = async (id_ach=0)=>{
    return await acheteurModel.findById(id_ach);
};

const getByNameAndPsw = async(nom_psw = {})=>{
    const {nom_ach,mdp_ach} = nom_psw;
    let acheteur = await getByName(nom_ach);
    if (acheteur.length === 0){
        throw {status:400,message:`${nom_ach} n'existe pas`};
    }
    let ach = acheteur[0];
    const getAccess = await psw.checkPsw(mdp_ach,ach['mdp_ach']);
    if (!getAccess){
        throw {status:400,message:'mot de passe incorrect'};
    }
    const token = await createJwt({id_ach: ach['id_ach']});
    return token;
}
const createOne = async (acheteur={})=>{
    let nom_ach = acheteur['nom_ach'];
    let ach = await getByName(nom_ach);
    if (ach.length === 0){
        acheteur.mdp_ach = await psw.chiffrer(acheteur.mdp_ach);
        let {tel_ach} = acheteur;
        if (tel_ach.length != 9){
            throw {'status': 400,'message':'le numéro doit avoir exactement 9 chiffres'};
        }
        try {
            await acheteurModel.create(acheteur);
            let ach = await getByName(nom_ach);
            let id_ach = ach[0]['id_vend'];
            return await createJwt({'id_ach': id_ach});
        } catch (err) {
            throw err;
        }
    }
    else{
        throw {status:409,message:'le nom de l\'acheteur doit être unique'};
    }
};

const changeInfo = async (id=0,new_info={})=>{
    new_info.mdp_ach = await psw.chiffrer(new_info.mdp_ach);
    await acheteurModel.change(id,new_info)
};

const deleteOne = async (id=0)=>{
    const commandeService = require('./commande.service');
    
    await commandeService.deleteByAch(id);
    await acheteurModel.remove(id);
};

module.exports = {getAll, getById, getByName, getByNameAndPsw, deleteOne, createOne, changeInfo};