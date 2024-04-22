const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller')
const validation = require("../middleware/authentification.middleware")

router.post('/ajouter', utilisateurController.ajouterUsager);
router.put('/token/:email/:mot_de_passe', utilisateurController.recupToken);
module.exports = router;