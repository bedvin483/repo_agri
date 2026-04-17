const express = require('express');
const cors = require('cors');
const vendeurRoute = require('./routes/vendeur.routes');
const acheteurRoute = require('./routes/acheteur.route');
const produitRoute = require('./routes/produit.route');
const stockRoute = require('./routes/stock.route');
const commandeRoute = require('./routes/commande.route');
const achatRoute = require('./routes/achat.route');
app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/public',express.static('public'))
app.use('/api/vendeurs',vendeurRoute);
app.use('/api/acheteur',acheteurRoute);
app.use('/api/produits',produitRoute);
app.use('/api/stock',stockRoute);
app.use('/api/commande',commandeRoute);
app.use('/api/achat',achatRoute);

module.exports = app;