const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');

router.get('/:id',stockController.getStockByVend);
router.post('/',stockController.createStock);
router.put('/',stockController.changeInfoStock);
router.delete('/',stockController.deleteStock);

module.exports = router;