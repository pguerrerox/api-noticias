'use strict'
// DESC: module exports a function that will run all the scrapers async...

// libraries
const scraperModule = require(`./scraperModule`);

// main function...
function timedScrapers(_sites) {
  console.log('inicio...');
  _sites.forEach(site => {
    let params = site.params;

    params.forEach(param => {
      console.log(`${site.site}/${param} - scraper started...`);
      scraperModule(site.baseUrl, param);
    });
  });
}

// helpers/testing
// const sites = require('./sites');
// timedScrapers(sites);

module.exports = timedScrapers;