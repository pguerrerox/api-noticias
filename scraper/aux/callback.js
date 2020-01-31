'use strict'
// DESC
// module exports a function to be used as a callback-function on the 'xray' scraper

// libraries
const fs = require('fs');

// helpers
const cryptoHash = require('./crypto-hash');

function cb(err, data, site, param){
  if(!err){
    data.forEach(elem => {
      elem.source = site; // site (string) = variable on host
      elem.category = param; // param (string) = variable on host 
      elem.uuid = cryptoHash(elem.link)
    });
    let stringData = JSON.stringify(data);

    // fs path: need to verify
    fs.writeFileSync(`../../data/${site}_${param}.json`, stringData,'utf8', (err) => {
      if(err) throw err;
    })
    // console.log(JSON.parse(stringData));
  } else {
    console.error(err);
  }
}

module.exports = cb;