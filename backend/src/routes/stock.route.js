const express = require('express');
const authVendeur = require('../middlewares/authVendeur.middleware');
const router = express.Router();
const stockController = require('../controllers/stock.controller');
const produitPictureSaver = require('../middlewares/ProduitPicture.save');

router.get('/',authVendeur,stockController.getStockByVend);
router.post('/',authVendeur,produitPictureSaver,stockController.createStock);
router.put('/',authVendeur,stockController.changeInfoStock);
router.delete('/',authVendeur,stockController.deleteStock);

module.exports = router;