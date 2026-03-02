const express = require('express');
const router = express.Router();

const acheteurController = require('../controllers/acheteur.controller');

router.get('/',acheteurController.getAllAcheteurs);
router.get('/ach',acheteurController.getAcheteurByname);
router.post('/add',acheteurController.createAcheteur);
router.put('/change/:id',acheteurController.changeInfoAcheteur);
router.delete('/delete/:id',acheteurController.deleteAcheteur);

module.exports = router