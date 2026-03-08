const express = require('express');
const achatController = require('../controllers/achat.controller');

const router = express.Router();

router.get('/:id',achatController.getAchatsByCommannde);
router.post('/',achatController.createAchat);
router.put('/',achatController.changeInfoAchat);
router.delete('/',achatController.deleteAchat);

module.exports = router;