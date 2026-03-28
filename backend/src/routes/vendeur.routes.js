const express = require('express');
const authVendeur = require('../middlewares/authVendeur.middleware');
const router = express.Router();

const vendeurController = require('../controllers/vendeur.controllers');

router.get('/',authVendeur,vendeurController.getVendeurById);
router.get('/vend',vendeurController.getVendeurByNameAndPsw);
router.post('/',vendeurController.createVendeur);
router.put('/',authVendeur,vendeurController.changeInfoVendeur);
router.delete('/',authVendeur,vendeurController.deleteVendeur);

module.exports = router