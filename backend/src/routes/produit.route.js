const express = require('express');
const produitController = require('../controllers/produit.controller');

const router = express.Router()

router.get('/',produitController.getAllProduit);
router.get('/:name',produitController.getProduitByName);
router.post('/',produitController.createProduit);
router.put('/:id',produitController.changeInfoProduit);
router.delete('/:id',produitController.deleteProduit);

module.exports = router;