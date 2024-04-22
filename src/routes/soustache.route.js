const express = require('express');
const router = express.Router();
const soustacheController = require('../controllers/soustache.controller')
const validation = require("../middleware/authentification.middleware")

router.put('/changer/:id/:nouveauStatut', soustacheController.changerStatusSousTache);
router.put('/modifier/:id', soustacheController.modifierSousTache);
router.delete('/supprimer/:id', soustacheController.supprimerSousTache);
router.post('/ajouter', soustacheController.ajouterSousTache);
module.exports = router;