'use strict'

const express = require('express');

let app = express();
let port = process.env.PORT || 3000;

let routes = require('./api/routes/routes');
routes(app);

app.listen(port, function(){
  console.log(`App running on port: ${port}`);
})


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true});



let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open',function(){
  console.log('Connected...')
})



// const diariolibre = require('./local_modules/scrapers/diariolibre');
// const listindiario = require('./local_modules/scrapers/listindiario');
// const sites = require('./local_modules/sites');

// diariolibre(sites.diariolibre, 'politica')
// listindiario(sites.listindiario, 'politica')