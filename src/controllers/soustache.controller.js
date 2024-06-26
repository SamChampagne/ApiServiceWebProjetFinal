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
        const sousTacheModifiee = await SousTache.modifierSousTache(sousTacheId, nouvelleDonnes);

        if (sousTacheModifiee === null) {
            return res.status(404).json({ erreur: `La tâche avec l'ID ${nouvelleDonnes.tache_id} n'existe pas dans la base de données.` });
        }
        
        res.status(200).json({ message: "Sous-tâche modifiée avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: "Une erreur est survenue lors de la modification de la sous-tâche." });
    }
};
const supprimerSousTache = async (req, res, next) => {
    try {
        const soustacheId = req.params.id;
        
        // Attends la résolution de la promesse
        const tacheSupprimer = await SousTache.supprimerSousTaches(soustacheId);
        
        res.status(200).json({ message: "Sous-tâche supprimée avec succès, ID: " + soustacheId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: "Une erreur est survenue lors de la suppression de la sous-tâche." });
    }
};
const ajouterSousTache = async (req, res, next) => {
    try {
        const { titre, complete, tache_id } = req.body;

        // Vérifie que tache_id est un nombre entier
        const tacheId = parseInt(tache_id);
        
        // Vérifie que tacheId est un nombre valide
        if (isNaN(tacheId)) {
            throw new Error("L'ID de la tâche n'est pas valide.");
        }

        // Attends la résolution de la promesse
        const nouvelleSousTache = await SousTache.ajouterSousTaches(titre, complete, tacheId);

        res.status(200).json({ message: "Sous-tâche ajoutée avec succès", nouvelleSousTache });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: "Une erreur est survenue lors de l'ajout de la sous-tâche." });
    }
};

module.exports = {
    ajouterSousTache,
    supprimerSousTache,
    modifierSousTache,
    changerStatusSousTache
};