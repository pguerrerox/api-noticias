'use strict'


// libraries
let crypto = require('crypto');


// scraper modules
let diariolibre = require('./scraper_modules/diariolibre');
let listindiario = require('./scraper_modules/listindiario');


// mongoose model
let articuloModel = require('./models/article_model');




let baseurl = "https://www.diariolibre.com/cronologia/ver/meta/";
let param = "politica";

console.log(diariolibre[1]);