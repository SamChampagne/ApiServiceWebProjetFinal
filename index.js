require('dotenv').config();
const express = require('express'); 
const app = express(); 
const PORT = process.env.PORT || 3000;

app.use(express.json());
const utilisateurRoute = require('./src/routes/utilisateur.route');
const tacheRoute = require('./src/routes/tache.route');
const soustacheRoute = require('./src/routes/soustache.route');

// Middleware pour traiter les données au format JSON
app.use(express.json());

// Utilisation des routeurs
app.use('/api/utilisateur', utilisateurRoute);
app.use('/api/tache', tacheRoute);
app.use('/api/soustache', soustacheRoute);


app.listen(PORT, () => 
   console.log(`Server is running on port ${PORT}`)
);

