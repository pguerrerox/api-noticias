'use strict'

const diariolibre = require('./local_modules/scrapers/diariolibre');
const listindiario = require('./local_modules/scrapers/listindiario');
const sites = require('./local_modules/sites');

// diariolibre(sites.diariolibre, 'politica')
listindiario(sites.listindiario, 'politica')
