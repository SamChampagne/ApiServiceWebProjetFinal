const Utilisateur = require("../models/utilisateur.model");
const bcrypt = require('bcrypt');
const costFactor = 10;

const ajouterUsager = async (req, res, next) => {
    try {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email;
        const mot_de_passe = req.body.mot_de_passe;
        const hash = await bcrypt.hashSync(mot_de_passe,costFactor)
        const nouvelUtilisateur = await Utilisateur.ajouterUsager(nom, prenom, email, hash);
        const cleApi = nouvelUtilisateur.cle_api;
        
        res.status(200).json({ message: "Usager ajouté avec succès", cle_api: cleApi });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de l'ajout d'un usager ${req.params.email}` });
    }
};
const recupToken = async (req, res, next) => {
    try {
        const mdp = req.body.mot_de_passe; 
        const email = req.body.email;
        const utilisateur = await Utilisateur.recupererUtilisateurParEmail(email);
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        const mot_de_passe_hache = utilisateur.motdepasse; 
        const mot_de_passe_valide = bcrypt.compareSync(mdp, mot_de_passe_hache);
        if (!mot_de_passe_valide) {
            return res.status(401).json({ message: "Mot de passe invalide" });
        }
        const cleApi = await Utilisateur.modifierCleApi(email);

        res.status(200).json({ message: "Token généré avec succès", cle_api: cleApi });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: "Echec lors de la récupération du token" });
    }
};
module.exports = {
    ajouterUsager,
    recupToken
    
}
