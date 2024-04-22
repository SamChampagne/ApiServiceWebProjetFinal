const Tache = require("../models/tache.model");

/*
router.get('/afficherall/:status', tacheController.afficherAll);
router.get('/afficher/:id', tacheController.afficher);
router.post('/ajouter', tacheController.ajouterTache); 
router.delete('/supprimer/:id', tacheController.supprimerTache);
router.put('/modifier', tacheController.modifierTache);
router.put('/changer', tacheController.changerStatusTache);
*/

/*
AfficherALL Permet d'afficher tout les tâches non compléter, mais on peu aussi afficher celle qui sont complèter avec le param status
*/
const afficherAll = async (req, res, next) => {
    try {
        const statutParam = req.params.statut;
        let taches;

        if (statutParam === '1') {
            console.log("yo1")
            // Récupérer uniquement les tâches incomplètes si le paramètre statut est égal à 1
            taches = await Tache.getIncompleteTasks();
        } else {
            console.log("yo")
            // Récupérer toutes les tâches si le paramètre statut n'est pas égal à 1 ou est absent
            taches = await Tache.getAllTasks();
        }

        res.status(200).json({ taches }); // Renvoyer les tâches en format JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Erreur lors de la récupération des tâches : ${error.message}` });
    }
};
const afficher = async (req, res, next) => {
    try {

        const id = req.params.id;
        let taches;

        taches = await Tache.getTaskById(id)
        res.status(200).json({ taches });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Échec de la récupération de la tache ${req.params.email}` });
    }
};
const ajouterTache = async (req, res, next) => {
    try {
        
        // Extraire les données du corps de la requête
        const titre = req.body.titre;
        const description = req.body.description;
        const date_de_debut = req.body.date_de_debut;
        const date_de_fin = req.body.date_de_fin;
        const complete = req.body.complete;
        // Insérer la nouvelle tâche dans la base de données
        const nouvelleTache = await Tache.ajouterTache(
            titre,
            description,
            date_de_debut,
            date_de_fin,
            complete,
        );

        // Envoyer une réponse avec la nouvelle tâche ajoutée
        res.status(200).json({ message: "Tâche ajoutée avec succès", tache: nouvelleTache });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: "Erreur lors de l'ajout de la tâche" });
    }
};
const supprimerTache = async (req, res, next) => {
    try {

        const id = req.params.id

        const supprimerTache = await Tache.supprimerTache(id);
        
        res.status(200).json({ message: "Usager supprimer avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de la suppression de tache ${req.params.email}` });
    }
};
const modifierTache = async (req, res, next) => {
    try {
        const { id } = req.params; // Récupérer l'ID de la tâche à modifier depuis les paramètres de la requête
        const nouvellesDonnees = req.body; // Récupérer les nouvelles données à partir du corps de la requête

        // Appeler la méthode du modèle pour modifier la tâche avec les nouvelles données
        const tacheModifiee = await Tache.modifierTache(id, nouvellesDonnees);

        res.status(200).json({ message: "Tâche modifiée avec succès", tache: tacheModifiee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors de la modification du status de la tâche : ${error.message}` });
    }
};
const changerStatusTache = async (req, res, next) => {
    try {
        const id  = req.params.id;
        const choix = req.params.nouveauStatut; // Récupérer les nouvelles données depuis le corps de la requête

        const tacheModifiee = await Tache.modifierStatutTache(id, choix);

        res.status(200).json({ message: `Changement de tâche réussi pour l'ID ${id}`, tache: tacheModifiee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ erreur: `Echec lors du changement de tâche : ${error.message}` });
    }
};



module.exports = {
    afficherAll,
    afficher,
    modifierTache,
    supprimerTache,
    changerStatusTache,
    ajouterTache
};
