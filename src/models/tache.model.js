const pg = require('pg');
const dotenv = require('dotenv');
const pool = require("../config/db_pg");

dotenv.config();

class Tache {
    
    static async getAllTasks() {
        const client = await pool.connect();
        try {
            const query = `
                SELECT * 
                FROM taches
            `;
            const { rows } = await client.query(query);
            return rows;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des tâches : ${error.message}`);
        } finally {
            client.release();
        }
    }

    static async getIncompleteTasks() {
        const client = await pool.connect();
        try {
            const query = `
                SELECT * 
                FROM taches
                WHERE complete = false
            `;
            const { rows } = await client.query(query);
            return rows;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération des tâches incomplètes : ${error.message}`);
        } finally {
            client.release();
        }
    }

    static async getTaskById(taskId) {
        const client = await pool.connect();
        try {
            const query = `
            SELECT t.titre AS tache_titre, t.description AS tache_description, t.date_de_debut, t.date_de_fin, st.titre AS sous_tache_titre, st.complete AS sous_tache_complete
            FROM taches t
            JOIN sous_taches st ON t.id = st.tache_id
            WHERE t.id = $1;
            `;
            const { rows } = await client.query(query, [taskId]);
            if (rows.length === 0) {
                throw new Error(`La tache avec l'ID ${taskId} n'existe pas ${rows}`);
            }
    
            // Regrouper les résultats par la tâche principale
            const task = rows
            
            return task;
        } catch (error) {
            throw new Error(`Erreur lors de la récupération de la tâche : ${error.message}`);
        } finally {
            client.release();
        }
    }

    static async ajouterTache(titre, description, date_de_debut, date_de_fin, complete, cle_api) {
        try {
            
            const queryUtilisateur = 'SELECT id FROM usagers WHERE cle_api = $1';
            const valuesUtilisateur = [cle_api];
            const resultUtilisateur = await pool.query(queryUtilisateur, valuesUtilisateur);
            const utilisateurId = resultUtilisateur.rows[0].id;
    
            // Insérer la tâche avec l'ID de l'utilisateur
            const queryText = `
                INSERT INTO taches (titre, description, date_de_debut, date_de_fin, complete, utilisateur_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `;
            const valuesTache = [titre, description, date_de_debut, date_de_fin, complete, utilisateurId];
            const { rows } = await pool.query(queryText, valuesTache);
            return rows[0];
        } catch (error) {
            throw new Error(`Erreur lors de l'ajout de la tâche : ${error.message}`);
        }
    }

    static async supprimerTache(id) {
        const queryText = `
            DELETE FROM taches
            WHERE id = $1
            RETURNING *;
        `;
        const values = [id];

        try {
            const { rows } = await pool.query(queryText, values);
            if (rows.length === 0) {
                throw new Error(`La tâche avec l'ID ${id} n'existe pas`);
            }
            return rows[0]; // Retourne la tâche supprimée
        } catch (error) {
            throw new Error(`Erreur lors de la suppression de la tâche : ${error.message}`);
        }
    }
    // Change = true || false
    static async modifierStatutTache(id, nouveauStatut) {
        const queryText = `
            UPDATE taches
            SET complete = $1
            WHERE id = $2
            RETURNING *;
        `;
        const values = [nouveauStatut, id];

        try {
            const { rows } = await pool.query(queryText, values);
            if (rows.length === 0) {
                throw new Error(`La tâche avec l'ID ${id} n'existe pas`);
            }
            return rows[0]; // Retourne la tâche modifiée avec le nouveau statut
        } catch (error) {
            throw new Error(`Erreur lors de la modification du statut de la tâche : ${error.message}`);
        }
    }
    static async modifierTache(id, nouvellesDonnees) {
        const { titre, description, dateDebut, dateFin, utilisateur_id } = nouvellesDonnees;
        const queryText = `
            UPDATE taches
            SET titre = $1, description = $2, date_de_debut = $3, date_de_fin = $4, utilisateur_id = $6
            WHERE id = $5
            RETURNING *;
        `;
        const values = [titre, description, dateDebut, dateFin, id, utilisateur_id];

        try {
            const { rows } = await pool.query(queryText, values);
            if (rows.length === 0) {
                throw new Error(`La tâche avec l'ID ${id} n'existe pas`);
            }
            return rows[0]; // Retourne la tâche modifiée avec les nouvelles données
        } catch (error) {
            throw new Error(`Erreur lors de la modification de la tâche : ${error.message}`);
        }
    }

}

module.exports = Tache