const express = require('express');
const produitController = require('../controllers/produit.controller');

const router = express.Router()

router.get('/',produitController.getAllProduit);
router.post('/add',produitController.createProduit);
router.put('/change/:id',produitController.changeInfoProduit);
router.delete('/delete/:id',produitController.deleteProduit);

module.exports = router;