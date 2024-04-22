const usager = require("../models/tache.model.js");

function authentification(req, res, next) {
    // Vérifier si la clé API est présente dans l'entête

    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Vous devez fournir une clé api" });
    }

    // Récupérer la clé API
    const cleApi = req.headers.authorization.split(' ')[1];
    // Vérifier si la clé API est valide
    usager.validationCle(cleApi)
        .then(resultat => {
            if (!resultat) {
                console.log("La clé na pas marcher" + cleApi);
                return res.status(401).json({ message: "Clé API invalide" });
            } else {
                
                console.log("La clé a marcher : 1");
                next();
            }
        })
        .catch(erreur => {
            console.log(erreur);
            return res.status(500).json({ message: "Erreur lors de la validation de la clé api" });
        });
}

module.exports = {
    authentification
};
