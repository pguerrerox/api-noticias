'use strict'
// DESC: module exports a function that scrape the website send in the "sites" parameter...

// libraries
const cb = require('./callback');

// main function...
function scraper(baseurl, param) {
  let site = baseurl.match(/(\/\/www.)(.+)(.com)/)[2];
  let url = String(baseurl + param);
  
  console.log(`${site}/${param} - scraper working...`);
  const individualModules= require(`../scraper_modules/${site}`);

  individualModules(url, cb, site, param)
}

// helpers/testing
// scraper('https://www.diariolibre.com/cronologia/ver/meta/', 'politica');

module.exports = scraper;