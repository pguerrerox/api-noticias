'use strict'
// DESC
// module exports a function that will run all the scrapers after trigger (timer or watcher)
// options: timer, watcher, sync or async

// helpers
let sites = require('./sites');

// goScraper(), call the scraper_modules for the sites and params define on the sites.js helper...
const goScraper = function(sites){
  sites.forEach(site => {
    // scraper_modules
    let scraperModule = require(`../scraper_modules/${site.site}`);

    let baseUrl = site.baseUrl;
    let params = site.param;

    params.forEach(param => {
      // console.log(`${site.site}(${baseUrl}, ${param})`);
      scraperModule(baseUrl, param);
    })
  });
}

// exports
const timedScraping = () => {

}
