const SousTache = require("../models/soustache.model");

/* < LES ROUTES >
    router.put('/changer', soustacheController.changerStatusSousTache);
    router.put('/modifier', soustacheController.modifierSousTache);
    router.delete('/supprimer/:id', soustacheController.supprimerSousTache);
    router.post('/soustache/ajouter', soustacheController.ajouterSousTache);
*/

/*

*/
const changerStatusSousTache = async (req, res, next) => {
    try {
        const id  = req.params.id;
        const choix = req.params.nouveauStatut; 

        const tacheModifiee = await SousTache.modifierStatutSousTache(id, choix);

        res.status(200).json({ message: `Changement de tâche réussi pour l'ID ${id}`, tache: tacheModifiee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors du changement de tâche : ${error.message}` });
    }
};
const modifierSousTache = async (req, res, next) => {
    try {
        const sousTacheId = req.params.id;
        const nouvelleDonnes = req.body;
        const soustachModifier = SousTache.modifierSousTache(sousTacheId,nouvelleDonnes)
        res.status(200).json({ message: "Sous tâches modifier avec succès " });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de l'ajout d'un usager ${req.params.email}` });
    }
};
const supprimerSousTache = async (req, res, next) => {
    try {
        const soustacheId = req.params.id;

        const tacheSupprimer = SousTache.supprimerSousTache(soustacheId);
        res.status(200).json({ message: "Sous tâches supprimer avec succès, ID: " + soustacheId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de l'ajout d'un usager ${req.params.email}` });
    }
};
const ajouterSousTache = async (req, res, next) => {
    try {
        const titre = req.body.titre;
        const complete = req.body.complete;
        const tacheId = req.body.tacheId;
        const soustache = SousTache.ajouterSousTache(titre,complete,tacheId);
        res.status(200).json({ message: "Sous tâche ajouter avec succès" + tacheId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de l'ajout d'un usager ${req.params.email}` });
    }
};

module.exports = {
    ajouterSousTache,
    supprimerSousTache,
    modifierSousTache,
    changerStatusSousTache
};