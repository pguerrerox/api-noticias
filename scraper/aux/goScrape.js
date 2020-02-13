'use strict'
// DESC
// module exports a function that will run all the scrapers.

// helpers/testing
// const sites = require('./sites');
// timedScrapers(sites);

// main function...
// _sites: array of objects
function timedScrapers(_sites) {
  console.log('inicio...');
  _sites.forEach(site => {
    let params = site.params;

    params.forEach(async param => {
      try {
        console.log(`${site.site}/${param} - scraper started...`)

        // importing scraper_modules
        let scraperModule = require(`../scraper_modules/${site.site}`);
        await scraperModule(site.baseUrl, param);
      }
      catch (err) {
        console.log(err)
      }
    });
  });
}

module.exports = timedScrapers;