const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stock.controller');

router.get('/:id',stockController.getStockByVend);
router.post('/add',stockController.createStock);
router.put('/change',stockController.changeInfoStock);
router.delete('/delete',stockController.deleteStock);

module.exports = router;