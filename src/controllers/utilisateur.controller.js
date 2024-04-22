const Utilisateur = require("../models/utilisateur.model");

const ajouterUsager = async (req, res, next) => {
    try {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email;
        const mot_de_passe = req.body.mot_de_passe;
        
        const nouvelUtilisateur = await Utilisateur.ajouterUsager(nom, prenom, email, mot_de_passe);
        const cleApi = nouvelUtilisateur.cle_api;

        res.status(200).json({ message: "Usager ajouté avec succès", cle_api: cleApi });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de l'ajout d'un usager ${req.params.email}` });
    }
};
const recupToken = async (req, res, next) => {
    try {
        const mdp = req.params.mot_de_passe;
        const email = req.params.email;

        const cleModifier = Utilisateur.modifierCleApi(email,mdp)
        res.status(200).json({ message: "Changement de clé API réussie" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de l'ajout d'un usager ${req.params.email}` });
    }
};
module.exports = {
    ajouterUsager,
    recupToken
    
}
