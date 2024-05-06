const pg = require('pg');
const dotenv = require('dotenv');
const pool = require("../config/db_pg");

dotenv.config();

class SousTache{
    static async ajouterSousTache(titre, complete, tacheId) {
        try {
            const query = `
                INSERT INTO sous_taches (titre, complete, tache_id)
                VALUES ($1, $2, $3)
                RETURNING *;
            `;
            const values = [titre, complete, tacheId];

            const result = await pool.query(query, values);

            // Récupérer les données de la sous-tâche ajoutée à partir du résultat de la requête
            const newSousTache = result.rows[0];

            // Retourner la nouvelle sous-tâche créée
            return newSousTache;
        } catch (error) {
            throw new Error(`Erreur lors de l'ajout de la sous-tâche : ${error.message}`);
        }
    }
    static async supprimerSousTache(id) {
        try {
            const query = `
                DELETE FROM Sous_taches
                WHERE id = $1
                RETURNING *;
            `;
            const values = [id];

            const result = await pool.query(query, values);

            // Vérifier si la sous-tâche a été supprimée
            if (result.rows.length === 0) {
                throw new Error(`La sous-tâche avec l'ID ${id} n'existe pas`);
            }

            // Retourner les données de la sous-tâche supprimée
            return result.rows[0];
        } catch (error) {
            throw new Error(`Erreur lors de la suppression de la sous-tâche : ${error.message}`);
        }
    }
    static async modifierSousTache(id, nouvellesDonnees) {
        const { titre, tache_id } = nouvellesDonnees;
    
        // Vérifier si tache_id existe dans la base de données
        const tacheExistsQuery = `
            SELECT id
            FROM Taches
            WHERE id = $1;
        `;
        const tacheExistsValues = [tache_id];
        const { rows: tacheExistsRows } = await pool.query(tacheExistsQuery, tacheExistsValues);
    
        if (tacheExistsRows.length === 0) {
            return null; // Retourner null si la tâche n'existe pas
        }
    
        // Si tache_id existe, effectuer la mise à jour de la sous-tâche
        const queryText = `
            UPDATE Sous_taches
            SET titre = $1, tache_id = $2
            WHERE id = $3
            RETURNING *;
        `;
        const values = [titre, tache_id, id];
    
        try {
            const { rows } = await pool.query(queryText, values);
            if (rows.length === 0) {
                throw new Error(`La sous-tâche avec l'ID ${id} n'existe pas`);
            }
            return rows[0]; // Retourne la sous-tâche modifiée
        } catch (error) {
            throw new Error(`Erreur lors de la modification de la sous-tâche : ${error.message}`);
        }
    }
    static async modifierStatutSousTache(id, complete) {
        console.log(complete);
        const queryText = `
            UPDATE sous_taches
            SET complete = $1
            WHERE id = $2
            RETURNING *;
        `;
        const values = [complete, id];
    
        try {
            const { rows } = await pool.query(queryText, values);
            if (rows.length === 0) {
                throw new Error(`La sous-tâche avec l'ID ${id} n'existe pas`);
            }
            return rows[0]; // Retourne la sous-tâche modifiée
        } catch (error) {
            throw new Error(`Erreur lors de la modification de la sous-tâche : ${error.message}`);
        }
    }
}

module.exports = SousTache