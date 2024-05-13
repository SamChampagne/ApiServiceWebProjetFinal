require('dotenv').config();
const express = require('express'); 
const app = express(); 
const PORT = process.env.PORT || 3030;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
app.use(express.json());
const errorlog = require('./src/middleware/detectionErreur.middleware');
const utilisateurRoute = require('./src/routes/utilisateur.route');
const tacheRoute = require('./src/routes/tache.route');
const soustacheRoute = require('./src/routes/soustache.route');
const swaggerDocument = require('./src/config/documentation.json');
const swaggerOptions = {
   customCss: '.swagger-ui .topbar { display: none }',
   customSiteTitle: "Demo API"
};
// Middleware pour traiter les données au format JSON et CORS pour gérer les connexions
app.use(cors());
app.use(express.json());


// Utilisation des routeurs
app.use('/api/utilisateur',errorlog, utilisateurRoute);
app.use('/api/tache',errorlog, tacheRoute);
app.use('/api/soustache',errorlog, soustacheRoute);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.listen(PORT, () => 
   console.log(`Server is running on port ${PORT}`)
);

