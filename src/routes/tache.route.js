const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/tache.controller')
const validation = require("../middleware/authentification.middleware")

router.get('/afficherall/:statut?', tacheController.afficherAll);
router.get('/afficher/:id', tacheController.afficher);
// id d'ajouter = id utilisateur
router.post('/ajouter', tacheController.ajouterTache);
router.delete('/supprimer/:id', tacheController.supprimerTache);
router.put('/modifier/:id', tacheController.modifierTache);
router.put('/changer/:id/:nouveauStatut', tacheController.changerStatusTache);


module.exports = router;
