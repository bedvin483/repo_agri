const express = require('express');
const cors = require('cors');
const vendeurRoute = require('./routes/vendeur.routes');
const produitRoute = require('./routes/produit.route');
app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use('/api/vendeurs',vendeurRoute);
app.use('/api/produits',produitRoute);

module.exports = app;