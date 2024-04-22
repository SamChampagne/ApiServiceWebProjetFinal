const pg = require('pg');
const dotenv = require('dotenv');
const pool = require("../config/db_pg");
const { v4: uuidv4 } = require('uuid');
dotenv.config();

class Utilisateur {
    
    static validationCle(cleApi) {
        return new Promise((resolve, reject) => {
            const requete = 'SELECT COUNT(*) AS nbUsager FROM usager u WHERE cle_api = ?; ';
            const parametres = [cleApi];

            pool.query(requete, parametres, (erreur, resultat) => {
                if (erreur) {
                    console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                    reject(erreur);
                }
                console.log("La clé a marcher : " + cleApi);
                resolve(resultat[0].nbUsager > 0);   
            });
        });
    }
    static async ajouterUsager(nom, prenom, email, motdepasse) {
        
        const cleapi = uuidv4(); // Générer une clé API unique
        try {
            const query = `
                INSERT INTO Usagers (nom, prenom, email, motdepasse, cle_api)
                VALUES ( $1, $2, $3, $4, $5)
                RETURNING *;
            `;
            const values = [ nom, prenom, email, motdepasse, cleapi];
            // Assurez-vous d'avoir correctement configuré votre connexion à la base de données
            const result = await pool.query(query, values);

            // Récupérer les données de l'utilisateur ajouté à partir du résultat de la requête
            const newUser = result.rows[0];
            
            // Retourner le nouvel utilisateur créé
            return newUser;
        } catch (error) {
            throw new Error(`Erreur lors de la suppression de la tâche : ${error.message}`);
        }
    }
    static async modifierCleApi(email, motdepasse) {
        try {
            const query = `
                SELECT *
                FROM usagers
                WHERE email = $1 AND motdepasse = $2;
            `;
            const values = [email, motdepasse];

            // Exécuter la requête SQL pour rechercher l'utilisateur
            const result = await pool.query(query, values);

            // Vérifier si l'utilisateur existe
            if (result.rows.length === 0) {
                throw new Error("Utilisateur non trouvé.");
            }

            const utilisateur = result.rows[0];

            // Générer une nouvelle clé API
            const nouvelleCleApi = uuidv4();

            // Mettre à jour la clé API de l'utilisateur dans la base de données
            const updateQuery = `
                UPDATE usagers
                SET cle_api = $1
                WHERE email = $2 AND motdepasse = $3
                RETURNING *;
            `;
            const updateValues = [nouvelleCleApi, email, motdepasse];

            // Exécuter la requête SQL pour mettre à jour la clé API
            const updateResult = await pool.query(updateQuery, updateValues);

            // Récupérer les données de l'utilisateur avec la nouvelle clé API
            const utilisateurModifie = updateResult.rows[0];

            // Retourner les données de l'utilisateur modifié
            return utilisateurModifie;
        } catch (error) {
            throw new Error(`Erreur lors de la modification de la clé API : ${error.message}`);
        }
    }


}

module.exports = Utilisateur;