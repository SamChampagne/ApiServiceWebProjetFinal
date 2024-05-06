const express = require('express');
const router = express.Router();
const utilisateurController = require('../controllers/utilisateur.controller');


// Définir les options CORS pour autoriser les requêtes provenant de l'origine spécifique


// Utiliser le middleware CORS avec les options spécifiées
router.post('/ajouter', utilisateurController.ajouterUsager);
router.put('/token', utilisateurController.recupToken);

module.exports = router;