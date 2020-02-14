'use strict'
// DESC: module exports a function to be used as a callback-function on the 'xray' scraper

// libraries
const fs = require('fs');
const path = require('path');
const cryptoHash = require('./crypto-hash');
const saveDataDB = require('./save-to-db');

// main function...
function cb(err, data, site, param){
  console.log(`${site}/${param} - scrape done...`);
  if(err) throw err;
  data.forEach(elem => {
    elem.source = site; // site (string) = variable on host
    elem.category = param; // param (string) = variable on host 
    elem.uuid = cryptoHash(elem.link)
  });
  let stringData = JSON.stringify(data);
  let pathToData = path.join(__dirname,'..', '..', 'data')
  return fs.writeFile (`${pathToData}/${site}_${param}.json`, stringData, 'utf8', (err) => {
    if (err) throw err;
  
    console.log(`${site}/${param} - file created...`);
    saveDataDB(site, param);
  })
}

module.exports = cb;