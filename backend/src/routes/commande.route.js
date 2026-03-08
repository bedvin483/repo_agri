const express = require('express');
const commandeController = require('../controllers/commande.controller');

const router = express.Router();

router.get('/vend/:id',commandeController.getCommandeByVend);
router.get('/ach/:id',commandeController.getCommandeByAch);
router.post('/',commandeController.createCommande);
router.put('/:id',commandeController.changeInfoCommande);
router.delete('/:id',commandeController.deleteCommande);

module.exports = router;