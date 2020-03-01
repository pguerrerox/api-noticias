'use strict'
// DESC: module exports a function that scrape the website send in the "sites" parameter...

// libraries
const cb = require('./callback');

// main function...
module.exports = function scraper(baseurl, param) {
  let site = baseurl.match(/(\/\/www.)(.+)(.com)/)[2];
  let url = String(baseurl + param);
  
  // console.log(`${site}/${param} - scraper working...`);
  const individualModule= require(`../scraper_modules/${site}`);

  individualModule(url, cb, site, param)
}

// helpers/testing
// scraper('https://www.diariolibre.com/cronologia/ver/meta/', 'politica');