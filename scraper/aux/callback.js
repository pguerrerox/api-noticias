'use strict'
// DESC
// module exports a function to be used as a callback-function on the 'xray' scraper

// libraries
const fs = require('fs');
const path = require('path');
const cryptoHash = require('./crypto-hash');

// main function...
async function cb(err, data, site, param){
  console.log(`${site}/${param} - scrape done...`);
  try{
    if(!err){
      data.forEach(elem => {
        elem.source = site; // site (string) = variable on host
        elem.category = param; // param (string) = variable on host 
        elem.uuid = cryptoHash(elem.link)
      });
      let stringData = JSON.stringify(data);
      let pathToData = path.join(__dirname,'..', '..', 'data')
      await fs.writeFileSync(`${pathToData}/${site}_${param}.json`, stringData,'utf8', (err) => {
        if(err) throw err;
      })
      console.log(`${site}/${param} - file created...`);
    } else {
      throw err;
    }
  }
  catch(err){
    console.log(err);
  }
}

module.exports = cb;