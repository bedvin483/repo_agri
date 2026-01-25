const express = require('express');
const vendeurController = require('./controllers/vendeur.controllers');
const vendeurRouter = require('./routes/vendeur.routes');
app = express();

app.use('/api/vendeurs',vendeurRouter);

module.exports = app;