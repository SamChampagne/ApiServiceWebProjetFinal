-- Supprimer les tables s'ils existent déjà
DROP TABLE IF EXISTS Sous_taches;
DROP TABLE IF EXISTS Taches;
DROP TABLE IF EXISTS Usagers;

-- Créer la table Usagers
CREATE TABLE Usagers (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    prenom VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    motdepasse VARCHAR(255),
    cle_api VARCHAR(255)
);

-- Insérer des données dans la table Usagers
INSERT INTO Usagers (nom, prenom, email, motdepasse, cle_api) VALUES
('Doe', 'John', 'john.doe@example.com', 'motdepasse123', 'cle_api_123'),
('Smith', 'Jane', 'jane.smith@example.com', 'pass123', 'cle_api_xyz');

-- Créer la table Taches
CREATE TABLE Taches (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255),
    description TEXT,
    date_de_debut DATE,
    date_de_fin DATE,
    complete BOOLEAN DEFAULT false,
    utilisateur_id INT REFERENCES Usagers(id) ON DELETE CASCADE
);

-- Insérer des données dans la table Taches
INSERT INTO Taches (titre, description, date_de_debut, date_de_fin, complete, utilisateur_id) VALUES
('Tâche 1', 'Description de la tâche 1', '2024-04-25', '2024-04-30', false, 1),
('Tâche 2', 'Description de la tâche 2', '2024-05-01', '2024-05-05', true, 2);

-- Créer la table Sous_taches
CREATE TABLE Sous_taches (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255),
    complete BOOLEAN DEFAULT false,
    tache_id INT REFERENCES Taches(id)
);

-- Insérer des données dans la table Sous_taches
INSERT INTO Sous_taches (titre, complete, tache_id) VALUES
('Sous-tâche 1', false, 1),
('Sous-tâche 2', true, 2);

ALTER TABLE sous_taches
DROP CONSTRAINT sous_taches_tache_id_fkey, -- Supprimez la contrainte existante
ADD CONSTRAINT sous_taches_tache_id_fkey FOREIGN KEY (tache_id) REFERENCES Taches(id) ON DELETE CASCADE;

