const express = require('express');
const router = express.Router();
const soustacheController = require('../controllers/soustache.controller')
const validation = require("../middleware/authentification.middleware")

router.put('/changer/:id/:nouveauStatut',validation.authentification, soustacheController.changerStatusSousTache);
router.put('/modifier/:id',validation.authentification, soustacheController.modifierSousTache);
router.delete('/supprimer/:id',validation.authentification, soustacheController.supprimerSousTache);
router.post('/ajouter',validation.authentification, soustacheController.ajouterSousTache);

module.exports = router;