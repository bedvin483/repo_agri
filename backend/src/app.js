const express = require('express');
const cors = require('cors');
const vendeurRouter = require('./routes/vendeur.routes');
app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use('/api/vendeurs',vendeurRouter);

module.exports = app;