const express = require('express');
const router = express.Router();

const vendeurController = require('../controllers/vendeur.controllers');

router.get('/',vendeurController.getAllVendeurs);
router.get('/vend',vendeurController.getVendeurByName);
router.post('/',vendeurController.createVendeur);
router.put('/:id',vendeurController.changeInfoVendeur);
router.delete('/:id',vendeurController.deleteVendeur);

module.exports = router