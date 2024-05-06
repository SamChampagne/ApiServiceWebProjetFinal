const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tache.controller')
const validation = require("../middleware/authentification.middleware")

router.get('/afficherall/:all?',validation.authentification, tacheController.afficherAll);
router.get('/afficher/:id',validation.authentification, tacheController.afficher);
// id d'ajouter = id utilisateur
router.post('/ajouter',validation.authentification, tacheController.ajouterTache);
router.delete('/supprimer/:id',validation.authentification, tacheController.supprimerTache);
router.put('/modifier/:id',validation.authentification, tacheController.modifierTache);
router.put('/changer/:id/:nouveauStatut',validation.authentification, tacheController.changerStatusTache);


module.exports = router;
