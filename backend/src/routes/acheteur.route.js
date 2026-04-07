const express = require('express');
const authAcheteur = require('../middlewares/authAcheteur.middleware');
const router = express.Router();

const acheteurController = require('../controllers/acheteur.controller');

router.get('/',authAcheteur,acheteurController.getAcheteurById);
router.get('/ach',acheteurController.getAcheteurByNameAndPsw);
router.post('/',acheteurController.createAcheteur);
router.put('/',authAcheteur,acheteurController.changeInfoAcheteur);
router.delete('/',authAcheteur,acheteurController.deleteAcheteur);

module.exports = router