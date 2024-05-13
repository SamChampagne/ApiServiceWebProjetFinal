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
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `;
            const values = [nom, prenom, email, motdepasse, cleapi];
    
            // Ajouter des logs pour vérifier les valeurs et la requête SQL
            console.log('Query:', query);
            console.log('Values:', values);
    
            // Assurez-vous d'avoir correctement configuré votre connexion à la base de données
            const result = await pool.query(query, values);
            const newUser = result.rows[0];
            
            // Retourner le nouvel utilisateur créé
            return newUser;
        } catch (error) {
            // Gérer les erreurs en les lançant pour une meilleure visibilité
            console.error('Erreur lors de l\'ajout de l\'usager :', error);
            throw new Error(`Erreur lors de l'ajout de l'usager : ${error.message}`);
        }
    }
    static async modifierCleApi(email) {
        try {
            const query = `
                SELECT *
                FROM usagers
                WHERE email = $1 ;
            `;
            const values = [email];

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
                WHERE email = $2 
                RETURNING *;
            `;
            const updateValues = [nouvelleCleApi, email];

            // Exécuter la requête SQL pour mettre à jour la clé API
            const updateResult = await pool.query(updateQuery, updateValues);

            // Récupérer les données de l'utilisateur avec la nouvelle clé API
            const utilisateurModifie = updateResult.rows[0];

            // Retourner les données de l'utilisateur modifié
            return nouvelleCleApi;
        } catch (error) {
            throw new Error(`Erreur lors de la modification de la clé API : ${error.message}`);
        }
    }
    static async validationCle(cleApi) {
        try {
          const query = 'SELECT * FROM Usagers WHERE cle_api = $1';
          const values = [cleApi];
          const result = await pool.query(query, values);
          
          // Vérifier si des lignes ont été retournées (la clé API existe)
          return result.rows.length > 0;
        } catch (error) {
          console.error('Erreur lors de la validation de la clé API :', error);
          return false;
        }
      }
      static async recupererUtilisateurParEmail(email) {
        try {
            const query = `
                SELECT *
                FROM usagers
                WHERE email = $1;
            `;
            const values = [email];
    
            const result = await pool.query(query, values);
    
            if (result.rows.length === 0) {
                return null; // Utilisateur non trouvé, retourne null
            }
    
            const utilisateur = result.rows[0];
            return utilisateur;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de l'utilisateur par email : ${error.message}`);
        }
    }
    


}

module.exports = Utilisateur;