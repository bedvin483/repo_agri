const express = require('express');
const router = express.Router();

const vendeurController = require('../controllers/vendeur.controllers');

router.get('/',vendeurController.getAllVendeurs);

module.exports = router