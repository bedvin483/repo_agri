const express = require('express');
const router = express.Router();

const acheteurController = require('../controllers/acheteur.controller');

router.get('/',acheteurController.getAllAcheteurs);
router.get('/ach',acheteurController.getAcheteurByname);
router.post('/',acheteurController.createAcheteur);
router.put('/:id',acheteurController.changeInfoAcheteur);
router.delete('/:id',acheteurController.deleteAcheteur);

module.exports = router