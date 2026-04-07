const express = require('express');
const authVendeur = require('../middlewares/authVendeur.middleware');
const authAcheteur = require('../middlewares/authAcheteur.middleware');
const commandeController = require('../controllers/commande.controller');

const router = express.Router();

router.get('/vend',authVendeur,commandeController.getCommandeByVend);
router.get('/ach/',authAcheteur,commandeController.getCommandeByAch);
router.post('/',commandeController.createCommande);
router.put('/:id',commandeController.changeInfoCommande);
router.delete('/:id',commandeController.deleteCommande);

module.exports = router;