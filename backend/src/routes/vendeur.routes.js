const express = require('express');
const router = express.Router();

const vendeurController = require('../controllers/vendeur.controllers');

router.get('/',vendeurController.getAllVendeurs);
router.get('/vend',vendeurController.getVendeurByName);
router.post('/add',vendeurController.createVendeur);
router.put('/change/:id',vendeurController.changeInfoVendeur);
router.delete('/delete/:id',vendeurController.deleteVendeur);

module.exports = router