const express = require('express');
const router = express.Router();

const vendeurController = require('../controllers/vendeur.controllers');

router.get('/',vendeurController.getAllVendeurs);
router.get('/add',vendeurController.createVendeur);
router.get('/change',vendeurController.changeInfoVendeur);
router.get('/delete/:id',vendeurController.deleteVendeur);

module.exports = router